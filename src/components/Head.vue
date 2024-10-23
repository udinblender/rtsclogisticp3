<template>
  <!-- judul -->
  <CCard style="width: 100%; text-align: left; margin: 0 0 10px 0">
    <CListGroup
      style="background-color: #aa0000; color: white"
      class="text-center"
    >
      <div>
        <h1
          style="
            font-size: 5rem;
            font-weight: bold;
            margin: 0;
          "
        >
          STOCK {{ area }}
        </h1>
      </div>

      <div style="font-size: 1.5rem; font-weight: lighter;color: #e0e0e0;">
        {{ today }} {{ currentTime }} WIB
      </div>
    </CListGroup>
  </CCard>
</template>

<script>
export default {
  name: 'head',
  props: ['area'],
  data() {
    return {
      currentTime: '',
      today: '',
    }
  },

  methods: {
    getNameDay() {
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      const date = new Date()
      const day = date.getDay()
      const hari = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()
      const now = `${days[day]},${hari} ${months[month]} ${year}`
      this.today = now
    },

    getCurrentTime() {
      const padWithZero = (number) => (number < 10 ? '0' + number : number)
      const now = new Date()
      const hours = padWithZero(now.getHours())
      const minutes = padWithZero(now.getMinutes())
      const seconds = padWithZero(now.getSeconds())

      this.currentTime = `${hours}:${minutes}:${seconds}`
    },
  },
  mounted() {
    this.getCurrentTime() // Initialize clock immediately
    this.getNameDay() // Initialize clock immediately
    setInterval(this.getCurrentTime, 1000) // Update clock every second
    setInterval(this.getNameDay, 1000) // Update clock every second
  },
}
</script>
