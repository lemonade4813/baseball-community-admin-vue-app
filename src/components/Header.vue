<script setup lang="ts">
</script>

<template>
    <header class="header">
        <h1 class="title">Inside the park
            <span class="admin-text">admin</span>
        </h1>
        <RouterLink to="/login">로그인</RouterLink>
    </header>
</template>

<style scoped>
    @font-face {
        font-family: 'College';
        src: url('../fonts/College.woff2');
    }
    
    .title{
        font-family: 'College';
        font-size: 40px;
        display: flex;
        align-items: flex-end;
        font-weight: 500;
    }

    .admin-text{
        font-size : 20px;
        color: orange;
    }

    .header{
        box-shadow: 0 2px rgb(0 0 0 / 0.1);
    }
</style>