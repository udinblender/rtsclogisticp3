<template>
  <CModal scrollable :visible="modalShow" @close="() => { $emit('modalShow', false) }">
    <CModalHeader>
      <CModalTitle>Tool Change</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="card p-2" style="z-index: 2">
        <CInputGroup class="mb-1">
          <CInputGroupText style="width: 150px">
            Machine
          </CInputGroupText>
          <treeselect class="form-control p-0" v-model="form.machine_id" :options="machines" />
        </CInputGroup>
        <CInputGroup class="mb-1">
          <CInputGroupText style="width: 150px">
            PIC
          </CInputGroupText>
          <treeselect class="form-control p-0" v-model="form.user_id" :options="users" />
        </CInputGroup>
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { $emit('modalShow', false) }">Close</CButton>
      <CButton color="primary">Save</CButton>
    </CModalFooter>
  </CModal>
</template>
<script>

import MOCK_MACHINES_TREESELECT from "@/mock/MACHINES_TREESELECT.mock";
import MOCK_USERS_TREESELECT from "@/mock/USERS_TREESELECT.mock";

import Treeselect from "@zanmato/vue3-treeselect";
import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";

export default {
  name: "ToolChangeAction",
  data() {
    return {
      form: {
        machine_id: null,
        user_id: null
      },
      qr_used_tool: null,
      qr_new_tool: null,
      machines: MOCK_MACHINES_TREESELECT,
      users: MOCK_USERS_TREESELECT
    }
  },
  components: {
    Treeselect
  },
  props: {
    modalShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style></style>
