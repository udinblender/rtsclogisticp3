<template>
  <a
    href="#/app/andon/sps"
    class="menu-right"
    style="position: fixed; z-index: 99; right: 0; text-decoration: none"
  >
    <button
      class="fullscreen-btn"
      v-if="!isFullScreen"
      @click="toggleFullScreen"
    >
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-maximize"
      >
        <path d="M8 3H5a2 2 0 0 0-2 2v3" />
        <path d="M16 3h3a2 2 0 0 1 2 2v3" />
        <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
        <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
      </svg>
      <span>Fullscreen</span>
    </button>
  </a>
  <!-- <h1 style="text-align: center; background-color: black;position: fixed;color: #ffffff;font-size: 6rem;font-weight: bolder ;z-index: 99;width: 90%;margin: 25% 5%">UNDER CONSTRUCTION</h1>
  <div style="background-color: #e0e0e0; height: 100vh;
  filter: blur(5px);
  "> -->
    <Head :area="area" />

    <div class="row justify-content-between" style="width: 100%">
      
     <StockChart class="col-lg-6 col-12" style="padding: 0 0.2rem 0 0"/>
      <ConditionStock
      :condStock="condStock"
      :condStd="condStd"
      class="col-lg-6 col-12 pe-lg-1 p-0"
      style="padding: 0  0"
      />
     
      <MostCriticalPart class="col-lg-6 col-12" 
      style="padding: 0 0.2rem 0 0"/>
      <CounterPline
        :pLine="pLine"
        :counter="counter"
        :pLineStd="pLineStd"
        class="col-lg-6 col-12"
        style="padding: 0"
      />
    </div>
  <!-- </div> -->
</template>

<script>
import ConditionStock from '@/components/ConditionStock.vue'
import Content from '@/components/Content.vue'
import CounterPline from '@/components/CounterPline.vue'
import MostCriticalPart from '@/components/MostCriticalPart.vue'
import VariantProgress from '@/components/VariantProgress.vue'
import StockChart from '@/components/StockChart.vue'
import Data from '@/standalone/components/data.vue'
import Head from '@/components/Head.vue'


export default {
  name: 'sps',
  components: {
    CounterPline,
    MostCriticalPart,
    ConditionStock,
    Content,
    VariantProgress,
    StockChart,
    Head,
    Data,
  },
  data() {
    return {
      // head
      area: 'SPS',
      //conditionStock
      condStock: 1,
      condStd: 60,
      // pLine
      pLine: 11,
      counter: 30,
      pLineStd: 2,
      // variantProgress
      VariantProgress: 170,
    }
  },

  mounted() {
    // Update the date every minute

    // Event listener to track fullscreen changes
    document.addEventListener('fullscreenchange', this.checkFullScreen)
  },
  methods: {
    toggleFullScreen() {
      const doc = document.documentElement
      if (!document.fullscreenElement) {
        doc.requestFullscreen().catch((err) => {
          alert(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`,
          )
        })
      } else {
        document.exitFullscreen()
      }
    },
    checkFullScreen() {
      this.isFullScreen = !document.fullscreenElement
    },
  },
  beforeDestroy() {
    document.removeEventListener('fullscreenchange', this.checkFullScreen)
  },
}
</script>

<style scoped>
/* Apply background image to the app */
.app-background {
  background-image: url('@/assets/images/bg-blurred_06.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(152, 4, 4, 0.8);
  color: white;
  padding: 20px;
  transition: width 0.5s ease;
  width: 100%;
  margin: 0 auto;
}

.menu-header.fullscreen-mode {
  width: 100%;
}

.menu-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
}

.menu-left h2 {
  margin: 0;
  font-size: 3rem;
}

.menu-left p {
  margin: 0;
  font-size: 40px;
  color: #decdcd;
}

.menu-right {
  display: flex;
  align-items: center;
}

.fullscreen-btn {
  background-color: #910404;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 16px;
}

.fullscreen-btn svg {
  margin-right: 5px;
}

.fullscreen-btn:hover {
  background-color: #0056b3;
}

/* Most Critical Parts Section */
.critical-parts {
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  text-align: center;
}

.critical-parts h3 {
  margin-bottom: 20px;
  color: black;
  font-size: 30px;
  font-weight: bold;
}

.part-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
}

.part-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e6e6e6;
  border-radius: 8px;
  padding: 15px;
  width: 120px;
  /* Adjust width */
  height: 120px;
  /* Adjust height */
}

.part-code {
  background-color: #7f0602;
  color: white;
  padding: 10px;
  font-weight: bold;
  font-size: 24px;
  /* Adjust font size */
  border-radius: 5px;
}

.part-time {
  background-color: #000;
  color: white;
  padding: 5px;
  font-size: 20px;
  /* Adjust font size */
  border-radius: 5px;
  margin-top: 5px;
}
</style>