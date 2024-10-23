<template>
  <div>
    <CCard>
      <CListGroup
        style="font-size: 1.5rem; background-color: #aa0000; color: white"
      >
        <div>Master Uploads</div>
      </CListGroup>

      <CCardBody>
        <form action="">
          <input type="file" name="masterUploads" id="" />
          <button type="submit">Submit</button>
        </form>
      </CCardBody>
    </CCard>

    <!--data Uploaded -->
    
  </div>
</template>

<script>
import { CCardBody } from '@coreui/vue'

export default {
  name: 'MasterUploads',
  component: {},
}
</script>
