<template>
  <div class="chart-container">
    <h2 class="title">유저별 게시물 작성 건수</h2>
    <div v-if="loading">로딩 중...</div>
    <div v-else-if="error">{{ error }}</div>
    <svg ref="svgRef"></svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';
import axiosInstance from '@/util/axiosInstance';

const svgRef = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
  try {
    loading.value = true;
    const response = await axiosInstance.get('/posts/count-post-by-nickname');
    renderChart(response.data);
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

const renderChart = (data) => {
  if (!data || data.length === 0) return;

  // 1. 설정 및 차트 크기 정의
  const margin = { top: 20, right: 60, bottom: 20, left: 80 };
  const width = 500 - margin.left - margin.right;
  const height = data.length * 45;

  // 기존 내용 초기화 (재렌더링 시 중복 방지)
  const svgElement = d3.select(svgRef.value);
  svgElement.selectAll("*").remove();

  const svg = svgElement
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // 2. 스케일 설정
  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.totalCount) || 10]) // 데이터 없을 시 대비
    .range([0, width]);

  const y = d3.scaleBand()
    .domain(data.map(d => d.id))
    .range([0, height])
    .padding(0.3);

  // 3. 축(Axis) 추가
  svg.append('g')
    .call(d3.axisLeft(y).tickSize(0))
    .select('.domain').remove();

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);  
  // 4. 막대(Bar) 생성
  svg.selectAll('rect')
    .data(data)
    .join('rect')
    .attr('y', d => y(d.id))
    .attr('x', 0)
    .attr('height', y.bandwidth())
    .attr('fill', (d, i) => colorScale(i))
    .attr('rx', 4)
    .attr('width', 0) // 초기 애니메이션용
    .transition()
    .duration(1200)
    .ease(d3.easeExpOut)
    .attr('width', d => x(d.totalCount));

  // 5. 텍스트 라벨 추가
  svg.selectAll('.label')
    .data(data)
    .join('text')
    .attr('class', 'label')
    .attr('y', d => y(d.id) + y.bandwidth() / 2 + 5)
    .attr('x', 0)
    .style('font-size', '14px')
    .style('font-weight', 'bold')
    .style('fill', '#000')
    .text(d => `${d.totalCount}건`)
    .transition()
    .duration(1200)
    .ease(d3.easeExpOut)
    .attr('x', d => x(d.totalCount) + 5);
};
</script>