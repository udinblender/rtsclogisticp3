<template>
  <CModal scrollable :visible="modalShow" @close="() => { $emit('modalShow', false) }">
    <CModalHeader>
      <CModalTitle>Tool Used</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="card mt-2 p-2" style="z-index: 1">
        <CInputGroup class="mb-1">
          <CInputGroupText style="width: 150px">
            PIC
          </CInputGroupText>
          <treeselect class="form-control p-0" v-model="form.user_id" :options="users" />
        </CInputGroup>
        <CInputGroup class="mb-1">
          <CInputGroupText style="width: 150px">
            Actual Counter
          </CInputGroupText>
          <CFormInput type="number" placeholder="input actual counter" />
        </CInputGroup>
        <div class="my-3">
          <label style="width: 150px">
            Notes / Problem
          </label>
          <div class="d-flex flex-wrap justify-content-between align-items-center my-2">
            <button v-for="(note, i) in tool_notes" :key="note"
              :class="`btn btn-sm ${note.selected ? 'btn-primary' : 'btn-outline-primary'}`" @click="selectedNote(i)">{{
                note.label
              }}</button>
          </div>
        </div>
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { $emit('modalShow', false) }">Close</CButton>
      <CButton color="primary">Save & Transfer</CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import MOCK_MACHINES_TREESELECT from "@/mock/MACHINES_TREESELECT.mock";
import MOCK_TOOL_NOTES_TREESELECT from "@/mock/NOTES_TOOL_TREESELECT.mock";
import MOCK_USERS_TREESELECT from "@/mock/USERS_TREESELECT.mock";

import Treeselect from "@zanmato/vue3-treeselect";
import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";

export default {
  name: "ToolUsedAction",
  data() {
    return {
      form: {
        actual_counter: null,
        notes: null,
        tool_qr: ''
      },
      qr_used_tool: null,
      machines: MOCK_MACHINES_TREESELECT,
      users: MOCK_USERS_TREESELECT,
      tool_notes: MOCK_TOOL_NOTES_TREESELECT,
    }
  },
  methods: {
    selectedNote(i) {
      for (let index = 0; index < this.tool_notes.length; index++) {
        if (i == index) {
          this.tool_notes[i].selected = true
        } else {
          this.tool_notes[index].selected = false
        }

      }
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
