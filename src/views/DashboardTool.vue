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
          data: [], // Values of total drill + reamer + tap + insert
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
          data: [], // Values of total drill + reamer + tap + insert
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
    getReservasi: {
      handler(newVal) {
        if (newVal) {
          const today = moment().format('YYYY-MM-DD')
          const reservasiDate = moment(newVal.reservasi_dt).format('YYYY-MM-DD')

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
    getGrafikReservasi: {
      handler(newVal) {
        if (newVal) {
          // console.log('Data received from server:', newVal) // Debugging line
          const daysInMonth = moment().daysInMonth() // Get current date
          // console.log('currentDate', currentDate)
          // Initialize data array with default values of 0 for each date
          const data = Array(daysInMonth).fill(0)

          // Iterate through each reservation entry and add the reservation counts to the corresponding date
          newVal.forEach((grafikReservasi) => {
            const reservasiDate = moment(grafikReservasi.reservasi_dt).date()
            // console.log('reservasiDate', reservasiDate)
            data[reservasiDate - 1] +=
              grafikReservasi.drill +
              grafikReservasi.reamer +
              grafikReservasi.tap +
              grafikReservasi.insert
          })

          // Generate x-axis categories (dates from 1 to current date)
          const categories = Array.from(
            { length: daysInMonth },
            (_, i) => i + 1,
          )

          // Update line chart data
          this.lineChartOptions.xaxis.categories = categories
          // console.log('categories', categories)
          this.lineChartSeries[0].data = data
          // console.log('this.lineChartSeries', data)
        }
      },
      immediate: true,
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
    getGrafikRegrinding: {
      handler(newVal) {
        if (newVal) {
          // console.log('Data received from server:', newVal) // Debugging line
          const daysInMonth = moment().daysInMonth() // Get current date
          // console.log('currentDate', currentDate)
          // Initialize data array with default values of 0 for each date
          const data = Array(daysInMonth).fill(0)

          // Iterate through each reservation entry and add the reservation counts to the corresponding date
          newVal.forEach((grafikReg) => {
            const regDate = moment(grafikReg.reg_dt).date()
            // console.log('reservasiDate', regDate)
            data[regDate - 1] +=
              grafikReg.morning_ses + grafikReg.afterlunch_ses
          })

          // Generate x-axis categories (dates from 1 to current date)
          const categories = Array.from(
            { length: daysInMonth },
            (_, i) => i + 1,
          )

          // Update line chart data
          this.regLineChartOptions.xaxis.categories = categories
          // console.log('categories', categories)
          this.regLineChartSeries[0].data = data
          // console.log('this.lineChartSeries', data)
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.getShift()
    this.$store.dispatch('ActionGetReservasi')
    if (!this.getGrafikReservasi || this.getGrafikReservasi.length === 0) {
      this.$store.dispatch('ActionGetGrafikReservasi')
    }
    this.$store.dispatch('ActionGetRegrinding')
    if (!this.getGrafikRegrinding || this.getGrafikRegrinding.length === 0) {
      this.$store.dispatch('ActionGetGrafikRegrinding')
    }
  },
  methods: {
    getShift() {
      this.currenthShift = this.getCurrentShift
      console.log('currenthShift', this.currenthShift)
    },
    async submitData(type) {
      try {
        const reservasiDate = moment().format('YYYY-MM-DD')
        let payload = {}
        let endpoint = ''

        if (type === 'reservasi') {
          payload = {
            drill: this.drill,
            reamer: this.reamer,
            tap: this.tap,
            insert: this.insert,
            reservasiDate,
          }
          endpoint = 'reservasi/add'
        } else if (type === 'regrinding') {
          payload = {
            morning: this.morning,
            afterlunch: this.afterLunch,
            reservasiDate,
          }
          endpoint = 'regrinding/add'
        }
        console.log('payload', payload)
        console.log('endpoint', endpoint)
        // Use axios or fetch to send data to backend
        await this.$store.dispatch('ActionSubmitData', { endpoint, payload })
        await this.$store.dispatch('ActionGetReservasi')
        await this.$store.dispatch('ActionGetGrafikReservasi')
        await this.$store.dispatch('ActionGetRegrinding')
        await this.$store.dispatch('ActionGetGrafikRegrinding')
      } catch (error) {
        console.error('Error submitting data:', error)
      }
    },
  },
}
</script>

<style>
.form-control {
  margin-bottom: 2px;
}
</style>
