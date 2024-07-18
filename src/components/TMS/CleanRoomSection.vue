<template>
  <div class="container-fluid">
    <div class="card p-2 mb-2">
      <div class="d-flex justify-content-between align-items-center">
        <h4 class="text-center m-0">Clean Room</h4>
        <div class="input-group" style="width: 350px;">
          <span class="input-group-text">Scan QR</span>
          <input id="qr-input" type="text" class="form-control" placeholder="Scan your tools" v-model="tool_id" />
          <CButton v-if="!is_focus" type="button" color="secondary" variant="outline" @click="focusToggle(true)">
            Scan
          </CButton>
          <CButton v-else-if="is_focus && tool_id != ''" type="button" color="secondary" variant="outline"
            @click="focusToggle(false)">
            <CIcon icon="cilX" />
          </CButton>
        </div>
      </div>
    </div>
    <template v-if="false">
      <PleaseScanQRTools />
    </template>
    <CardToolStatus :is_footer="true" />
  </div>
</template>
<script>
import PleaseScanQRTools from './PleaseScanQRTools.vue';
import CardToolStatus from './Cards/CardToolStatus.vue';
export default {
  components: { PleaseScanQRTools, CardToolStatus },
  name: "CleanRoomSection",
  data() {
    return {
      is_focus: true,
      tool_id: ''
    }
  },
  methods: {
    focusToggle(status = true) {
      this.is_focus = status
      if (this.is_focus) {
        document.getElementById('qr-input').onblur = function () { this.focus() };
        document.getElementById('qr-input').focus();
      } else {
        document.getElementById('qr-input').onblur = function () { };
        document.getElementById('qr-input').focus({ focusVisible: false });
        document.getElementById('qr-input').value = ''
      }
    }
  },
  mounted() {
    this.focusToggle()
  },
}
</script>
<style></style>
