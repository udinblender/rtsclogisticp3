<template>
  <CModal scrollable :visible="registerModal" @close="() => { registerModal = false }">
    <CModalHeader>
      <CModalTitle>Register Tool</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CInputGroup class="mb-1">
        <CInputGroupText style="width: 120px">
          Type Tool
        </CInputGroupText>
        <treeselect class="form-control p-0" v-model="form.tool_type_id" :options="toolTypes" />
      </CInputGroup>
      <CInputGroup class="mb-1">
        <CInputGroupText style="width: 120px">
          Process Desc.
        </CInputGroupText>
        <CFormInput disabled type="text" />
      </CInputGroup>
      <CInputGroup class="mb-1">
        <CInputGroupText style="width: 120px">
          Tool No (auto)
        </CInputGroupText>
        <CFormInput disabled type="text" />
      </CInputGroup>
      <small class="text-muted">*Copy Tool No Di atas, lalu masukan ke QR Mesin Tool</small>
      <CInputGroup class="mb-1">
        <CInputGroupText style="width: 120px">
          QR Code Tool
        </CInputGroupText>
        <CFormInput type="text" placeholder="Arahkan kursor ke input, lalu scan QR Code" />
      </CInputGroup>
      <small class="text-muted">*Klik Input di atas, lalu scan menggunakan scanner</small>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { registerModal = false }">Close</CButton>
      <CButton color="primary">Save</CButton>
    </CModalFooter>
  </CModal>
  <div class="container-fluid">
    <div class="card p-2 mb-2">
      <div class="d-flex justify-content-between align-items-center">
        <h4 class="text-center m-0">Tool Register</h4>
        <CButton type="button" color="secondary" variant="outline" @click="() => { registerModal = true }">Add Tool
        </CButton>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Tool Number</th>
              <th>Tool Name</th>
              <th>Counter</th>
              <th>Location</th>
              <th>Register Date</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import MOCK_TOOLTYPES_TREESELECT from '@/mock/TOOL_TYPES_TREESELECT.mock';

// import the component
import Treeselect from "@zanmato/vue3-treeselect";
// import the styles
import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";

export default {
  name: "ToolRegister",
  components: {
    Treeselect
  },
  data() {
    return {
      toolTypes: MOCK_TOOLTYPES_TREESELECT,
      registerModal: false,
      form: {
        tool_type_id: null,
        tool_barcode: null,

      }
    }
  },
  mounted() {

  },
}
</script>
<style></style>
