<template>
  <div class="card mt-3" style="z-index: 1">
    <div class="card-header">
      <h5 class="card-title text-center"><strong>History Coolant</strong></h5>
    </div>
    <div class="card-body">
      <div class="row gx-3">
        <div class="col-md-3">
          <label class="form-label" for="selectedLine">Line</label>
          <div class="input-group">
            <select
              class="form-select sz-up"
              v-model="selectedLine"
              @change="onLineChange($event)"
            >
              <option
                v-for="line in getLineNames"
                :key="line.line_id"
                :value="line.line_id"
              >
                {{ line.line_nm }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <label class="form-label" for="selectedMachines">Mesin</label>
          <div class="input-group">
            <Multiselect
              v-model="selectedMachines"
              :options="getMachinesNames"
              :multiple="true"
              :disabled="!selectedLine"
              track-by="machine_id"
              label="machine_nm"
              placeholder="Pilih mesin..."
              :taggable="true"
              @tag="addTag"
            >
            </Multiselect>
          </div>
        </div>
        <div class="col-md-3">
          <label class="form-label" for="selectedLine">Parameter</label>
          <div class="input-group">
            <select
              class="form-select sz-up"
              v-model="selectedParam"
              @change="fetchParams"
            >
              <option
                v-for="param in paramNames"
                :key="param"
                :value="param.param_id"
              >
                {{ param.param_nm }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <label class="form-label" for="selectedDate">Mulai</label>
          <div class="input-group">
            <input
              type="text"
              class="form-control sz-up"
              ref="datePickerStartDate"
              v-model="selectedStartDate"
              placeholder="Pilih tanggal..."
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary sz-up"
                type="button"
                @click="showDatePicker('datePickerStartDate', 'start')"
              >
                <span class="fa fa-calendar"></span>
              </button>
            </div>
          </div>
          <label class="form-label" for="selectedDate">Sampai</label>
          <div class="input-group">
            <input
              type="text"
              class="form-control sz-up"
              ref="datePickerEndDate"
              v-model="selectedEndDate"
              placeholder="Pilih tanggal..."
              @change="fetchData"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary sz-up"
                type="button"
                @click="showDatePicker('datePickerEndDate', 'end')"
              >
                <span class="fa fa-calendar"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="mergedResults.length > 0" class="card p-2 mt-3">
    <table class="table custom-table tb-emp table-bordered mt-1">
      <thead>
        <tr>
          <th>No</th>
          <th>Line</th>
          <th>Mesin</th>
          <th>Tanggal Check</th>
          <th
            v-if="
              paramNames.length > 0 && selectedParam === paramNames[0].param_id
            "
          >
            {{ paramNames[0].param_nm }}
          </th>
          <th
            v-if="
              paramNames.length > 1 && selectedParam === paramNames[1].param_id
            "
          >
            {{ paramNames[1].param_nm }}
          </th>
          <th>Status Coolant</th>
          <th>Terakhir Kuras</th>
          <th>Alasan Kuras</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(result, index) in mergedResults" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ result.line_nm }}</td>
          <td>{{ result.machine_nm }}</td>
          <td>{{ result.start_date }}</td>
          <td v-if="selectedParam === paramNames[0].param_id">
            {{ result.Konsentrasi }}
          </td>
          <td v-if="selectedParam === paramNames[1].param_id">
            {{ result.PH }}
          </td>
          <td v-html="result.status"></td>
          <td>{{ result.last_krs }}</td>
          <td>{{ result.reason }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div
    v-if="
      chartSeriesConcentration.length > 0 &&
      selectedParam === paramNames[0].param_id
    "
  >
    <div class="card mt-3">
      <div class="card-body">
        <apexchart
          :options="chartOptionsConcentration"
          :series="chartSeriesConcentration"
          type="line"
          height="400"
        />
      </div>
    </div>
  </div>

  <div
    v-if="chartSeriesPH.length > 0 && selectedParam === paramNames[1].param_id"
  >
    <div class="card mt-2">
      <div class="card-body">
        <apexchart
          :options="chartOptionsPH"
          :series="chartSeriesPH"
          type="line"
          height="400"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VueApexCharts from 'vue3-apexcharts'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.css'
import axios from 'axios'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css' // Impor CSS file
import UnderDevelopment from '@/standalone/components/underDevelopment.vue'
import moment from 'moment'
const API_URL = process.env.VUE_APP_API_URL
export default {
  name: 'CMS',
  components: {
    apexchart: VueApexCharts,
    Multiselect,
    UnderDevelopment,
  },
  data() {
    return {
      selectedLine: '',
      selectedMachines: [],
      selectedParam: '',
      selectedStartDate: '',
      selectedEndDate: '',
      datepickerInstances: {},
      paramNames: [],
      chartOptionsConcentration: {},
      chartSeriesConcentration: [],
      chartSeriesPH: [],
      chartOptionsPH: {},
      results: [],
      pollingInterval: null,
      mergedResults: [],
    }
  },
  computed: {
    ...mapGetters(['getLineNames', 'getMachinesNames', 'getDataHistoryKuras']),
  },
  watch: {
    results: 'mergeData', // Memanggil mergeData ketika results berubah
    getDataHistoryKuras: 'mergeData', // Memanggil mergeData ketika getDataHistoryKuras berubah
  },
  mounted() {
    this.fetchLines()
    this.fetchParams()
  },
  beforeDestroy() {
    this.stopPolling()
  },
  methods: {
    ...mapActions(['fetchLines']),
    onLineChange(event) {
      const lineId = event.target.value
      this.$store.dispatch('fetchMachines', lineId)
    },
    addTag(newTag) {
      // Buat objek tag baru dengan nama dan kode unik
      const tag = {
        machine_id: newTag, // Misalnya, kode unik bisa saja berupa ID mesin
        machine_nm: newTag, // Atau nama mesin
      }
    },
    showDatePicker(inputRef, type) {
      const datePickerInput = this.$refs[inputRef]

      if (!datePickerInput) {
        return
      }

      if (!this.datepickerInstances[inputRef]) {
        this.datepickerInstances[inputRef] = flatpickr(datePickerInput, {
          dateFormat: 'Y-m-d',
          onChange: (selectedDates) => {
            if (selectedDates.length > 0) {
              const selectedDate = moment(selectedDates[0]).format('YYYY-MM-DD')
              if (type === 'start') {
                this.selectedStartDate = selectedDate
                // console.log('selectedStartDate', this.selectedStartDate)
              } else {
                this.selectedEndDate = selectedDate
                // console.log('selectedEndDate', this.selectedEndDate)
              }
            }
          },
        })
      }

      this.datepickerInstances[inputRef].open()
    },
    async fetchParams() {
      try {
        const response = await axios.get(`${API_URL}/parameters/get`)
        this.paramNames = response.data.data
      } catch (error) {
        console.error('Error fetching parameters:', error)
      }
    },

    async fetchData() {
      try {
        const machineIds = this.selectedMachines.map(
          (machine) => machine.machine_id,
        )
        const machineNames = this.selectedMachines.map(
          (machine) => machine.machine_nm,
        )
        if (machineIds.length === 0) {
          alert('No machines selected')
          return
        }
        this.$store.dispatch('ActionHistoryKuras', machineNames)
        const response = await axios.get(`${API_URL}/grafik/get`, {
          params: {
            startDate: this.selectedStartDate,
            endDate: this.selectedEndDate,
            machine_id: machineIds.join(','), // Assuming the API can accept a comma-separated list of machine_ids
            param_id: this.selectedParam,
          },
        })

        const responseData = response.data.data
        // console.log('responseData', responseData)

        if (
          responseData &&
          Array.isArray(responseData.data) &&
          responseData.data.length > 0
        ) {
          this.results = [] // Clear previous results
          const machinesData = responseData.data

          machinesData.forEach((machineData) => {
            const machineName = machineData.machine_nm
            const lineName = this.getLineNames.find(
              (line) => line.line_id === this.selectedLine,
            ).line_nm

            // Group data by date and machine
            const groupedData = {}
            machineData.parameters.forEach((parameter) => {
              parameter.values.forEach((valueData) => {
                const tanggal = valueData.start_date.substr(0, 10)
                if (!groupedData[tanggal]) {
                  groupedData[tanggal] = {
                    line_nm: lineName,
                    machine_nm: machineName,
                    start_date: moment(tanggal).format('DD-MM-YYYY'), // Format tanggal,
                    Konsentrasi: '-',
                    PH: '-',
                    status: '',
                  }
                }
                if (parameter.param_nm === 'Konsentrasi') {
                  groupedData[tanggal].Konsentrasi = valueData.value
                } else if (parameter.param_nm === 'PH') {
                  groupedData[tanggal].PH = valueData.value
                }
                // Calculate status for each data point
                const status = this.calculateStatus(valueData)
                // console.log('Status====:', status) // Tambahkan log untuk status
                if (status === '<span class="text-red">NG</span>') {
                  groupedData[tanggal].status = status
                } else if (!groupedData[tanggal].status) {
                  groupedData[tanggal].status = status
                }
              })
            })

            // Push grouped data to results
            Object.values(groupedData).forEach((data) => {
              this.results.push(data)
            })
          })
          // Urutkan this.results berdasarkan start_date dari yang terbaru ke yang terlama
          this.results.sort((a, b) => {
            // Mengonversi tanggal dari string ke Date untuk membandingkan
            const dateA = new Date(a.start_date)
            const dateB = new Date(b.start_date)
            // Mengurutkan dari yang terbaru ke yang terlama
            return dateB - dateA
          })

          // Set summary status based on all machines' status
          const allOk = this.results.every(
            (result) => result.status === '<span class="text-green">OK</span>',
          )
          this.summaryStatus = allOk
            ? '<span class="text-green">All OK</span>'
            : '<span class="text-red">NG</span>'

          // Get series for charts
          this.getSeries(machinesData)

          // console.log('Results:', this.results) // Log isi dari results setelah diisi
          // console.log('Summary Status:', this.summaryStatus) // Log nilai summaryStatus setelah dihitung
        } else {
          alert('Data tidak tersedia atau tidak ada')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    mergeData() {
      if (this.results.length === 0) {
        // Mengisi mergedResults dengan data dari getDataHistoryKuras jika results kosong
        this.mergedResults = this.getDataHistoryKuras.map((historyItem) => {
          return {
            line_nm: historyItem.line_nm || '-', // Nama line dari historyItem
            machine_nm: historyItem.machine_nm || '-', // Nama mesin dari historyItem
            start_date: historyItem.start_date || '-', // Tanggal dari historyItem
            Konsentrasi: '-', // Konsentrasi default
            PH: '-', // PH default
            last_krs: historyItem.last_krs || '-', // Data last_krs dari historyItem
            reason: historyItem.reason_plan || '-', // Data reason_plan dari historyItem atau '-'
            status: historyItem.status || '-', // Status default
          }
        })
      } else {
        // Variabel untuk melacak mesin yang sudah diisi last_krs dan reason
        const processedMachinesForLastKrs = new Set()
        const processedMachinesForReason = new Set()

        // Menggabungkan data dari results dengan data dari getDataHistoryKuras jika results tidak kosong
        this.mergedResults = this.results.map((result, index) => {
          // Mencari data yang cocok di getDataHistoryKuras berdasarkan machine_nm
          const history = this.getDataHistoryKuras.find(
            (historyItem) => historyItem.machine_nm === result.machine_nm,
          )

          // Tentukan nilai last_krs: hanya isi di baris pertama untuk setiap mesin
          let lastKrsValue = '-'
          if (history && !processedMachinesForLastKrs.has(result.machine_nm)) {
            lastKrsValue = history.last_krs || '-'
            processedMachinesForLastKrs.add(result.machine_nm) // Tandai mesin ini sudah diproses untuk last_krs
          }

          // Tentukan nilai reason: hanya isi di baris pertama untuk setiap mesin
          let reasonValue = '-'
          if (history && !processedMachinesForReason.has(result.machine_nm)) {
            reasonValue = history.reason_plan || '-'
            processedMachinesForReason.add(result.machine_nm) // Tandai mesin ini sudah diproses untuk reason
          }

          return {
            ...result,

            last_krs: lastKrsValue, // Menetapkan nilai last_krs yang telah ditentukan
            reason: reasonValue, // Menetapkan nilai reason yang telah ditentukan
          }
        })
      }
    },

    calculateStatus(valueData) {
      const value = valueData.value
      const min = valueData.min
      const max = valueData.max

      // console.log('Value:', value)
      // console.log('Min:', min)
      // console.log('Max:', max)

      if (value < min || value > max) {
        return '<span class="text-red">NG</span>'
      } else {
        return '<span class="text-green">OK</span>'
      }
    },

    getSeries(machinesData) {
      try {
        const concentrationSeries = [] // Menyimpan data untuk konsentrasi
        const pHSeries = [] // Menyimpan data untuk pH
        let overallGraphStatus = '<span class="text-green">OK</span>'
        machinesData.forEach((machineData) => {
          const machineName = machineData.machine_nm

          machineData.parameters.forEach((parameter) => {
            const paramName = parameter.param_nm

            if (paramName === 'Konsentrasi' || paramName === 'PH') {
              const dataPoints = parameter.values.map((value) => ({
                x: new Date(value.start_date), // Menggunakan objek Date langsung
                y: value.value,
                min: value.min,
                max: value.max,
                paramName: paramName,
              }))
              // console.log('Data Points for', paramName + ':', dataPoints) // Tambahkan log di sini untuk memeriksa nilai dataPoints
              // Memeriksa nilai konsentrasi atau pH untuk setiap titik data
              dataPoints.forEach((dataPoint) => {
                const status = this.calculateStatus(
                  dataPoint.y,
                  dataPoint.min,
                  dataPoint.max,
                )
                if (status === '<span class="text-red">NG</span>') {
                  overallGraphStatus = '<span class="text-red">NG</span>'
                }
                // console.log(
                //   `Status for ${paramName} at ${dataPoint.x}: ${status}`,
                // )
                // Di sini Anda dapat menyimpan status dalam variabel atau array untuk digunakan dalam aplikasi Anda
              })

              // Seri data untuk nilai parameter
              const valueSeries = {
                name: `${machineName} - ${paramName} Value`,
                data: dataPoints.map((dataPoint) => ({
                  x: dataPoint.x.getTime(), // Mengonversi tanggal menjadi timestamp
                  y: dataPoint.y,
                })),
              }

              if (paramName === 'Konsentrasi') {
                concentrationSeries.push(valueSeries) // Tambahkan data konsentrasi ke seri konsentrasi
              } else if (paramName === 'PH') {
                pHSeries.push(valueSeries) // Tambahkan data pH ke seri pH
              }

              // Seri data untuk nilai minimum
              const minDataPoints = dataPoints.filter(
                (dataPoint) =>
                  dataPoint.min !== undefined && dataPoint.min !== null,
              )
              const minSeries = {
                name: `${machineName} - ${paramName} Min`,
                data: minDataPoints.map((dataPoint) => ({
                  x: dataPoint.x.getTime(), // Mengonversi tanggal menjadi timestamp
                  y: dataPoint.min,
                })),
                type: 'line',
              }

              // Seri data untuk nilai maksimum
              const maxDataPoints = dataPoints.filter(
                (dataPoint) =>
                  dataPoint.max !== undefined && dataPoint.max !== null,
              )
              const maxSeries = {
                name: `${machineName} - ${paramName} Max`,
                data: maxDataPoints.map((dataPoint) => ({
                  x: dataPoint.x.getTime(), // Mengonversi tanggal menjadi timestamp
                  y: dataPoint.max,
                })),
                type: 'line',
                tooltip: {
                  enabled: false,
                },
              }

              // Menambahkan seri minimum jika belum ditambahkan sebelumnya
              if (minDataPoints.length > 0) {
                if (paramName === 'Konsentrasi') {
                  concentrationSeries.push(minSeries)
                } else if (paramName === 'PH') {
                  pHSeries.push(minSeries)
                }
              }

              // Menambahkan seri maksimum jika belum ditambahkan sebelumnya
              if (maxDataPoints.length > 0) {
                if (paramName === 'Konsentrasi') {
                  concentrationSeries.push(maxSeries)
                } else if (paramName === 'PH') {
                  pHSeries.push(maxSeries)
                }
              }
            }
          })
        })

        this.chartOptionsConcentration = {
          // Opsi untuk grafik konsentrasi
          chart: {
            height: 350,
            type: 'line',
            toolbar: {
              show: true,
            },
          },
          stroke: {
            curve: 'straight',
            dashArray: [0, 2, 2],
            colors: ['#00FF00', '#ff0000', '#ff7f00'],
          },
          colors: ['#00FF00', '#ff0000', '#ff7f00'],
          markers: {
            size: 5,
            colors: ['#00FF00', '#ff0000', '#ff7f00'],
          },
          grid: {
            borderColor: '#e7e7e7',
            strokeDashArray: 2,
            xaxis: {
              lines: {
                show: true, // Menampilkan garis pada sumbu X
              },
            },
            yaxis: {
              lines: {
                show: true, // Menampilkan garis pada sumbu Y
              },
            },
          },
          xaxis: {
            type: 'datetime', // Mengatur sumbu x menjadi tipe datetime
          },
          title: {
            text: 'Konsentrasi',
            align: 'center',
          },
          legend: {
            show: false, // Menyembunyikan legenda
          },
        }

        this.chartOptionsPH = {
          // Opsi untuk grafik pH
          chart: {
            height: 350,
            type: 'line',
            toolbar: {
              show: true,
            },
          },
          stroke: {
            curve: 'straight',
            dashArray: [0, 2, 2],
            colors: ['#00FF00', '#ff0000', '#ff7f00'],
          },
          colors: ['#00FF00', '#ff0000', '#ff7f00'],
          labels: [2, 1, 0],
          xaxis: {
            type: 'datetime', // Mengatur sumbu x menjadi tipe datetime
          },
          markers: {
            size: 5,
            colors: ['#00FF00', '#ff0000', '#ff7f00'],
          },
          grid: {
            borderColor: '#e7e7e7',
            strokeDashArray: 2,
            xaxis: {
              lines: {
                show: true, // Menampilkan garis pada sumbu X
              },
            },
            yaxis: {
              lines: {
                show: true, // Menampilkan garis pada sumbu Y
              },
            },
          },
          title: {
            text: 'PH',
            align: 'center',
          },
          legend: {
            show: false, // Menyembunyikan legenda
          },
        }

        this.chartSeriesConcentration = concentrationSeries // Mengatur seri untuk grafik konsentrasi
        this.chartSeriesPH = pHSeries // Mengatur seri untuk grafik pH
        this.graphStatus = overallGraphStatus
      } catch (error) {
        console.error('Error in getSeries:', error)
        this.chartSeriesConcentration = []
        this.chartSeriesPH = []
      }
    },
    startPolling() {
      this.pollingInterval = setInterval(this.fetchData, 5000) // Fetch data every 5 seconds
    },
    stopPolling() {
      clearInterval(this.pollingInterval) // Stop polling when component is destroyed
    },
  },
}
</script>

<style>
.form-label {
  font-weight: bold;
}
.text-bold {
  font-size: 50px;
  font-weight: bold;
}
.text-green {
  color: green;
}
.text-red {
  color: red;
}
.multiselect__content-wrapper {
  position: absolute;
  z-index: 1;
}
.multiselect__tags {
  overflow: auto;
  height: 40px;
}
.sz-up {
  height: 40px;
}
.tb-emp th {
  background-color: rgb(198, 240, 240); /* Warna latar belakang th */
  height: 50px !important;
  text-align: center;
  vertical-align: middle;
}
.tb-emp th,
.tb-emp td {
  border: 1px solid black; /* Batas tepi untuk sel-sel dalam tabel */
  text-align: center;
  padding: 8px; /* Atur jarak antara konten dan batas tepi */
}
</style>
