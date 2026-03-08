<template>
  <div class="container">
    <h2>경기장 정보 수정</h2>
    <div v-if="error" class="error-msg">{{ error }}</div>
    <div v-else class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>팀명</th>
            <th>경기장명</th>
            <th>주소</th>
            <th>홈페이지</th>
            <th>이미지</th>
            <th>수정하기</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in stadiums" :key="item.id" @click="goToDetail(item.team)" style="cursor: pointer;">
            <td>{{ item.name }}</td>
            <td>{{ item.stadiumName }}</td>
            <td>{{ item.address }}</td>
            <td>
              <a :href="item.homepage" target="_blank" v-if="item.homepage">방문하기</a>
            </td>
            <td class="img-cell">
              <img :src="`${baseUrl}${item.imagePath}`" alt="경기장 이미지" />
            </td>
              <td>
          <button class="edit-button">수정</button>
          </td>
          </tr>
        
        </tbody>
      </table>
    </div>
    <div v-if="stadiums.length === 0" class="no-data">데이터가 없습니다.</div>
  </div>
</template>

<script setup lang="ts">
import axiosInstance from '@/util/axiosInstance';
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

    interface IStadium{
      id : string;
      name : string;
      team : string;
      stadiumName : string;
      address : string;
      seat : number;
      area : number;
      features : string[];
      imagePath : string;
      homepage : string;
      coordinates : number[];
      float : string;
  }

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const stadiums : IStadium[] = reactive([]);
    const error = ref<null | string>(null);

    const router = useRouter();

    const goToDetail = (team : string) => {
      router.push({ name: 'stadium-detail', params: { team } });
    };

    const fetchData = async () => {

      try {
        const response = await axiosInstance.get('/stadium');
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
.container {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
}

th {
  background-color: #4a5568; 
  color: #ffffff;
  padding: 12px;
  font-weight: 500;
  text-align: center;
  border: 1px solid #333c4d;
}


td {
  padding: 12px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #e2e8f0;
  color: #2d3748;
}

.feature-item {
  display: block;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #4a5568;
}


tbody tr:hover {
  background-color: #f8fafc;
}

img {
  max-width: 100px;
  height: auto;
  border-radius: 4px;
  display: block;
  margin: 0 auto;
}

p {
  margin: 0;
}

.edit-button{
  background-color: #EC4586;
  border-radius: 10px;
  height: 40px;
  width : 100px;
  color : #FFF;
  transition: all 1s ease-in-out;
}

.edit-button:hover{
  background-color: red;
  transform: scale(1);
}

</style>