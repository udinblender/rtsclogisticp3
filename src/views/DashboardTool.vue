<template>
  <div class="container-fluid">
    <div class="card p-2">
      <div class="card-header">
        <h2 class="text-center">Shift : {{ currenthShift }}</h2>
      </div>
      <div class="row mt-3" style="text-align: center">
        <h3 for="">Reservasi Tool Baru</h3>
        <div class="col-3">
          <div class="row mt-2">
            <h3>Tipe Tool</h3>
            <div class="row">
              <div class="col-6">
                <label for="">Tanggal</label>
                <input
                  class="form-control"
                  type="text"
                  id="toolType"
                  v-model="reservasiDate"
                  disabled
                />
              </div>
            </div>
            <div class="col mt-2">
              <label for="drill">Drill</label>
              <input
                class="form-control"
                type="text"
                id="drill"
                v-model="drill"
                @change="submitData('reservasi')"
              />
              <label for="reamer">Reamer</label>
              <input
                class="form-control"
                type="text"
                id="reamer"
                v-model="reamer"
                @change="submitData('reservasi')"
              />
            </div>
            <div class="col mt-2">
              <label for="tap">Tap</label>
              <input
                class="form-control"
                type="text"
                id="tap"
                v-model="tap"
                @change="submitData('reservasi')"
              />
              <label for="insert">Insert</label>
              <input
                class="form-control"
                type="text"
                id="insert"
                v-model="insert"
                @change="submitData('reservasi')"
              />
            </div>
          </div>
          <!-- row -->
        </div>
        <div class="col-9">
          <div class="card">
            <apexchart
              type="line"
              width="100%"
              height="250"
              :options="lineChartOptions"
              :series="lineChartSeries"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid mt-2">
    <div class="card p-2">
      <div class="row mt-3" style="text-align: center">
        <h2 for="regDrill">Regrinding Tool</h2>
        <div class="col-3">
          <h3>Waktu</h3>
          <div class="row">
            <div class="col-6">
              <label for="">Tanggal</label>
              <input
                class="form-control"
                type="text"
                id="toolType"
                v-model="reservasiDate"
                disabled
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <label for="regDrill">07.30 ~ 11.45</label>
              <input
                class="form-control"
                type="text"
                id="regDrill"
                v-model="morning"
                @change="submitData('regrinding')"
              />
            </div>
            <div class="col">
              <label for="regReamer">12.30 ~ 16.00</label>
              <input
                class="form-control"
                type="text"
                id="regReamer"
                v-model="afterLunch"
                @change="submitData('regrinding')"
              />
            </div>
          </div>
        </div>
        <div class="col-9">
          <div class="card">
            <apexchart
              type="line"
              width="100%"
              height="250"
              :options="regLineChartOptions"
              :series="regLineChartSeries"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import 'vue-multiselect/dist/vue-multiselect.css' // Impor CSS file
import moment from 'moment-timezone'
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardTool',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    const currentMonth = moment().format('MMMM YYYY')
    return {
      currenthShift: '',
      drill: null,
      reamer: null,
      tap: null,
      insert: null,
      regDrill: null,
      regReamer: null,
      regTap: null,
      morning: null,
      afterLunch: null,
      reservasiDate: moment().format('DD-MM-YYYY'),
      lineChartOptions: {
        chart: {
          type: 'line',
          height: 350,
          toolbar: {
            show: false,
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
        },
        title: {
          text: `Total Reservasi - ${currentMonth}`,
          align: 'center',
          style: {
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#263238',
          },
        },
        markers: {
          size: 5,
          colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'],
          strokeColors: '#fff',
          strokeWidth: 2,
          shape: 'circle',
          hover: {
            sizeOffset: 3,
          },
        },
        dataLabels: {
          enabled: true, // Aktifkan data labels
          formatter: function (val) {
            return val // Format nilai yang akan ditampilkan
          },
        },
        xaxis: {
          categories: [], // Dates from 1 to 31
          title: {
            text: 'Tanggal',
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            height: 6,
            offsetX: 0,
            offsetY: 0,
          },
        },
        yaxis: {
          title: {
            text: 'Total Reservasi',
          },
          axisBorder: {
            show: true,
            color: '#78909C',
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            width: 6,
            offsetX: 0,
            offsetY: 0,
          },
        },
        grid: {
          show: true,
          borderColor: '#f1f1f1',
        },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'],
        tooltip: {
          enabled: true,
          theme: 'dark',
        },
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'right',
          labels: {
            useSeriesColors: true,
          },
        },
      },
      lineChartSeries: [
        {
          name: 'Total Reservasi',
          Red: [], // Values of total drill + reamer + tap + insert
          White: [],
        },
      ],
      regLineChartOptions: {
        chart: {
          type: 'line',
          height: 350,
          toolbar: {
            show: false,
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
        },
        title: {
          text: `Total Regrinding - ${currentMonth}`,
          align: 'center',
          style: {
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#263238',
          },
        },
        markers: {
          size: 5,
          colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'],
          strokeColors: '#fff',
          strokeWidth: 2,
          shape: 'circle',
          hover: {
            sizeOffset: 3,
          },
        },
        dataLabels: {
          enabled: true, // Aktifkan data labels
          formatter: function (val) {
            return val // Format nilai yang akan ditampilkan
          },
        },
        xaxis: {
          categories: [], // Dates from 1 to 31
          title: {
            text: 'Tanggal',
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            height: 6,
            offsetX: 0,
            offsetY: 0,
          },
        },
        yaxis: {
          title: {
            text: 'Total Regrinding',
          },
          axisBorder: {
            show: true,
            color: '#78909C',
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            width: 6,
            offsetX: 0,
            offsetY: 0,
          },
        },
        grid: {
          show: true,
          borderColor: '#f1f1f1',
        },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'],
        tooltip: {
          enabled: true,
          theme: 'dark',
        },
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'right',
          labels: {
            useSeriesColors: true,
          },
        },
      },
      regLineChartSeries: [
        {
          name: 'Total Regrinding',
          Red: [], // Values of total drill + reamer + tap + insert
          White: [],
        },
      ],
    }
  },
  computed: {
    ...mapGetters([
      'getReservasi',
      'getGrafikReservasi',
      'getRegrinding',
      'getGrafikRegrinding',
      'getCurrentShift',
    ]),
  },
  watch: {
    // Watcher untuk perubahan shift
    currenthShift(newShift, oldShift) {
      if (newShift !== oldShift) {
        this.resetForm()
        // Panggil ActionGetReservasi dengan shift baru
        this.$store.dispatch('ActionGetReservasi', newShift)
      }
    },
    getReservasi: {
      handler(newVal) {
        if (newVal) {
          const today = moment().format('YYYY-MM-DD')
          console.log('today', today)
          const reservasiDate = moment(newVal.reservasi_dt).format('YYYY-MM-DD')
          console.log('reservasiDate', reservasiDate)

          if (reservasiDate === today) {
            this.drill = newVal.drill || ''
            this.reamer = newVal.reamer || ''
            this.tap = newVal.tap || ''
            this.insert = newVal.insert || ''
          }
        }
      },
      immediate: true,
      deep: true,
    },

    getRegrinding: {
      handler(newVal) {
        if (newVal) {
          const today = moment().format('YYYY-MM-DD')
          // console.log('today', today)
          const regDate = moment(newVal.reg_dt).format('YYYY-MM-DD')

          // console.log('regDate', regDate)

          if (regDate === today) {
            this.morning = newVal.morning_ses || ''
            // console.log('morning', this.morning)
            this.afterLunch = newVal.afterlunch_ses || ''
            // console.log('afterLunch', this.afterLunch)
          }
        }
      },
      immediate: true,
      deep: true,
    },
    getGrafikReservasi: {
      handler(newVal) {
        if (newVal) {
          this.updateReservasiChart(newVal)
        }
      },
      immediate: true,
      deep: true,
    },
    getGrafikRegrinding: {
      handler(newVal) {
        if (newVal) {
          this.updateRegrindingChart(newVal)
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.$store.dispatch('ambilShift').then(() => {
      this.getShift()
    })
    this.$store.dispatch('ActionGetReservasi', this.currenthShift).then(() => {
      if (!this.getGrafikReservasi || this.getGrafikReservasi.length === 0) {
        this.$store.dispatch('ActionGetGrafikReservasi')
      }
      this.$store.dispatch('ActionGetRegrinding', this.currenthShift)
      if (!this.getGrafikRegrinding || this.getGrafikRegrinding.length === 0) {
        this.$store.dispatch('ActionGetGrafikRegrinding')
      }
    })
  },
  methods: {
    getShift() {
      this.currenthShift = this.getCurrentShift
      // console.log('currenthShift', this.currenthShift)
    },
    async submitData(type) {
      try {
        const reservasiDate = moment().format('YYYY-MM-DD')
        let payload = {}
        let endpoint = ''
        const currenthShift = this.currenthShift
        if (type === 'reservasi') {
          payload = {
            drill: this.drill,
            reamer: this.reamer,
            tap: this.tap,
            insert: this.insert,
            reservasiDate,
            shift: currenthShift,
          }
          endpoint = 'reservasi/add'
        } else if (type === 'regrinding') {
          payload = {
            morning: this.morning,
            afterlunch: this.afterLunch,
            reservasiDate,
            shift: this.currenthShift,
          }
          endpoint = 'regrinding/add'
        }
        console.log('payload', payload)
        console.log('endpoint', endpoint)
        // Use axios or fetch to send data to backend
        await this.$store
          .dispatch('ActionSubmitData', { endpoint, payload })
          .then(() => {
            this.$store.dispatch('ActionGetReservasi', currenthShift)
            this.$store.dispatch('ActionGetGrafikReservasi')
            this.$store.dispatch('ActionGetRegrinding', currenthShift)
            this.$store.dispatch('ActionGetGrafikRegrinding')
          })
      } catch (error) {
        console.error('Error submitting data:', error)
      }
    },
    resetForm() {
      // Reset semua input form ketika shift berubah
      this.drill = null
      this.reamer = null
      this.tap = null
      this.insert = null
      this.morning = null
      this.afterLunch = null
    },
    updateReservasiChart(data) {
      const daysInMonth = moment().daysInMonth()
      const newData = { Red: [], White: [] }

      data.forEach((item) => {
        const shiftData = {
          drill: item.drill || 0,
          reamer: item.reamer || 0,
          tap: item.tap || 0,
          insert: item.insert || 0,
        }

        newData[item.shift].push(shiftData)
      })

      this.lineChartSeries.Red = this.aggregateData(newData.Red, daysInMonth)
      this.lineChartSeries.White = this.aggregateData(
        newData.White,
        daysInMonth,
      )
    },
    updateRegrindingChart(data) {
      const daysInMonth = moment().daysInMonth()
      const newData = { Red: [], White: [] }

      data.forEach((item) => {
        const shiftData = {
          morning_ses: item.morning_ses || 0,
          afterlunch_ses: item.afterlunch_ses || 0,
        }

        newData[item.shift].push(shiftData)
      })

      this.regLineChartSeries.Red = this.aggregateData(newData.Red, daysInMonth)
      this.regLineChartSeries.White = this.aggregateData(
        newData.White,
        daysInMonth,
      )
    },
    aggregateData(data, daysInMonth) {
      const aggregatedData = Array(daysInMonth).fill(0)

      data.forEach((shiftData) => {
        // Aggregate data for each day
        for (let i = 0; i < daysInMonth; i++) {
          aggregatedData[i] += shiftData[i] || 0
        }
      })

      return aggregatedData
    },
  },
}
</script>

<style>
.form-control {
  margin-bottom: 2px;
}
</style>
