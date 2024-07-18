<template>
  <div class="modal" tabindex="-1" id="modalAddSystem">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add System</h5>
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
              <label for="systemName" class="form-label">System Type</label>
              <input
                type="text"
                class="form-control"
                id="systemType"
                v-model="system_type"
              />
            </div>
            <div class="mb-3">
              <label for="systemValue" class="form-label">Value</label>
              <input
                type="text"
                class="form-control"
                id="systemValue"
                v-model="system_value"
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <input
                type="text"
                class="form-control"
                id="description"
                v-model="system_desc"
              />
            </div>
            <div class="mb-3">
              <label for="createdBy" class="form-label">Created By</label>
              <input
                type="text"
                class="form-control"
                id="createdBy"
                v-model="created_by"
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
            data-bs-dismiss="modal"
            @click="saveSystem"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit System Modal -->
  <div class="modal" tabindex="-1" id="modalEditSystem">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit System</h5>
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
              <label for="editSytemType" class="form-label"> System Type</label>
              <input
                type="text"
                class="form-control"
                id="editSytemType"
                v-model="editedSystem.system_type"
              />
            </div>
            <div class="mb-3">
              <label for="editSystemValue" class="form-label">Value</label>
              <input
                type="text"
                class="form-control"
                id="editSystemValue"
                v-model="editedSystem.system_value"
              />
            </div>
            <div class="mb-3">
              <label for="editDescription" class="form-label">
                Description</label
              >
              <input
                type="text"
                class="form-control"
                id="editDescription"
                v-model="editedSystem.system_desc"
              />
            </div>
            <div class="mb-3">
              <label for="editCreatedBy" class="form-label">Created By</label>
              <input
                type="text"
                class="form-control"
                id="editCreatedBy"
                v-model="editedSystem.created_by"
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
            @click="saveEditSystem"
            data-bs-dismiss="modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" tabindex="-1" id="modalDeleteSystem">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete System</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this system?</p>
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
            @click="deleteSystem"
            data-bs-dismiss="modal"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="card p-2 mb-2">
      <div class="d-flex justify-content-between align-items-center">
        <h4 class="text-center m-0">Master System</h4>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalAddSystem"
        >
          Add System
        </button>
      </div>
    </div>

    <div class="card mt-2">
      <div class="card-body">
        <table
          class="table table-bordered table-striped"
          style="text-align: center"
        >
          <thead>
            <tr>
              <th>No</th>
              <th>System Type</th>
              <th>Value</th>
              <th>Description</th>
              <th>Created By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(dataSystem, index) in getDataSystem"
              :key="dataSystem.id"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ dataSystem.system_type }}</td>
              <td>{{ dataSystem.system_value }}</td>
              <td>{{ dataSystem.system_desc }}</td>
              <td>{{ dataSystem.created_by }}</td>

              <td>
                <button
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditSystem"
                  @click="prepareEditSystem(dataSystem)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  class="btn btn-danger ms-2"
                  data-bs-toggle="modal"
                  data-bs-target="#modalDeleteSystem"
                  @click="showDeleteConfirmationSystem(dataSystem.id)"
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
  name: 'MasterSystem',
  data() {
    return {
      system_type: '',
      system_value: '',
      system_desc: '',
      created_by: '',
      editedSystem: {
        id: null,
        system_type: '',
        system_value: '',
        system_desc: '',
        created_by: '',
      },
      deletedSystem: {
        id: null,
      },
    }
  },
  computed: {
    ...mapGetters(['getDataSystem']),
  },
  methods: {
    saveSystem() {
      const payload = {
        id: this.getDataSystem.length + 1,
        system_type: this.system_type,
        system_value: this.system_value,
        system_desc: this.system_desc,
        created_by: this.created_by,
      }
      this.$store.dispatch('ActionSaveSystem', payload)
      this.resetForm()
    },
    prepareEditSystem(system) {
      this.editedSystem = { ...system }
    },
    saveEditSystem() {
      const payload = { ...this.editedSystem }
      this.$store.dispatch('ActionEditSystem', payload)
    },
    showDeleteConfirmationSystem(id) {
      this.deletedSystem = id
      console.log('id', this.deletedSystem)
    },
    deleteSystem() {
      const id = this.deletedSystem
      console.log('id', id)
      this.$store.dispatch('ActionDeleteSystem', id)
    },
    resetForm() {
      this.system_type = ''
      this.system_value = ''
      this.system_desc = ''
      this.created_by = ''
    },
  },
}
</script>
