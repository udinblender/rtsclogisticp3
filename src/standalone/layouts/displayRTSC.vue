<template>
    <div class="realtime-layout">
        <router-view />
    </div>
</template>

<script>
import realtime from '@/views/Realtimestock.vue';

export default {
    name: 'realtimestock',
    components: {
        realtime
    }
}
</script>

<style scoped>
.realtime-layout {
    /* Gaya khusus untuk halaman login */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #111;
    /* Warna latar belakang halaman login */
}
</style>