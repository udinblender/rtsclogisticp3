<template>
  <div class="text-center" >
    <CCard style="width: 100%;">
      <div class="d-flex flex-row">
        <div style="height: 27.5vh; width: 100%">
          <CListGroup
            style="
              font-size: 2rem;
              background-color:#aa0000;
              color:white ;
              font-weight: bold;
            "
          >
            <div>
              Next P/L to Fill In
            </div>
          </CListGroup >

          <CCardBody style="height: 27vh; font-size: 3rem; padding: 0;background-color:none">
            <div class="d-flex flex-row text-center" style="height: 27vh;">
              <div
                style="
                  width: 50%;
                  background-color: 	#e0e0e0;
                  border-left: 1px solid transparent;
                  border-bottom: 1px solid transparent;
                  border-right: 1px solid transparent;
                  border-radius: 5%
                "
              >
                <div style="height: 30%;  background-color: orangered">
                  <h1 style="padding: 10px 0;color: white">P-Lane</h1>
                </div>
                <div style="height: 70%">
                  <h1 style="padding: 20px 0; font-size: 5rem;color: black">{{ pLine }}</h1>
                </div>
              </div>

              <div style="width: 50%;
              background-color:#e0e0e0;
                  border-left: 1px solid transparent;
                  border-bottom: 1px solid transparent;
                  border-right: 1px solid transparent;
                  border-radius: 5%">

                <div style="height: 30%; background-color: orangered">
                  <h1 style="padding: 10px 0;color: white">Counter</h1>
                </div>
                <div style="height: 70%">
                  <h1
                    style="padding: 20px 0; font-size: 5rem;color: black"
                  >
                    {{ counter }}
                  </h1>
                </div>
              </div>
            </div>
          </CCardBody>

          <CListGroup
            flush
            style="background-color:	#aa0000; font-size: 2rem; color: white"
          >
            <CCardText>30Min left </CCardText>
          </CListGroup>
        </div>
      </div>
    </CCard>
  </div>
</template>

<script>
import data from '@/standalone/components/data.vue'

export default {
  name: 'counterPline',
  component: { data },
  props: {
    pLine: '',
    counter: '',
    pLineStd: '',
  },
  data() {
    return {
      totalTime: 10 * 60, // Total time in seconds (10 minutes)
      timeRemaining: 10 * 60, // Initialize remaining time
      timer: null,
    }
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timeRemaining / 60)
      const seconds = this.timeRemaining % 60
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0',
      )}`
    },
  },
  methods: {
    startCountdown() {
      this.timer = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--
        } else {
          clearInterval(this.timer)
        }
      }, 1000)
    },
  },
  mounted() {
    this.startCountdown()
  },
  beforeDestroy() {
    clearInterval(this.timer) // Clear the timer when the component is destroyed
  },
}
</script>
