<template>
  <div class="modal" tabindex="-1" id="modalAddDistribution">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Distribution</h5>
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
              <label for="distributionName" class="form-label"
                >Distribution Name</label
              >
              <input
                type="text"
                class="form-control"
                id="distributionName"
                v-model="distribution_nm"
              />
            </div>
            <div class="mb-3">
              <label for="distributionDescription" class="form-label"
                >Distribution Description</label
              >
              <input
                type="text"
                class="form-control"
                id="distributionDescription"
                v-model="distribution_desc"
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
            @click="saveDistribution"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" tabindex="-1" id="modalEditDistribution">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Distribution</h5>
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
              <label for="editDistributionName" class="form-label"
                >Distribution Name</label
              >
              <input
                type="text"
                class="form-control"
                id="editDistributionName"
                v-model="editedDistribution.distribution_nm"
              />
            </div>
            <div class="mb-3">
              <label for="editDistributionDescription" class="form-label"
                >Distribution Description</label
              >
              <input
                type="text"
                class="form-control"
                id="editDistributionDescription"
                v-model="editedDistribution.distribution_desc"
              />
            </div>
            <div class="mb-3">
              <label for="editCreatedBy" class="form-label">Created By</label>
              <input
                type="text"
                class="form-control"
                id="editCreatedBy"
                v-model="editedDistribution.created_by"
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
            @click="saveEditDistribution"
            data-bs-dismiss="modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" tabindex="-1" id="modalDeleteDistribution">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Distribution</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this distribution?</p>
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
            @click="deleteDataDistribution"
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
        <h4 class="text-center m-0">Master Distribution</h4>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalAddDistribution"
        >
          Add Distribution
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
              <th>Distribution Name</th>
              <th>Description</th>
              <th>Created By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(dataDistribution, index) in getDataDistribution"
              :key="dataDistribution.id"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ dataDistribution.distribution_nm }}</td>
              <td>{{ dataDistribution.distribution_desc }}</td>
              <td>{{ dataDistribution.created_by }}</td>
              <td>
                <button
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditDistribution"
                  @click="editDataDistribution(dataDistribution)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  class="btn btn-danger ms-2"
                  data-bs-toggle="modal"
                  data-bs-target="#modalDeleteDistribution"
                  @click="showDeleteConfirmation(dataDistribution.id)"
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
  name: 'MasterDistribution',
  data() {
    return {
      distribution_nm: '',
      distribution_desc: '',
      created_by: '',
      editedDistribution: {
        id: null,
        distribution_nm: '',
        distribution_desc: '',
        created_by: '',
      },
      deletedDistribution: {
        id: null,
      },
    }
  },
  computed: {
    ...mapGetters(['getDataDistribution']),
  },
  methods: {
    saveDistribution() {
      const payload = {
        id: this.getDataDistribution.length + 1,
        distribution_nm: this.distribution_nm,
        distribution_desc: this.distribution_desc,
        created_by: this.created_by,
      }
      this.$store.dispatch('ActionSaveDistribution', payload)
      this.resetForm()
    },
    editDataDistribution(distribution) {
      this.editedDistribution = { ...distribution }
    },
    saveEditDistribution() {
      const payload = { ...this.editedDistribution }
      this.$store.dispatch('ActionEditDistribution', payload)
    },
    showDeleteConfirmation(id) {
      this.deletedDistribution = id
      console.log('id', this.deletedDistribution)
    },
    deleteDataDistribution() {
      const id = this.deletedDistribution
      console.log('id', id)
      this.$store.dispatch('ActionDeleteDistribution', id)
    },
    resetForm() {
      this.distribution_nm = ''
      this.distribution_desc = ''
      this.created_by = ''
    },
  },
}
</script>
