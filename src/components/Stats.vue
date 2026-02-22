<template>
    <div class="chart-container" ref="containerRef" style="width: 100%;">
      <h2>KBO 팀별 데이터 시각화</h2>
      <p>1. 팀별 회원수 현황</p>
      <div v-if="loading" class="loading-msg">데이터를 불러오는 중...</div>
      <svg v-show="!loading" ref="svgRef" style="width: 100%; height: 350px; display: block;"></svg>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import * as d3 from 'd3';
  import axiosInstance from '@/util/axiosInstance';
  
  // 1. 상태 및 상수 관리
  const teamData = ref([]);
  const svgRef = ref(null);
  const containerRef = ref(null);
  const loading = ref(true);
  let resizeObserver = null;
  
  const teamNameMap = {
    "lg": "LG 트윈스", "doosan": "두산 베어스", "hanwha": "한화 이글스",
    "nc": "NC 다이노스", "ssg": "SSG 랜더스", "lotte": "롯데 자이언츠",
    "kia": "KIA 타이거즈", "kt": "KT 위즈", "kiwoom": "키움 히어로즈",
    "samsung": "삼성 라이온즈"
  };
  
  const teamColors = {
    lg: '#C30452', doosan: '#1A1748', hanwha: '#FC4E00', nc: '#315288',
    ssg: '#CE0E2D', lotte: '#041E42', kia: '#EA0029', kt: '#000000',
    kiwoom: '#570514', samsung: '#074CA1'
  };
  
  // 2. API 호출 및 데이터 가공
  const fetchData = async () => {
    try {
      loading.value = true;
      const response = await axiosInstance.get('/users/counts-by-team');
      
      // 서버 데이터를 Map으로 변환하여 찾기 쉽게 함
      const serverDataMap = new Map(response.data.map(d => [d.id, d.totalCount]));
  
      // 모든 팀이 포함된 배열 생성 (데이터가 없으면 0으로 채움)
      teamData.value = Object.keys(teamNameMap).map(id => ({
        id,
        totalCount: serverDataMap.has(id) ? parseInt(serverDataMap.get(id)) : 0
      }));
  
      drawChart();
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      loading.value = false;
    }
  };
  
  // 3. D3 그래프 그리기
  const drawChart = () => {
    if (!svgRef.value || !containerRef.value || teamData.value.length === 0) return;
  
    // 부모 요소 너비에 맞춘 동적 크기 설정
    const width = containerRef.value.clientWidth;
    const height = 350;
    const margin = { top: 30, right: 20, bottom: 50, left: 40 };
    const MIN_BAR_HEIGHT = 6;
  
    // 기존 요소 삭제 (리렌더링 대비)
    d3.select(svgRef.value).selectAll("*").remove();
  
    const svg = d3.select(svgRef.value)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
  
    // 스케일 설정
    const x = d3.scaleBand()
      .domain(teamData.value.map(d => d.id))
      .range([0, innerWidth])
      .padding(0.3);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(teamData.value, d => d.totalCount) || 10]) // 데이터가 모두 0일 때 대비
      .nice()
      .range([innerHeight, 0]);
  
    // X축 그리기
    svg.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).tickFormat(d => teamNameMap[d] || d))
      .selectAll("text")
      .style("font-size", innerWidth < 500 ? "10px" : "12px"); // 좁을 때 폰트 조절
  
    // Y축 그리기
    svg.append("g")
      .call(d3.axisLeft(y).ticks(5));
  
    // 막대 그리기
    svg.selectAll(".bar")
      .data(teamData.value)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.id))
      .attr("width", x.bandwidth())
      .attr("y", d => d.totalCount === 0 ? innerHeight - MIN_BAR_HEIGHT : y(d.totalCount))
      .attr("height", d => d.totalCount === 0 ? MIN_BAR_HEIGHT : innerHeight - y(d.totalCount))
      .attr("fill", d => teamColors[d.id] || "#ccc")
  
    svg.selectAll(".label")
      .data(teamData.value)
      .enter()
      .append("text")
      .attr("x", d => x(d.id) + x.bandwidth() / 2)
      .attr("y", d => (d.totalCount === 0 ? innerHeight - MIN_BAR_HEIGHT : y(d.totalCount)) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(d => d.totalCount);
  };
  
  onMounted(() => {
    fetchData();
  
    // 반응형 감지
    resizeObserver = new ResizeObserver(() => {
      if (!loading.value) drawChart();
    });
    if (containerRef.value) resizeObserver.observe(containerRef.value);
  });
  
  onUnmounted(() => {
    if (resizeObserver) resizeObserver.disconnect();
  });
  </script>
  
  <style scoped>
  .chart-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  .loading-msg {
    text-align: center;
    line-height: 350px;
  }
  .bar {
    transition: fill 0.2s;
  }
  .bar:hover {
    filter: brightness(1.2);
  }
  </style>