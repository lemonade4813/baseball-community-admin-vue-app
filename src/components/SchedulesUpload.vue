<template>
    <div class="container">
      <h2>경기 일정 Excel 파일 업로드</h2>
      <div class="file-upload-wrapper">
      <label for="schedule-excel-file" class="custom-file-label">
        <span v-if="fileName">📄 {{ fileName }}</span>
        <span v-else>파일 선택 (xlsx, xls)</span>
      </label>
      
      <input 
        id="schedule-excel-file"
        type="file" 
        accept=".xlsx, .xls" 
        @change="handleFileChange" 
      />
      <button @click="handleUpload" class="excel-submit-btn">
        서버로 전송
      </button>
    </div>
    <table>
      <tbody>
        <tr>
          <th>경기 일자</th>
          <th>시간</th>
          <th>원정팀</th>
          <th>홈팀</th>
          <th>경기장</th>
          <th>비고</th>
        </tr>
        <tr v-for="schedule in scheduleList">
          <td>{{ schedule.month }}.{{ schedule.date }} ({{ schedule.day }})</td>
          <td>{{ schedule.time }}</td>
          <td>{{ schedule.awayTeam }}</td>
          <td>{{ schedule.homeTeam }}</td>
          <td>{{ schedule.stadium }}</td>
          <td>{{ schedule.notes }}</td>
        </tr>
      </tbody>
    </table>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axiosInstance from '@/util/axiosInstance';

  interface ISchedule{
    month : string;
    date : string;
    day : string;
    time : string;
    awayTeam : string;
    homeTeam : string;
    stadium : string;
    notes : string;
  }[]

  const file = ref(null);
  const fileName = ref(null);
  const scheduleList = ref<ISchedule[]>([]);
  
  const handleFileChange = (e : any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      file.value = files[0];
      fileName.value = files[0].name;
    } else {
      file.value = null; 
    }
  };
  
  const handleUpload = async () => {
    if (!file.value) {
      alert("파일을 먼저 선택해주세요!");
      return;
    }
  
    // FormData 생성
    const formData = new FormData();
    formData.append('file', file.value); // 스프링 부트 파라미터명과 일치
  
    try {
      // 환경 변수 및 경로 설정
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      console.log(baseURL);
      const response = await axiosInstance.post('/api/schedule/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("서버 응답: " + response.data);

    } catch (error) {
      console.error("업로드 실패:", error);
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  const fetchSchedule = async () => {
    try{
      const { data : scheduleData, status } = await axiosInstance.get('/schedule');
        if(status === 200){
            scheduleList.value = scheduleData;
            console.log(scheduleList.value);
        }
    }
    catch(e){
      if(e instanceof Error)
      console.log(e.message);
    }  
  }

  onMounted(()=> fetchSchedule());
</script>
<style>

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

.file-upload-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

/* 커스텀 파일 선택 버튼 스타일 */
.custom-file-label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #edf2f7;
  color: #4a5568;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  min-width: 200px;
  text-align: center;
}

.custom-file-label:hover {
  background-color: #e2e8f0;
  border-color: #a0aec0;
}

/* 전송 버튼 스타일 개선 */
.excel-submit-btn {
  background-color: #4299e1; /* 좀 더 선명한 파란색으로 변경 */
  color: white;
  border: none;
  border-radius: 6px;
  width: 120px;
  height: 42px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.excel-submit-btn:hover {
  background-color: #3182ce;
}

/* 파일 인풋은 숨김 유지 */
input[type="file"] {
  display: none;
}

</style>