<template>
  <div class="text-center" style="background-color: none">
    <CCard>
      <CListGroup
        style="
          font-size: 2rem;
          background-color: #aa0000;
          color: #ffffff;
          font-weight: bold;
        "
      >
        <div>Condition Stock In Rack</div>
      </CListGroup>

      <CCardBody>
        <div style="height: 24.5vh">
          <div style="width: 20rem;height: 10rem" id="chart"></div>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'

export default {
  name: 'StockChart',
  component: {},
  mounted() {
    var options = {
      chart: {
        type: 'bar',
      },
      series: [
        {
          name: 'sales',
          data: [30, 40, 45],
        },
      ],
      plotOptions: {
          bar: {
            horizontal: false, // Set to true for horizontal bars
            columnWidth: '80%', // Adjust the bar width (percentage or pixel value)
            barHeight: '100%', // Set the height of the bars (optional, mainly for horizontal bars)
          },
        },
      xaxis: {
        categories: ['>20min', '20-60min', '<60min'],
      },
    }

    var chart = new ApexCharts(document.querySelector('#chart'), options)

    chart.render()
  },
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto);

body {
  font-family: Roboto, sans-serif;
}

#chart {
  max-width: 650px;
  margin: 35px auto;
}
</style>
