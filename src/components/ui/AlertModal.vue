<template>
    <teleport to="#modal" v-if="isOpen">
        <div class="modal-overlay">
            <div class="modal-content">
                <p>{{ message }}</p>
                <button @click="closeModal" class="modal-close-button">닫기</button>
            </div>
        </div>
    </teleport>
</template>


<script setup lang="ts">
import { useModalState } from '@/stores/useModalState';
    const { isOpen, closeModal, message } = useModalState();
</script>

<style>
    .modal-overlay{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index : 9999;
    }
    
    .modal-content{
        display : flex;
        align-items : center;
        gap : 20px;
        flex-direction : column;
        padding: 24px;
        border-radius: 8px;
        width : 180px;
        opacity : 0.8;
    }

    .modal-close-button{
        border-radius: 8px;
        width: 120px;
        height: 40px;
        background-color: #000;
        color : #FFF;
    }
</style>