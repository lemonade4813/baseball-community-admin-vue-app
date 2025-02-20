<template>
  <h2>경기장 정보 수정</h2>
  <div>
    <div v-if="error">{{ error }}</div>
      <table v-else>
        <thead>
          <tr>
            <th>팀명</th>
            <th>경기장명</th>
            <th>주소</th>
            <th>수용인원</th>
            <th>연면적</th>
            <th>특징</th>
            <th>홈페이지</th>
            <th>위도/경도</th>
            <th>이미지</th>
          </tr>
        </thead>
        <tr v-for="item in stadiums" :key="item.id">
          <td>{{ item.team }}</td>
          <td>{{ item.stadiumName }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.seat }}</td>
          <td>{{ item.area }}</td>
          <td v-for="feature in item.features" 
              :key="feature" 
               style="display: flex; flex-direction: column;">
              <p>{{ feature }}</p>
          </td>
          <td>{{ item.homepage }}</td>
          <td>{{ item.coordinates.join(', ') }}</td>
          <td><img :src="'http://localhost:8080' + item.imagePath" alt="경기장 이미지" /></td>
        </tr>
      </table>
    <div v-if="stadiums.length === 0">데이터가 없습니다.</div>
  </div>
</template>

<script setup lang="ts">
import axiosInstance from '@/util/axiosInstance';
import axios from 'axios';
import { ref, onMounted, reactive } from 'vue';


    const stadiums = reactive<any>([]);
    const error = ref<null | string>(null);

    const fetchData = async () => {

      try {
        const response = await axios.get('http://localhost:8080/stadium');
        stadiums.push(...response.data);
        console.log(response.data);
      } catch (e) {
        error.value = '데이터를 불러오는 데 실패했습니다.';
        console.error(e); 
      }
    };

    onMounted(() => {
      fetchData();
    });


</script>

<style scoped>

p {
  margin: 5px 0;
}

img {
  max-width: 100%; 
  height: auto;
}

</style>