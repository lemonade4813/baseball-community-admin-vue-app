<template>
  <MemberCountByTeamChart/>
  <div class="chart-flex">
    <BulletinBoardDonutChart/>
    <BulletinBoardBarChart/>
  </div>
</template>
<script setup>
  import MemberCountByTeamChart from '@/components/charts/MemberCountByTeamChart.vue';
  import BulletinBoardDonutChart from '@/components/charts/BulletinBoardDonutChart.vue';
  import BulletinBoardBarChart from '@/components/charts/BulletinBoardBarChart.vue';
</script>
<style scoped>
  .chart-flex{
    display: flex;
    margin-top: 80px;
    justify-content: center;
  }
</style>