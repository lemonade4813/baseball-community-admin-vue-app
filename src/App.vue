<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/foods">맛집 정보 수정</RouterLink>
        <RouterLink to="/stadiums">경기장 정보 수정</RouterLink>
        <RouterLink to="/members">회원 관리</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>


</style>
