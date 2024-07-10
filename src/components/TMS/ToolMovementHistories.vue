<template>
  <div class="d-flex justify-content-center align-items-start mt-2">
    <div class="card mx-1" style="width: 100%;">
      <div class="card-header">
        <h6 class="text-center m-0">Tool Movement</h6>
      </div>
      <div class="card-body">
        <table class="table table-bordered table-hover text-center">
          <tr>
            <th>Activity</th>
            <th>Date</th>
            <th>Tool Name</th>
            <th>Counter Tool</th>
            <th>Location</th>
            <th>Judgment</th>
          </tr>
          <tr>
            <td>PEMAKAIAN</td>
            <td>2024-07-01 09:00</td>
            <td>Drill DSDW-0001</td>
            <td>101</td>
            <td>Tool Regrinding</td>
            <td>
              <div class="badge bg-success">OK</div>
            </td>
          </tr>
          <tr>
            <td>REPAIR</td>
            <td>2024-07-01 08:00</td>
            <td>Drill DSDW-0001</td>
            <td>101</td>
            <td>Tool Regrinding</td>
            <td>
              <div class="badge bg-success">OK</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ToolMovementHistories',
  data() {
    return {
      movementHistories: []
    }
  }
}
</script>
<style></style>
