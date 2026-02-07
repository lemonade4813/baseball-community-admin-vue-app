<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import Header from './components/Header.vue';
import { computed } from 'vue';
    const route = useRoute();
    const currentPath = computed(() => route.path);
  

</script>

<template>
  <div class="container">
    <Header/>
    <nav class="nav" v-if="currentPath !== '/login'">
      <RouterLink to="/foods">맛집 정보 수정</RouterLink>
      <RouterLink to="/stadiums">경기장 정보 수정</RouterLink>
      <RouterLink to="/members">회원 관리</RouterLink>
      <RouterLink to="/schedules-upload">경기일정 관리</RouterLink>
    </nav>
    <RouterView></RouterView>
  </div>

</template>

<style lang="scss">
  .nav{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    color : #FFF;
    background-color: #000;
    height: 40px;

    a{
      flex : 1;
      text-align: center;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    a:hover{
      color : #EC4586;
      background-color: #FFF;
      border : 1px solid #000;
    }
  }
</style>
