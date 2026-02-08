<template>
    <div>
      <h3>경기 일정 Excel 파일 업로드</h3>
      <input 
        type="file" 
        accept=".xlsx, .xls" 
        @change="handleFileChange" 
      />
      <button @click="handleUpload" style="margin-left: 10px;">
        서버로 전송
      </button>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
import axiosInstance from '@/util/axiosInstance';
  

  const file = ref(null);
  
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      file.value = files[0];
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
</script>