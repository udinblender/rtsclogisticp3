<template>
    <div>
        <CCard style="height: 24rem;max-height: 24rem;">
      <CListGroup
        style="font-size: 1.5rem; background-color: #aa0000; color: white"
      >
        <div>Data Uploaded</div>
      </CListGroup>

      <!-- filter -->
      <CCardBody style="height: .5rem;">
        <form class="d-flex justify-content-between" action="filter">
          <div>
            <label for="date" placeholder="Filter by Date"
              >Filter by Date</label
            >
            <br />
            <input type="date" name="date" id="" />
          </div>
          <div>
            <label for="module" placeholder="Module No">Module No.</label>
            <br />
            <input type="text" name="date" id="" />
          </div>
          <div>
            <label for="unique" placeholder="Unique No.">Unique No.</label>
            <br />
            <input type="text" name="date" id="" />
          </div>
        </form>
      </CCardBody>

      <CCardBody style="margin:  2rem 0 10px 0;">
        <table style="width: 100%;height: 13rem;">
          <tr style="background-color: skyblue">
            <th>No</th>
            <th>No.Module</th>
            <th>Part No.</th>
            <th>Unique No.</th>
            <th>Box</th>
            <th>Total pcs</th>
            <th>W/H Sunter</th>
            <th>Request</th>
            <th>Received</th>
            <th>Action</th>
          </tr>
          <tr style="height: 2rem;">
            <td>1</td>
            <td>BExxx</td>
            <td>B001</td>
            <td>Part A</td>
            <td>T001</td>
            <td>3</td>
            <td>100</td>
            <td>2024-10-01</td>
            <td>2024-10-10</td>
            <td class="d-flex">
              <form action="">
                <input type="hidden" name="key" />
                <button type="submit">edit</button>
              </form>
              <form action="">
                <input type="hidden" name="key" />
                <button type="submit">delete</button>
              </form>
            </td>
          </tr>

          <tr style="height: 2rem;">
            <td>2</td>
          </tr>
          <tr style="height: 2rem;">
            <td>3</td>
          </tr>
          <tr style="height: 2rem;">
            <td>4</td>
          </tr>
          <tr style="height: 2rem;">
            <td>5</td>
          </tr>

        </table>
      </CCardBody>

      <CCardBody>
<div class="d-flex justify-content-center" style="padding: 0;" >
    <div style="border: 1px black solid;  ">Previous</div>
    <div style="border: 1px black solid;  ">Next</div>

</div>
      </CCardBody>
    </CCard>
    </div>
</template>

<script>
export default {
    name:'DataUploaded',
    component:{
        
    }
}

</script>