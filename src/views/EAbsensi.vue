<template>
  <div class="container-fluid m-2">
    <underDevelopment />
    <!-- Tampilkan nama bulan di sini -->
    <div class="card">
      <div class="row mt-3">
        <div class="col">
          <h2 class="text-center">{{ namaBulan }}</h2>
        </div>
      </div>
      <div class="container-fluid mt-5">
        <div class="row">
          <div class="col">
            <div v-if="chartSeriesRedHadir.length > 0" id="chart-shift-red">
              <apexchart
                type="bar"
                :options="chartOptionsShiftRed"
                :series="chartSeriesRedHadir"
                height="400"
              />
            </div>
          </div>
          <div class="col">
            <div v-if="chartSeriesWhiteHadir.length > 0" id="chart-shift-white">
              <apexchart
                type="bar"
                :options="chartOptionsShiftWhite"
                :series="chartSeriesWhiteHadir"
                height="400"
              />
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col">
            <div
              v-if="chartSeriesRedSelainHadir.length > 0"
              id="chart-shift-red-other"
            >
              <apexchart
                type="bar"
                :options="chartOptionsShiftRedAbsen"
                :series="chartSeriesRedSelainHadir"
                height="400"
              />
            </div>
          </div>
          <div class="col">
            <div
              v-if="chartSeriesWhiteSelainHadir.length > 0"
              id="chart-shift-white-other"
            >
              <apexchart
                type="bar"
                :options="chartOptionsShiftWhiteAbsen"
                :series="chartSeriesWhiteSelainHadir"
                height="400"
              />
            </div>
          </div>
        </div>
        <!--row mt 5-->

        <!-- Tambahkan tabel untuk menampilkan data karyawan yang dipilih -->
        <div class="row mt-5">
          <div class="col">
            <h3>Data Karyawan Terpilih</h3>
            <table class="table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Tanggal Absen</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="absen in absensiKaryawanTerpilih"
                  :key="absen.nama + absen.date"
                >
                  <td>{{ absen.nama }}</td>
                  <td>{{ absen.date }}</td>
                  <td>{{ absen.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--container-fluid-->
    </div>
  </div>
  <GraphEx />
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import axios from 'axios'
import GraphEx from '../components/GraphEx.vue'
import UnderDevelopment from '../standalone/components/underDevelopment.vue'
const API_URL = process.env.VUE_APP_API_URL

export default {
  name: 'EAbsensi',
  components: {
    apexchart: VueApexCharts,
    GraphEx,
    UnderDevelopment,
  },
  data() {
    return {
      namaBulan: '', // Inisialisasi variabel namaBulan
      chartOptionsShiftRed: {},
      chartSeriesRedHadir: [],
      chartOptionsShiftWhite: {},
      chartSeriesWhiteHadir: [],
      chartOptionsShiftRedAbsen: {},
      chartSeriesRedSelainHadir: [],
      chartOptionsShiftWhiteAbsen: {},
      chartSeriesWhiteSelainHadir: [],
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(API_URL + '/histories/get')
        const responseData = response.data
        console.log('responseData', responseData)
        // Mendapatkan tanggal absensi terbaru dari data
        const latestAbsenceDate =
          responseData.data[responseData.data.length - 1].date_absence
        // Membuat objek Date dari tanggal absensi terbaru
        const latestAbsenceDateObj = new Date(latestAbsenceDate)
        // Mendapatkan nama bulan dari tanggal absensi terbaru
        const monthNames = [
          'Januari',
          'Februari',
          'Maret',
          'April',
          'Mei',
          'Juni',
          'Juli',
          'Agustus',
          'September',
          'Oktober',
          'November',
          'Desember',
        ]
        this.namaBulan = monthNames[latestAbsenceDateObj.getMonth()]

        // Proses data dan atur ulang struktur data sesuai kebutuhan
        const groupedData = this.processData(responseData.data)

        // Atur data series dan opsi grafik untuk masing-masing jenis absensi dan shift
        this.chartSeriesRedHadir = this.generateChartData(groupedData.RedHadir)
        this.chartOptionsShiftRed = this.generateChartOptions(
          Object.keys(groupedData.RedHadir),
        )

        this.chartSeriesWhiteHadir = this.generateChartData(
          groupedData.WhiteHadir,
        )
        this.chartOptionsShiftWhite = this.generateChartOptions(
          Object.keys(groupedData.WhiteHadir),
        )

        this.chartSeriesRedSelainHadir = this.generateChartData(
          groupedData.RedSelainHadir,
        )
        this.chartOptionsShiftRedAbsen = this.generateChartOptions(
          Object.keys(groupedData.RedSelainHadir),
        )

        this.chartSeriesWhiteSelainHadir = this.generateChartData(
          groupedData.WhiteSelainHadir,
        )
        this.chartOptionsShiftWhiteAbsen = this.generateChartOptions(
          Object.keys(groupedData.WhiteSelainHadir),
        )
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },

    processData(data) {
      const groupedData = {
        RedHadir: {},
        WhiteHadir: {},
        RedSelainHadir: {},
        WhiteSelainHadir: {},
      }
      data.forEach((entry) => {
        const shift = entry.shift
        const status = entry.status
        const nama = entry.nama
        if (status === 'Hadir') {
          if (shift === 'Red') {
            groupedData.RedHadir[nama] = (groupedData.RedHadir[nama] || 0) + 1
          } else if (shift === 'White') {
            groupedData.WhiteHadir[nama] =
              (groupedData.WhiteHadir[nama] || 0) + 1
          }
        } else {
          if (shift === 'Red') {
            groupedData.RedSelainHadir[nama] =
              (groupedData.RedSelainHadir[nama] || 0) + 1
          } else if (shift === 'White') {
            groupedData.WhiteSelainHadir[nama] =
              (groupedData.WhiteSelainHadir[nama] || 0) + 1
          }
        }
      })
      console.log('ini groupedData', groupedData)
      return groupedData
    },

    generateChartData(groupedData) {
      return [{ name: 'Jumlah', data: Object.values(groupedData) || [] }]
    },

    generateChartOptions(members) {
      return {
        chart: { type: 'bar', height: 350 },
        plotOptions: { bar: { horizontal: true } },
        dataLabels: { enabled: false },
        xaxis: { categories: members || [] },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            formatter: function (val) {
              return val
            },
          },
        },
      }
    },
  },
}
</script>
