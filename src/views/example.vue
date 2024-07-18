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
      // Inisialisasi daftar tanggal untuk bulan ini
      datesInMonth: this.getDatesInMonth(),
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
          enabled: true,
          formatter: function (val) {
            return val
          },
        },
        xaxis: {
          categories: [], // Dates from 1 to 31 will be set in mounted
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
        { name: 'Shift Red', data: [] },
        { name: 'Shift White', data: [] },
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
          enabled: true,
          formatter: function (val) {
            return val
          },
        },
        xaxis: {
          categories: [], // Dates from 1 to 31 will be set in mounted
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
        { name: 'Shift Red', data: [] },
        { name: 'Shift White', data: [] },
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
    currenthShift(newShift, oldShift) {
      if (newShift !== oldShift) {
        this.resetForm()
        this.$store.dispatch('ActionGetReservasi', newShift)
      }
    },
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
    getRegrinding: {
      handler(newVal) {
        if (newVal) {
          const today = moment().format('YYYY-MM-DD')
          const regDate = moment(newVal.reg_dt).format('YYYY-MM-DD')
          if (regDate === today) {
            this.morning = newVal.morning_ses || ''
            this.afterLunch = newVal.afterlunch_ses || ''
          }
        }
      },
      immediate: true,
      deep: true,
    },
    getGrafikReservasi: {
      handler(newVal) {
        if (newVal) {
          this.updateLineChartData('reservasi', newVal)
        }
      },
      immediate: true,
      deep: true,
    },
    getGrafikRegrinding: {
      handler(newVal) {
        if (newVal) {
          this.updateLineChartData('regrinding', newVal)
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    // Isi kategori xaxis dengan tanggal bulan ini
    this.lineChartOptions.xaxis.categories = this.datesInMonth
    this.regLineChartOptions.xaxis.categories = this.datesInMonth

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
    },
    async submitData(type) {
      try {
        if (this.currenthShift === null) {
          return alert('Pilih Shift Terlebih Dahulu')
        }
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
      this.drill = null
      this.reamer = null
      this.tap = null
      this.insert = null
      this.morning = null
      this.afterLunch = null
    },
    // Method to generate dates for current month
    getDatesInMonth() {
      const startDate = moment().startOf('month')
      const endDate = moment().endOf('month')
      const dates = []
      while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
        dates.push(startDate.format('DD')) // Push dates in 'DD' format
        startDate.add(1, 'days')
      }
      return dates
    },
    // Method to update chart data based on new values
    updateLineChartData(type, newVal) {
      const seriesRed = []
      const seriesWhite = []

      if (type === 'reservasi') {
        newVal.forEach((data) => {
          seriesRed.push(data.shiftRed)
          seriesWhite.push(data.shiftWhite)
        })
        this.lineChartSeries = [
          { name: 'Shift Red', data: seriesRed },
          { name: 'Shift White', data: seriesWhite },
        ]
      } else if (type === 'regrinding') {
        newVal.forEach((data) => {
          seriesRed.push(data.shiftRed)
          seriesWhite.push(data.shiftWhite)
        })
        this.regLineChartSeries = [
          { name: 'Shift Red', data: seriesRed },
          { name: 'Shift White', data: seriesWhite },
        ]
      }
    },
  },
}
</script>
