<template>
  <CModal scrollable :visible="modalShow" @close="() => { $emit('modalShow', false) }">
    <CModalHeader>
      <CModalTitle>Tool Change</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="card p-2" style="z-index: 2">
        <h6 style="text-decoration: underline;">New Tool</h6>
        <CInputGroup class="mb-1">
          <CInputGroupText style="width: 150px">
            Machine
          </CInputGroupText>
          <treeselect class="form-control p-0" v-model="form.new_tool.machine_id" :options="machines" />
        </CInputGroup>
        <CInputGroup class="mb-1">
          <CInputGroupText style="width: 150px">
            PIC
          </CInputGroupText>
          <treeselect class="form-control p-0" v-model="form.new_tool.user_id" :options="users" />
        </CInputGroup>
      </div>
      <div class="form-check form-switch my-2">
        <label class="form-check-label" for="flexSwitchCheckChecked">Apakah tool ada barcode?</label>
        <input class="form-check-input" type="checkbox" checked v-model="is_qr_avail">
      </div>
      <div v-if="is_qr_avail" class="card mt-2 p-2" style="z-index: 1">
        <h6 style="text-decoration: underline;">Used Tool</h6>
        <small class="text-muted">*Scan QR Code Tools Here!</small>
        <CInputGroup class="mb-1">
          <CInputGroupText style="width: 150px">
            Tool No
          </CInputGroupText>
          <CFormInput type="text" placeholder="Scan QR Tool bekas di sini!" />
        </CInputGroup>
        <CInputGroup class="mb-1">
          <CInputGroupText style="width: 150px">
            Tool Desc
          </CInputGroupText>
          <CFormInput disabled type="text" placeholder="Auto Fill (disabled)" />
        </CInputGroup>
        <CInputGroup class="mb-1">
          <CInputGroupText style="width: 150px">
            Standard Counter
          </CInputGroupText>
          <CFormInput disabled type="number" placeholder="Auto Fill (disabled)" />
        </CInputGroup>
        <hr>
        <CInputGroup class="mb-1">
          <CInputGroupText style="width: 150px">
            Actual Counter
          </CInputGroupText>
          <CFormInput type="number" placeholder="input actual counter" />
        </CInputGroup>
        <label style="width: 150px">
          Notes / Problem
        </label>
        <div class="d-flex flex-wrap justify-content-between align-items-center my-2">
          <button v-for="(note, i) in tool_notes" :key="note"
            :class="`btn btn-sm ${note.selected ? 'btn-primary' : 'btn-outline-primary'}`" @click="selectedNote(i)">{{
              note.label
            }}</button>
        </div>

        <!-- <CInputGroup class="mb-1">
          <treeselect class="form-control p-0" v-model="form.used_tool.notes" :options="tool_notes" />
        </CInputGroup> -->
        <!-- <div class="form-floating">
          <textarea class="form-control" placeholder="(optional)"></textarea>
          <label for="floatingTextarea">Notes / Problem</label>
        </div> -->
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
      tool_notes: MOCK_TOOL_NOTES_TREESELECT,
      is_qr_avail: true
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
