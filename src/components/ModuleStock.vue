<template>
  <div class="text-center">
    <CCard flush style="width: 100%">
      <CListGroup
        style="
          font-size: 2rem;
          background-color: #aa0000;
          color: #ffffff;
          font-weight: bold;
        "
      >
        <div>Module In Plant#3</div>
      </CListGroup>

      <CCardBody flush style="background-color: #ffffff">
        <div class="row">
          <!-- TMC -->
          <div class="col-6 col-lg-3 mb-1">
            <CCardBody
              style="
                border-radius: 10px 10px 10px 10px;
                -webkit-border-radius: 10px 10px 10px 10px;
                -moz-border-radius: 10px 10px 10px 10px;
                background: #e0e0e0;
                height: 10rem;
              "
            >
              <CCardText
                style="
                  color: white;
                  font-weight: bold;
                  border-radius: 10px 10px 10px 10px;
                  -webkit-border-radius: 10px 10px 10px 10px;
                  -moz-border-radius: 10px 10px 10px 10px;
                  background: #aa0000;
                  font-size: 1.7rem;
                "
                >TMC</CCardText
              >
              <CCardText style="font-size: 3rem; font-weight: bold">
                <div style="color: black">
                  {{ moduleTMC }}
                </div>
              </CCardText>
            </CCardBody>
          </div>

          <!-- STM -->
          <div class="col-6 col-lg-3 mb-1">
            <CCardBody
              style="
                border-radius: 10px 10px 10px 10px;
                -webkit-border-radius: 10px 10px 10px 10px;
                -moz-border-radius: 10px 10px 10px 10px;
                background: #e0e0e0;
                height: 10rem;
              "
            >
              <CCardText
                style="
                  color: white;
                  font-weight: bold;
                  border-radius: 10px 10px 10px 10px;
                  -webkit-border-radius: 10px 10px 10px 10px;
                  -moz-border-radius: 10px 10px 10px 10px;
                  background: #aa0000;
                  font-size: 1.7rem;
                "
                >STM</CCardText
              >
              <CCardText style="font-size: 3rem; font-weight: bold">
                <div
                  v-if="moduleSTM < stdModule"
                  style="background-color: #ffaa80"
                >
                  {{ moduleSTM }}
                </div>
                <div v-if="moduleSTM >= stdModule" style="color: black">
                  {{ moduleSTM }}
                </div>
              </CCardText>
            </CCardBody>
          </div>

          <!-- UMWT -->
          <div class="col-6 col-lg-3 mb-1">
            <CCardBody
              style="
                border-radius: 10px 10px 10px 10px;
                -webkit-border-radius: 10px 10px 10px 10px;
                -moz-border-radius: 10px 10px 10px 10px;
                background: #e0e0e0;
                height: 10rem;
              "
            >
              <CCardText
                style="
                  color: white;
                  font-weight: bold;
                  border-radius: 10px 10px 10px 10px;
                  -webkit-border-radius: 10px 10px 10px 10px;
                  -moz-border-radius: 10px 10px 10px 10px;
                  background: #aa0000;
                  font-size: 1.7rem;
                "
                >UMWT</CCardText
              >
              <CCardText style="font-size: 3rem; font-weight: bold">
                <div
                  v-if="moduleUMWT < stdModule"
                  style="background-color: #ffaa80"
                >
                  {{ moduleUMWT }}
                </div>
                <div v-if="moduleUMWT >= stdModule" style="color: black">
                  {{ moduleUMWT }}
                </div>
              </CCardText>
            </CCardBody>
          </div>

          <!-- TMV -->
          <div class="col-6 col-lg-3 mb-1">
            <CCardBody
              style="
                border-radius: 10px 10px 10px 10px;
                -webkit-border-radius: 10px 10px 10px 10px;
                -moz-border-radius: 10px 10px 10px 10px;
                background: #e0e0e0;
                height: 10rem;
              "
            >
              <CCardText
                style="
                  color: white;
                  font-weight: bold;
                  border-radius: 10px 10px 10px 10px;
                  -webkit-border-radius: 10px 10px 10px 10px;
                  -moz-border-radius: 10px 10px 10px 10px;
                  background: #aa0000;
                  font-size: 1.7rem;
                "
                >TMV</CCardText
              >
              <CCardText style="font-size: 3rem; font-weight: bold">
                <div
                  v-if="moduleTMV < stdModule"
                  style="background-color: #ffaa80"
                >
                  {{ moduleTMV }}
                </div>
                <div v-if="moduleTMV >= stdModule" style="color: black">
                  {{ moduleTMV }}
                </div>
              </CCardText>
            </CCardBody>
          </div>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  name: 'ModuleStock',
  data() {
    color: 'blue'
  },
  props: {
    moduleTMC: Number,
    moduleSTM: Number,
    moduleUMWT: Number,
    moduleTMV: Number,
    stdModule: Number,
    styleTMC: String,
  },
  computed: {
    danger() {
      return {
        backgroundColor: this.color,
      }
    },
  },
  methods: {
    changeColor() {
      alert('hello')
    },
  },
}
</script>
