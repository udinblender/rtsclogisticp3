<template>
  <div class="modal" tabindex="-1" id="modalAddMachine">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Machine</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="machineName" class="form-label">Machine Name</label>
              <input
                type="text"
                class="form-control"
                id="machineName"
                v-model="machineName"
              />
            </div>
            <div class="mb-3">
              <label for="cell" class="form-label">Cell</label>
              <input
                type="text"
                class="form-control"
                id="cell"
                v-model="cell"
              />
            </div>
            <div class="mb-3">
              <label for="maker" class="form-label">Maker</label>
              <input
                type="text"
                class="form-control"
                id="maker"
                v-model="maker"
              />
            </div>
            <div class="mb-3">
              <label for="machineDescription" class="form-label"
                >Process Description</label
              >
              <input
                type="text"
                class="form-control"
                id="machineDescription"
                v-model="machineDescription"
              />
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="addMachineTMS()"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" tabindex="-1" id="modalEditMachineTMS">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Machine</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="machineName" class="form-label">Machine Name</label>
              <input
                type="text"
                class="form-control"
                id="machineName"
                v-model="editedMachine.machine_nm"
              />
            </div>
            <div class="mb-3">
              <label for="cell" class="form-label">Cell</label>
              <input
                type="text"
                class="form-control"
                id="cell"
                v-model="editedMachine.line_nm"
              />
            </div>
            <div class="mb-3">
              <label for="maker" class="form-label">Maker</label>
              <input
                type="text"
                class="form-control"
                id="maker"
                v-model="editedMachine.machine_maker"
              />
            </div>
            <div class="mb-3">
              <label for="machineDescription" class="form-label"
                >Machine Description</label
              >
              <input
                type="text"
                class="form-control"
                id="machineDescription"
                v-model="editedMachine.machine_desc"
              />
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="saveEditMachine()"
            data-bs-dismiss="modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" tabindex="-1" id="modalDeleteMachineTMS">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Machine</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this machine?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="ActiondeleteMachineTMS()"
            data-bs-dismiss="modal"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  <nav aria-label="Page navigation" class="mb-2">
    <ul class="pagination justify-content-center mb-0">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button class="page-link" @click="goToPage(currentPage - 1)">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </button>
      </li>
      <li
        class="page-item"
        v-for="page in totalPages"
        :key="page"
        :class="{ active: currentPage === page }"
      >
        <button class="page-link" @click="goToPage(page)">
          {{ page }}
        </button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button class="page-link" @click="goToPage(currentPage + 1)">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </button>
      </li>
    </ul>
  </nav>
  <div class="container-fluid">
    <div class="card p-2 mb-2">
      <div class="d-flex justify-content-between align-items-center">
        <h4 class="text-center m-0">Master Machine</h4>
        <CButton
          type="button"
          color="secondary"
          variant="outline"
          data-bs-toggle="modal"
          data-bs-target="#modalAddMachine"
          >Add Machine
        </CButton>
      </div>
    </div>

    <div class="card mt-2">
      <div class="card-body">
        <table
          style="text-align: center"
          class="table table-bordered table-striped"
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Machine Name</th>
              <th>Cell</th>
              <th>Maker</th>
              <th>Process Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(dataMachine, index) in paginatedData" :key="machine_id">
              <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
              <td>{{ dataMachine.machine_nm }}</td>
              <td>{{ dataMachine.line_nm }}</td>
              <td>{{ dataMachine.machine_maker }}</td>
              <td>{{ dataMachine.machine_desc }}</td>
              <td>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditMachineTMS"
                  class="btn btn-primary"
                  @click="editMachineTMS(dataMachine)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#modalDeleteMachineTMS"
                  class="btn btn-danger ms-2"
                  @click="deleteMachineTMS(dataMachine)"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MasterMachine',
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      machineName: '',
      cell: '',
      maker: '',
      machineDescription: '',
      editedMachine: {
        machine_nm: '',
        line_nm: '',
        machine_maker: '',
        machine_desc: '',
      },
      deletedMachine: '',
    }
  },
  mounted() {
    this.$store.dispatch('ActionGetMachine')
  },
  computed: {
    ...mapGetters(['getMachineTool']),
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.getMachineTool.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.getMachineTool.length / this.pageSize)
    },
  },

  methods: {
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return
      this.currentPage = page
    },
    addMachineTMS() {
      try {
        const payload = {
          machine_nm: this.machineName,
          line_nm: this.cell,
          machine_maker: this.maker,
          machine_desc: this.machineDescription,
        }
        this.$store.dispatch('ActionAddMachineTMS', payload)
      } catch (error) {
        console.log(error)
      }
    },

    editMachineTMS(machine) {
      this.editedMachine = machine
    },

    saveEditMachine() {
      try {
        console.log(this.editedMachine)
        this.$store.dispatch('ActionEditMachineTMS', this.editedMachine)
      } catch (error) {
        console.log(error)
      }
    },
    deleteMachineTMS(dataMachine) {
      this.deletedMachine = dataMachine.machine_id
      console.log('machine_id on deleteMachineTMS', this.deletedMachine)
    },

    ActiondeleteMachineTMS() {
      try {
        console.log('machine_id on ActiondeleteMachineTMS', this.deletedMachine)
        this.$store.dispatch('ActionDeleteMachineTMS', this.deletedMachine)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
