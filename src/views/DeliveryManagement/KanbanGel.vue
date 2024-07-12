<template>
  <div class="modal" tabindex="-1" id="modalTambahTool">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Tool</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="toolName" class="form-label">Register Date</label>
            <input
              type="date"
              class="form-control"
              id="registerToolDate"
              v-model="registerToolDate"
            />
          </div>
          <div class="mb-3">
            <label for="toolName" class="form-label">Tool Name</label>
            <input
              type="text"
              class="form-control"
              id="toolName"
              v-model="toolName"
            />
          </div>
          <div class="mb-3">
            <label for="line" class="form-label">Line</label>
            <input type="text" class="form-control" id="line" v-model="line" />
          </div>
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
            @click="saveDataTool"
            data-bs-dismiss="modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="card p-2 mb-2">
      <div class="d-flex justify-content-between align-items-center">
        <h4 class="text-center m-0">Master Data Tool</h4>
        <CButton
          type="button"
          color="secondary"
          variant="outline"
          data-bs-toggle="modal"
          data-bs-target="#modalTambahTool"
          >Add Tool
        </CButton>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <table
          style="text-align: center"
          class="table table-bordered table-striped"
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Register Date</th>
              <th>Tool Name</th>
              <th>Line</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(dataTool, index) in paginatedData" :key="dataTool.id">
              <td>{{ index + 1 }}</td>
              <td>{{ dataTool.registerToolDate }}</td>
              <td>{{ dataTool.toolName }}</td>
              <td>{{ dataTool.line }}</td>
              <td>
                <button
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditKanban"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modalDeleteKanban"
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
  name: 'KanbanGel',
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      registerToolDate: '',
      toolName: '',
      line: '',
    }
  },
  computed: {
    ...mapGetters(['getDataTool']),
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.getDataTool.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.getDataTool.length / this.pageSize)
    },
  },
  methods: {
    saveDataTool() {
      const paylod = {
        id: this.getDataTool.length + 1,
        registerToolDate: this.registerToolDate,
        toolName: this.toolName,
        line: this.line,
      }
      this.$store.dispatch('ActionSaveDataTool', paylod)
    },
  },
}
</script>
