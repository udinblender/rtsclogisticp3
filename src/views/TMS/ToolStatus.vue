<template>
  <div class="container-fluid">
    <div class="card">
      <div class="d-flex justify-content-center align-items-center">
        <div class="input-group">
          <span class="input-group-text">Scan QR</span>
          <input id="qr-input" type="text" class="form-control" placeholder="Scan your tools" v-model="qrTool" />
        </div>
      </div>
    </div>
    <CardToolStatus v-if="qrTool" />
    <div v-if="qrTool" class="d-flex justify-content-center align-items-start mt-2">
      <div class="card" style="width: 100%;">
        <div class="card-header">
          <h6 class="text-center m-0">Tools Historical</h6>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-stiped table-hover text-center">
            <tr>
              <th>Activity</th>
              <th>Date</th>
              <th>Tool Name</th>
              <th>Location</th>
              <th>Actual Counter</th>
              <th>Std Counter</th>
              <th>PIC</th>
              <th>Notes</th>
              <th>Status</th>
            </tr>
            <tr v-for="toolHistory in toolHistories" :key="toolHistory.id">
              <td>{{ toolHistory.activity }}</td>
              <td>{{ toolHistory.date }}</td>
              <td>{{ toolHistory.toolName }}</td>
              <td>{{ toolHistory.location }}</td>
              <td>{{ toolHistory.actualCounter }}</td>
              <td>{{ toolHistory.stdCounter }}</td>
              <td>{{ toolHistory.pic }}</td>
              <td>{{ toolHistory.notes }}</td>
              <td>
                <button class="btn btn-sm bg-primary text-light">Details</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <PleaseScanQRTools v-else />
    <!-- <ToolMovementHistories /> -->
  </div>
</template>
<script>
import CardToolStatus from '@/components/TMS/Cards/CardToolStatus.vue';
import PleaseScanQRTools from '@/components/TMS/PleaseScanQRTools.vue';
export default {
  name: "ToolDashboard",
  data() {
    return {
      qrTool: null,
      toolHistories: [
        // IN USED,SETTING,REGRINDING,SCRAB,NEW,USED
        {
          id: 1,
          activity: "IN USED",
          date: "2024-06-05 09:00",
          toolName: "Drill DSDW-0001-1",
          location: "Tool Regrinding",
          actualCounter: "201",
          stdCounter: "200",
          pic: "Bambang",
          notes: "",
        },
        {
          id: 2,
          activity: "SETTING",
          date: "2024-06-03 09:00",
          toolName: "Drill DSDW-0001-1",
          location: "Clean Room",
          actualCounter: "201",
          stdCounter: "200",
          pic: "Bambang",
          notes: "",
        },
        {
          id: 3,
          activity: "IN USED",
          date: "2024-07-01 09:00",
          toolName: "Drill DSDW-0001-1",
          location: "Cylinder Head | IMSP-0001",
          actualCounter: "",
          stdCounter: "200",
          pic: "Dedi M.",
          notes: "",
        },
        {
          id: 4,
          activity: "SETTING",
          date: "2024-06-29 09:00",
          toolName: "Drill DSDW-0001-1",
          location: "Clean Room",
          actualCounter: "201",
          stdCounter: "200",
          pic: "Bambang",
          notes: "",
        },
        {
          id: 5,
          activity: "REGRINDING",
          date: "2024-06-29 08:00",
          toolName: "Drill DSDW-0001-1",
          location: "Tool Regrinding",
          actualCounter: "201",
          stdCounter: "200",
          pic: "Bambang",
          notes: "",
        },
        {
          id: 6,
          activity: "NEW",
          date: "2024-06-29 08:00",
          toolName: "Drill DSDW-0001-1",
          location: "Tool Regrinding",
          actualCounter: "201",
          stdCounter: "200",
          pic: "Bambang",
          notes: "",
        },
      ]
    }
  },
  components: {
    CardToolStatus,
    PleaseScanQRTools
  },
  mounted() {
    document.getElementById('qr-input').onblur = function () { this.focus() };
    document.getElementById('qr-input').focus();
  },
}
</script>
<style></style>
