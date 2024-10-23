<template>
  <a
    href="#/app/andon/pline"
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
  <div style="background-color: #e0e0e0;overflow-x: hidden;">
    <Head :area="area" />
    <div class="row d-flex">
      <StockChart class="col-12 col-lg-6"/>
      <ConditionStockShooter :condStock="condStock" :condStd="condStd" class="col-12 col-lg-6"/>
      <MostCriticalPart class="col-12 col-lg-6"/>
      <NextTruckDelivery
        :curTruck="curTruck"
        :curTruckDelv="curTruckDelv"
        :curTime="curTime"
        :planTruck="planTruck"
        :planTruckDelv="planTruckDelv"
        :planTime="planTime"
        class="col-12 col-lg-6"  />
    </div>
  </div>
</template>

<script>
import ConditionStockShooter from '@/components/ConditionStockShooter.vue'
import MostCriticalPart from '@/components/MostCriticalPart.vue'
import NextTruckDelivery from '@/components/NextTruckDelivery.vue'
import Head from '@/components/Head.vue'
import StockChart from '@/components/StockChart.vue';
export default {
  name: 'pLine',
  components: {
    MostCriticalPart,
    ConditionStockShooter,
    NextTruckDelivery,
    StockChart,
    Head,
  },
  data() {
    return {
      //Head
      area: 'P-LANE',
      //conditionStock
      condStock: 2,
      condStd: 3,

      // NextTruckDelivery
      curTruck: 'Rz-01-11',
      curTruckDelv: 'Hikari',
      curTime: '30',
      planTruck: 'Rz-01-12',
      planTruckDelv: 'TTLC',
      planTime: '60',
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
