<template>
  <h6>Dashboard</h6>
   
<!-- <a href="#/app/andon/dashboard" class="menu-right"
      style="position: fixed;z-index: 99;">
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

  <div :style="{ height: heightValue }">
    <h1 style="background-color: #aa0000;height: 100%">Dashboard</h1>
    <div class="text-center" style="padding: 0">
    <CCard style="width: 100%; margin: 0 0 10px 0">
      <CListGroup
        style="
          height: 200%;
          font-size: 500%;
          background-color: #aa0000;
          color: white;
        "
      >
        <div>Most Critical Part</div>
      </CListGroup>

      <CCardBody style="height: 8rem">
        <div class="d-flex justify-content-start" style="overflow: hidden">
          <div
            style="width: 7rem; margin: 0 0.3rem"
            v-for="task in tasks"
            :key="task"
          >
            <CCardBody
              style="
                border-radius: 10px 10px 10px 10px;
                -webkit-border-radius: 10px 10px 10px 10px;
                -moz-border-radius: 10px 10px 10px 10px;
                background: whitesmoke;
                height: 6.5rem;
              "
            >
              <CCardText
                style="
                  color: white;
                  border-radius: 10px 10px 10px 10px;
                  -webkit-border-radius: 10px 10px 10px 10px;
                  -moz-border-radius: 10px 10px 10px 10px;
                  background: #aa0000;
                  font-size: 1.7rem;
                "
                >{{ task.part }}</CCardText
              >
              <CCardText style="font-size: 1rem"
                >{{ task.stockMinute }}Min</CCardText
              >
            </CCardBody>
          </div>
        </div>
      </CCardBody>
    </CCard>
  </div>
  </div> -->
</template>

<script>
import MainChartExample from './charts/MainChartExample'
import WidgetsStatsA from './widgets/WidgetsStatsTypeA.vue'
import WidgetsStatsD from './widgets/WidgetsStatsTypeD.vue'
import Content from '@/components/Content.vue'
import data from '@/standalone/components/data.vue';

export default {

  name: 'Dashboard',
  components: {
  Content,data
  },data() {
    return {
      isFullScreen: false,
     heightValue: '80vh', 
      tasks: data.parts
        .filter((part) => part.stockMinute < 100)
        .map((part) => part)
        .sort((a, b) => a.stockMinute - b.stockMinute),
    }
  },  mounted() {
    // Update the date every minute

    // Event listener to track fullscreen changes
    document.addEventListener('fullscreenchange', this.checkFullScreen)
  },
  setup() {
    const progressGroupExample1 = [
      { title: 'Monday', value1: 34, value2: 78 },
      { title: 'Tuesday', value1: 56, value2: 94 },
      { title: 'Wednesday', value1: 12, value2: 67 },
      { title: 'Thursday', value1: 43, value2: 91 },
      { title: 'Friday', value1: 22, value2: 73 },
      { title: 'Saturday', value1: 53, value2: 82 },
      { title: 'Sunday', value1: 9, value2: 69 },
    ]
    const progressGroupExample2 = [
      { title: 'Male', icon: 'cil-user', value: 53 },
      { title: 'Female', icon: 'cil-user-female', value: 43 },
    ]
    const progressGroupExample3 = [
      {
        title: 'Organic Search',
        icon: 'cib-google',
        percent: 56,
        value: '191,235',
      },
      { title: 'Facebook', icon: 'cib-facebook', percent: 15, value: '51,223' },
      { title: 'Twitter', icon: 'cib-twitter', percent: 11, value: '37,564' },
      { title: 'LinkedIn', icon: 'cib-linkedin', percent: 8, value: '27,319' },
    ]
    const tableExample = [
      
    ]

    return {
      tableExample,
      progressGroupExample1,
      progressGroupExample2,
      progressGroupExample3,
    }
  },
  methods: {
    toggleFullScreen() {
      const doc = document.documentElement;
      if (!document.fullscreenElement) {
        doc.requestFullscreen().catch((err) => {
          alert(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name} )`,
          )
        })
      } else {
        const currentHeight = parseInt(this.heightValue);
        this.heightValue = `100vh`;
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
