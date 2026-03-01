<template>
  <MemberCountByTeamChart/>
  <div style="display: flex; margin-top : 20px;">
    <BulletinBoardDonutChart/>
    <BulletinBoardBarChart/>
  </div>
</template>
<script setup>
  import MemberCountByTeamChart from '@/components/charts/MemberCountByTeamChart.vue';
  import BulletinBoardDonutChart from '@/components/charts/BulletinBoardDonutChart.vue';
  import BulletinBoardBarChart from '@/components/charts/BulletinBoardBarChart.vue';
</script>