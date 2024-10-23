<template>
    <div class="text-center" style="padding: 0; background-color: none">
      <CCard style="width: 100%; margin: 0 0 10px 0">
        <CListGroup
          style="
            font-size: 2rem;
            font-weight: bold;
            background-color: #aa0000;
            color: white;
          "
        >
          <div>Stock < 20 Minutes</div>
        </CListGroup>
  
        <CCardBody
          style="
          height: 33vh;
            width: 100%;
            font-size: 2rem;
            font-weight: bold;
            background-color: #e0e0e0;
            color: white;
            overflow:scroll;
            overflow-x: hidden
  
          "
        >
          <div
            class="row justify-content-start"
            style="overflow: hidden; margin: 0; background-color: #e0e0e0"
          >
            <div
              class="col-3 h-xl-20"
              style="
                border-radius: 10px 10px 10px 10px;
                -webkit-border-radius: 10px 10px 10px 10px;
                -moz-border-radius: 10px 10px 10px 10px;
                background: #ffffff;
                height: 14vh;
                padding-top: 1rem;
                margin-bottom:.5rem;
              "
              v-for="critical in criticalPart"
              :key="critical"
            >
              <CCardText
                style="
                  margin: 0;
                  color: white;
                  border-radius: 10px 10px 10px 10px;
                  -webkit-border-radius: 10px 10px 10px 10px;
                  -moz-border-radius: 10px 10px 10px 10px;
                  background: black;
                  font-size: 1.5rem;
                  font-weight: 500;
                "
                >{{ critical.part }}</CCardText
              >
              <CCardText style="font-size: 1.5rem; margin-top: 10px; color: black"
                >{{ critical.stockMinute }}min</CCardText
              >
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
    name: 'partUnder20Minutes',
    components: { data },
  
    data() {
      return {
        criticalPart: data.parts
          .filter((part) => part.stockMinute <= 20)
          .map((part) => part)
          .sort((a, b) => a.stockMinute - b.stockMinute)
          .slice(0, 9),
      }
    },
  }
  console.log(data.parts)
  </script>
  