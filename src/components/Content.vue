<template>
  <a
    href="#/app/andon/dashboard"
    class="menu-right"
    style="position: fixed; z-index: 99"
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

  <div class="text-center" style="padding: 0">
    <CCard style="width: 100%; margin: 0 0 10px 0">
      <CListGroup
        style="
          height: 100%;
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
</template>

<script>
import data from '@/standalone/components/data.vue'
import { CChartBar } from '@coreui/vue-chartjs'

export default {
  name: 'content',
  components: { data },

  data() {
    return {
      tasks: data.parts
        .filter((part) => part.stockMinute < 100)
        .map((part) => part)
        .sort((a, b) => a.stockMinute - b.stockMinute),
    }
  },
}
console.log(data.parts)
</script>
