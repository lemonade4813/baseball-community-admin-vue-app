<template>
    <form class="login-container" @submit.prevent="handleLogin">
        <div class="input-field-container">
            <label class="input-label">아이디</label>
            <input type="text" v-model="userId" class="input-field"/>
        </div>
        <div class="input-field-container">
            <label class="input-label">패스워드</label>
            <input type="password" v-model="password" class="input-field"/>
        </div>
        <button class="login-button" type="submit">로그인</button>
    </form>
</template>


<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

    const userId = ref('');
    const password = ref('');

    console.log(userId.value)
    console.log(password.value)

    const router = useRouter();

    const handleLogin = async (e : Event ) => {

        try{
            const {data, status} = await axios.post('http:/localhost:8080/users/login', 
                                                    { userId : userId.value, 
                                                      password : password.value})
                if(status === 200){
                    console.log(data);
                    console.log('로그인이 완료되었습니다.');
                    router.push('/stadiums');
                }
        }
        catch(e){
            if(e instanceof Error){
                alert(e.message);
            }
        }
    }


</script>

<style scoped>
    .login-container{
        width: 320px;
        height: 320px;
        background-color: #C8C8C8;
        /* margin: auto auto; */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 32px;
    }

    .input-label{
        width: 60px;
    }

    .input-field{
        border : 1px solid #776565;
        border-radius: 8px;
        height: 32px;
    }

    .input-field-container{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    .login-button{
        border-radius: 8px;
        background-color: red;
        color: #FFF;
        width: 120px;
        height: 40px;

    }



</style>