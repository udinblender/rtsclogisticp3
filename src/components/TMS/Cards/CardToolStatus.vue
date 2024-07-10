<template>
  <div class="d-flex justify-content-center align-items-start mt-2">
    <div class="card" style="width: 100%">
      <div class="card-header">
        <h6 class="text-center m-0">Tool Status</h6>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <h4 class="text-center">Tool Name</h4>
          </div>
          <div class="col">
            <h4 class="text-center">Tool Description</h4>
          </div>
          <div class="col">
            <h4 class="text-center">Position</h4>
          </div>
          <div class="col">
            <h4 class="text-center">Std Counter</h4>
          </div>
          <div class="col">
            <h4 class="text-center">Act Counter</h4>
          </div>
          <div class="col">
            <h4 class="text-center">Status</h4>
          </div>
        </div>
        <hr>
        <!-- <div class="row text-center">
          <div class="col">
            <h6 class="text-center">...</h6>
          </div>
          <div class="col">
            <h6 class="text-center">...</h6>
          </div>
          <div class="col">
            <h6 class="text-center">...</h6>
          </div>
          <div class="col">
            <h6 class="text-center">...</h6>
          </div>
          <div class="col">
            ...
          </div>
          <div class="col">
            ...
          </div>
        </div> -->
        <div class="row text-center">
          <div class="col">
            <h6 class="text-center">DSDW-0001</h6>
          </div>
          <div class="col">
            <h6 class="text-center">Drill Step</h6>
          </div>
          <div class="col">
            <h6 class="text-center">Repair on Clean Room</h6>
          </div>
          <div class="col">
            <h6 class="text-center">311</h6>
          </div>
          <div class="col">
            <h6 class="text-center">300</h6>
          </div>
          <div class="col">
            <div class="text-center badge bg-warning">
              1x Regrinding
            </div>
            <!-- <div class="text-center badge bg-success">
              New
            </div> -->
          </div>
        </div>
      </div>
      <div v-if="is_footer" class="card-footer text-center">
        <template v-if="location == 'Tool Regrinding'">
          <button class="btn btn-warning" @click="showModal('regrindingModal')">Regrinding</button> .
          <button class="btn btn-danger" @click="showAlert">Scrab</button> .
          <button class="btn btn-success" @click="transferConfirmation">Transfer</button>
        </template>
        <template v-else-if="location == 'Clean Room'">
          <button class="btn btn-warning" @click="showModal('settingModal')">Setting</button> .
          <button class="btn btn-success" @click="transferConfirmation">Transfer</button>
        </template>
        <template
          v-else-if="location == 'Cam Shaft' || location == 'Crank Shaft' || location == 'Cylinder Head' || location == 'Cylinder Block'">
          <button class="btn btn-info" @click="showModal('toolChangeModal')">Tool Change</button> .
          <button class="btn btn-success" @click="transferConfirmation">Transfer</button>
        </template>
        <!-- <button class="btn btn-info" @click="showModal('toolChangeModal')">Tool Change</button> .
        <button class="btn btn-warning" @click="showModal('settingModal')">Setting</button> .
        <button class="btn btn-warning" @click="showModal('regrindingModal')">Regrinding</button> .
        <button class="btn btn-danger" @click="showAlert">Scrab</button> .
        <button class="btn btn-success" @click="transferConfirmation">Transfer</button> -->
      </div>
    </div>
  </div>
  <ToolChangeAction :modalShow="toolChangeModal" @modalShow="(state) => dismissModal('toolChangeModal')" />
  <SettingAction :modalShow="settingModal" @modalShow="(state) => dismissModal('settingModal')" />
  <RegringingAction :modalShow="regrindingModal" @modalShow="(state) => dismissModal('regrindingModal')" />
</template>
<script>
import { ACTION_FOCUS_INPUT } from '@/store/TMS/focusInput.module'

import ToolChangeAction from '@/components/TMS/Modals/ToolChangeAction.vue'
import SettingAction from '../Modals/SettingAction.vue'
import RegringingAction from '../Modals/RegringingAction.vue'

export default {
  name: "CardToolStatus",
  data() {
    return {
      toolChangeModal: false,
      settingModal: false,
      regrindingModal: false
    }
  },
  methods: {
    dismissModal(keyModal) {
      this[keyModal] = false
      this.$store.dispatch(ACTION_FOCUS_INPUT, true)
    },
    showModal(keyModal) {
      try {
        this[keyModal] = true
        this.$store.dispatch(ACTION_FOCUS_INPUT, false)
      } catch (error) {
        console.log(error);
      }
    },
    showAlert() {
      this.$swal.fire({
        title: "Apakah anda yakin ingin Scrab Tool?",
        showCancelButton: true,
        confirmButtonText: "Ya, Saya ingin Scrab tool!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal("Success to scrab tool!", "", "success");
        }
      });
    },
    transferConfirmation() {
      this.$swal.fire({
        title: "Are you sure want to Transfer?",
        showCancelButton: true,
        confirmButtonText: "Yes, I am sure!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal("Success to Transfer!", "", "success");
        }
      });
    }
  },
  components: {
    ToolChangeAction,
    SettingAction,
    RegringingAction
  },
  props: {
    is_footer: {
      type: Boolean,
      default: false
    },
    qrCode: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: 'Tool Regrinding'
    }
  }
}
</script>
<style></style>
