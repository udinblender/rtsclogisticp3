<template>
  <CModal scrollable :visible="modalShow" @close="() => { $emit('modalShow', false) }">
    <CModalHeader>
      <CModalTitle>Setting Tool</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="card p-2 mb-4" style="z-index: 2">
        <CInputGroup class="mb-1">
          <CInputGroupText style="width: 150px">
            Ketinggian
          </CInputGroupText>
          <CFormInput type="number" />
        </CInputGroup>
        <CInputGroup class="mb-1">
          <CInputGroupText style="width: 150px">
            Run out
          </CInputGroupText>
          <CFormInput type="number" />
        </CInputGroup>
        <div class="my-2">
          <label class="form-check-label mr-2" for="flexSwitchCheckChecked">Internal Coolant Keluar?</label>
          <input class="form-check-input mx-2" type="checkbox">
        </div>
        <CInputGroup class="mb-1">
          <CInputGroupText style="width: 150px">
            PIC
          </CInputGroupText>
          <treeselect class="form-control p-0" v-model="form.new_tool.user_id" :options="users" />
        </CInputGroup>
      </div>
    </CModalBody>
    <CModalFooter class="mt-4">
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
        new_tool: {
          machine_id: null,
          user_id: null
        },
        used_tool: {
          actual_counter: null,
          notes: null
        }
      },
      qr_used_tool: null,
      qr_new_tool: null,
      machines: MOCK_MACHINES_TREESELECT,
      users: MOCK_USERS_TREESELECT,
      is_qr_avail: true
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
