<template>
  <div class="chart-container">
    <h2>팀별 게시글 작성 비율</h2>
    <div ref="chartRef"></div>
    <p v-if="loading">데이터를 불러오는 중...</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';
import axiosInstance from '@/util/axiosInstance';

const chartRef = ref(null);
const loading = ref(true);
const error = ref(null);


const teamNameMap = {
    "lg": "LG 트윈스", "doosan": "두산 베어스", "hanwha": "한화 이글스",
    "nc": "NC 다이노스", "ssg": "SSG 랜더스", "lotte": "롯데 자이언츠",
    "kia": "KIA 타이거즈", "kt": "KT 위즈", "kiwoom": "키움 히어로즈",
    "samsung": "삼성 라이온즈"
  };


// 차트 설정값
const width = 400;
const height = 400;
const margin = 40;
const radius = Math.min(width, height) / 2 - margin;

const drawChart = (data) => {
  // 1. 기본 SVG 세팅
  const svg = d3.select(chartRef.value)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // 2. 색상 스케일 설정
  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.id))
    .range(d3.schemeCategory10);

  // 3. 파이 데이터 계산 (도넛 형태를 위해 padAngle 추가)
  const pie = d3.pie()
    .value(d => d.totalCount)
    .sort(null);

  const data_ready = pie(data);

  const arc = d3.arc()
    .innerRadius(radius * 0.5) // 도넛 구멍 크기
    .outerRadius(radius);

  // 5. 도넛 조각 그리기
  svg.selectAll('path')
    .data(data_ready)
    .join('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.id))
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.8);

  // 6. 텍스트 라벨 추가 (팀명 및 비율 %)
  const total = d3.sum(data, d => d.totalCount);

  svg.selectAll('text')
    .data(data_ready)
    .join('text')
    .text(d => {
      const percentage = ((d.data.totalCount / total) * 100).toFixed(1);
      return `${teamNameMap[d.data.id]} (${percentage}%)`;
    })
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "#000");
};

const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/posts/count-post-by-team');
    drawChart(response.data);
      console.log(response.data);

  } catch (err) {
    error.value = "데이터를 가져오는데 실패했습니다.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.error {
  color: red;
}
</style>