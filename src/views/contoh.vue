<template>
  <div>
    <div id="chart-shift-red">
      <h3>Shift Red (Hadir)</h3>
      <apexchart
        type="bar"
        height="350"
        :options="chartOptionsShiftRed"
        :series="seriesShiftRed"
      ></apexchart>
    </div>
    <div id="chart-shift-white">
      <h3>Shift White (Hadir)</h3>
      <apexchart
        type="bar"
        height="350"
        :options="chartOptionsShiftWhite"
        :series="seriesShiftWhite"
      ></apexchart>
    </div>
    <div id="chart-shift-red-absen">
      <h3>Shift Red (Absen)</h3>
      <apexchart
        type="bar"
        height="350"
        :options="chartOptionsShiftRedAbsen"
        :series="seriesShiftRedAbsen"
      ></apexchart>
    </div>
    <div id="chart-shift-white-absen">
      <h3>Shift White (Absen)</h3>
      <apexchart
        type="bar"
        height="350"
        :options="chartOptionsShiftWhiteAbsen"
        :series="seriesShiftWhiteAbsen"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import axios from 'axios'

export default {
  name: 'AttendanceCharts',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      // Series data for each chart
      seriesShiftRed: [],
      seriesShiftWhite: [],
      seriesShiftRedAbsen: [],
      seriesShiftWhiteAbsen: [],

      // Chart options for each chart
      chartOptionsShiftRed: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [], // Initialize x-axis categories
        },
      },
      chartOptionsShiftWhite: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [], // Initialize x-axis categories
        },
      },
      chartOptionsShiftRedAbsen: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [], // Initialize x-axis categories
        },
      },
      chartOptionsShiftWhiteAbsen: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [], // Initialize x-axis categories
        },
      },
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3003/histories/get')
        const responseData = response.data
        const data = responseData.data

        // Object to store attendance information for each employee
        const employeesData = {
          Red: { Hadir: {}, Absen: {} },
          White: { Hadir: {}, Absen: {} },
        }

        // Array to store unique employee names
        const employeeNames = []

        // Process data to calculate attendance for each employee and collect employee names
        data.forEach((employee) => {
          const shift = employee.shift
          const status = employee.status
          const nama = employee.nama

          // Collect unique employee names
          if (!employeeNames.includes(nama)) {
            employeeNames.push(nama)
          }

          if (!employeesData[shift]) {
            employeesData[shift] = { Hadir: {}, Absen: {} }
          }

          if (shift && status && nama) {
            if (status === 'Hadir') {
              if (!employeesData[shift][status][nama]) {
                employeesData[shift][status][nama] = 0
              }

              employeesData[shift][status][nama]++
            } else {
              if (!employeesData[shift]['Absen'][nama]) {
                employeesData[shift]['Absen'][nama] = 0
              }

              employeesData[shift]['Absen'][nama]++
            }
          } else if (shift && nama) {
            // If status is missing or empty, consider it as "Absen"
            if (!employeesData[shift]['Absen'][nama]) {
              employeesData[shift]['Absen'][nama] = 0
            }

            employeesData[shift]['Absen'][nama]++
          }
        })

        // Create array for each combination of shift and attendance status
        this.seriesShiftRed = [
          { name: 'Hadir', data: Object.values(employeesData.Red.Hadir || {}) },
          { name: 'Absen', data: Object.values(employeesData.Red.Absen || {}) },
        ]
        this.seriesShiftWhite = [
          {
            name: 'Hadir',
            data: Object.values(employeesData.White.Hadir || {}),
          },
          {
            name: 'Absen',
            data: Object.values(employeesData.White.Absen || {}),
          },
        ]
        this.seriesShiftRedAbsen = [
          { name: 'Hadir', data: Object.values(employeesData.Red.Hadir || {}) },
          { name: 'Absen', data: Object.values(employeesData.Red.Absen || {}) },
        ]
        this.seriesShiftWhiteAbsen = [
          {
            name: 'Hadir',
            data: Object.values(employeesData.White.Hadir || {}),
          },
          {
            name: 'Absen',
            data: Object.values(employeesData.White.Absen || {}),
          },
        ]

        // Set employee names as x-axis categories for each chart
        this.chartOptionsShiftRed.xaxis.categories = employeeNames
        this.chartOptionsShiftWhite.xaxis.categories = employeeNames
        this.chartOptionsShiftRedAbsen.xaxis.categories = employeeNames
        this.chartOptionsShiftWhiteAbsen.xaxis.categories = employeeNames
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
  },
  created() {
    this.fetchData()
  },
}
</script>
