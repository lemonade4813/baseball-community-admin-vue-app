<template>
  <div v-if="stadium" class="container">
    <h1>{{ stadium.stadiumName }} 정보 수정</h1>
    <table class="detail-table">
      <tbody>
        <tr>
          <th>팀명</th>
          <td><input type="text" v-model="stadium.name" class="edit-input" /></td>
        </tr>
        <tr>
          <th>경기장명</th>
          <td><input type="text" v-model="stadium.stadiumName" class="edit-input" /></td>
        </tr>
        <tr>
          <th>주소</th>
          <td><input type="text" v-model="stadium.address" class="edit-input" /></td>
        </tr>
        <tr>
          <th>수용인원</th>
          <td>
            <input type="number" v-model.number="stadium.seat" class="edit-input" />
          </td>
        </tr>
        <tr>
          <th>연면적</th>
          <td><input type="number" v-model="stadium.area" class="edit-input" /></td>
        </tr>
        <tr>
          <th>특징 (배열)</th>
          <td>
            <div class="feature-input-group">
              <input 
                type="text" 
                v-model="newFeature" 
                @keyup.enter="addFeature" 
                placeholder="특징 입력 후 엔터"
                class="edit-input-inline"
              />
              <button type="button" @click="addFeature" class="add-btn">추가</button>
            </div>
            
            <div class="feature-tags">
              <span v-for="(feature, index) in stadium.features" :key="index" class="feature-tag">
                {{ feature }}
                <button type="button" @click="removeFeature(index)" class="remove-tag-btn">&times;</button>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <th>홈페이지 URL</th>
          <td><input type="text" v-model="stadium.homepage" class="edit-input" /></td>
        </tr>
        <tr>
          <th>위도</th>
          <td><input type="number" step="any" v-model.number="stadium.coordinates[0]" class="edit-input" /></td>
        </tr>
        <tr>
          <th>경도</th>
          <td><input type="number" step="any" v-model.number="stadium.coordinates[1]" class="edit-input" /></td>
        </tr>
        <tr>
          <th>이미지 경로</th>
          <td>
            <input type="text" v-model="stadium.imagePath" class="edit-input" placeholder="이미지 파일명 또는 경로" />
            <div class="image-preview" v-if="stadium.imagePath">
              <small>미리보기:</small>
              <img :src="`${baseUrl}${stadium.imagePath}`" :alt="stadium.stadiumName" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div class="actions">
      <button @click="submitData" class="save-btn">저장하기</button>
    </div>
  </div>
  
  <div v-else class="loading">
    로딩 중...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/util/axiosInstance';

const baseUrl = import.meta.env.VITE_BASE_URL;
const route = useRoute();
const stadium = ref(null);
const newFeature = ref('');

onMounted(async () => {
  try {
    const teamName = route.params.team; 
    const response = await axiosInstance.get(`/stadium/${teamName}`);
    stadium.value = response.data;
    

    if (!stadium.value.features) {
      stadium.value.features = [];
    }
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
});

// 특징 추가 함수
const addFeature = () => {
  const value = newFeature.value.trim();
  if (value && !stadium.value.features.includes(value)) {
    stadium.value.features.push(value);
    newFeature.value = '';
  }
};

// 특징 삭제 함수
const removeFeature = (index) => {
  stadium.value.features.splice(index, 1);
};

// POST 요청 전송
const submitData = async () => {
  try {
    const teamName = route.params.team;
    const response = await axiosInstance.post(`/stadium/${teamName}`, stadium.value);
    alert("성공적으로 저장되었습니다!");
    console.log("서버 응답:", response.data);
  } catch (error) {
    console.error("저장 중 오류 발생:", error);
    alert("저장에 실패했습니다.");
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.detail-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #e2e8f0;
}

th {
  background-color: #4a5568; 
  color: #ffffff;
  padding: 12px 20px;
  font-weight: 600;
  text-align: left;
  border: 1px solid #333c4d;
  width: 30%;
}

td {
  padding: 10px;
  text-align: left;
  vertical-align: middle;
  border: 1px solid #e2e8f0;
  color: #2d3748;
}

.edit-input, .edit-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 0.95rem;
}

.edit-textarea {
  min-height: 80px;
  resize: vertical;
}

.image-preview {
  margin-top: 10px;
}

img {
  max-width: 150px;
  height: auto;
  border-radius: 4px;
  display: block;
  margin-top: 5px;
}

.actions {
  margin-top: 20px;
  text-align: center;
}

.save-btn {
  padding: 10px 30px;
  background-color: #48bb78;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.save-btn:hover {
  background-color: #38a169;
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
}

.feature-input-group {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.edit-input-inline {
  flex: 1;
  padding: 8px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
}

.add-btn {
  padding: 0 15px;
  background-color: #4a5568;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.feature-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  background-color: #edf2f7;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  border: 1px solid #cbd5e0;
}

.remove-tag-btn {
  background: none;
  border: none;
  color: #e53e3e;
  font-weight: bold;
  margin-left: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
}

.save-btn {
  width: 200px;
  padding: 12px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #2b6cb0;
}
</style>