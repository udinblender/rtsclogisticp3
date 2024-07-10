<template>
  <div class="card">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <!-- Elemen Navbar Kiri -->
        <a
          class="navbar-brand"
          href="#"
          :class="{ 'active-link': selectedLink === 'ToolDrawing' }"
          @click.prevent="showComponent('ToolDrawing', 'ToolDrawing')"
        >
          Tool Drawing
        </a>
        <a
          class="navbar-brand"
          href="#"
          :class="{ 'active-link': selectedLink === 'ToolInventory' }"
          @click.prevent="showComponent('ToolInventory', 'ToolInventory')"
        >
          Tool Inventory
        </a>
        <a
          class="navbar-brand"
          href="#"
          :class="{ 'active-link': selectedLink === 'ToolTransfer' }"
          @click.prevent="showComponent('ToolTransfer', 'ToolTransfer')"
        >
          Tool Transfer
        </a>
        <a
          class="navbar-brand"
          href="#"
          :class="{ 'active-link': selectedLink === 'ToolReceiving' }"
          @click.prevent="showComponent('ToolReceiving', 'ToolReceiving')"
        >
          Tool Receiving
        </a>

        <!-- Tombol Toggle untuk Layar Kecil -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Konten Navbar yang Kolaps -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex ms-auto">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  </div>
  <!-- Tempat untuk menampilkan komponen berdasarkan pilihan -->
  <template v-if="currentComponent === 'ToolDrawing'">
    <ToolDrawing />
  </template>
  <div v-if="currentComponent === 'ToolInventory'">
    <ToolInventory />
  </div>
  <div v-if="currentComponent === 'ToolTransfer'">
    <ToolTransfer />
  </div>
  <div v-if="currentComponent === 'ToolReceiving'">
    <ToolReceiving />
  </div>
</template>

<script>
// Import komponen yang akan digunakan
import ToolDrawing from '@/views/TMS/ToolDrawing.vue'
import ToolInventory from '@/views/TMS/ToolInventory.vue'
import ToolTransfer from '@/views/TMS/ToolTransfer.vue'
import ToolReceiving from '@/views/TMS/ToolReceiving.vue'

export default {
  name: 'ToolManagementSystem',
  components: {
    ToolDrawing,
    ToolInventory,
    ToolTransfer,
    ToolReceiving,
  },
  data() {
    return {
      currentComponent: null, // Komponen yang akan ditampilkan
      selectedLink: null, // Tautan yang sedang dipilih
    }
  },
  methods: {
    showComponent(componentName, linkName) {
      this.currentComponent = componentName
      this.selectedLink = linkName // Perbarui tautan yang dipilih
    },
  },
}
</script>

<style scoped>
/* Gaya untuk tautan yang aktif */
.active-link {
  font-weight: bold;
  color: #0d6efd; /* Ganti warna sesuai preferensi Anda */
  border: 2px solid #000000; /* Membuat kotak di sekitar tautan */
  border-radius: 4px; /* Membuat sudut kotak melengkung */
  padding: 5px 10px; /* Menambahkan ruang di dalam kotak */
  background-color: #77f8e3; /* Latar belakang kotak */
}
</style>
