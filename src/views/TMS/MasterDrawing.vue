<template>
  <div class="modal" tabindex="-1" id="modalToolDrawing">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Tambah Drawing</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Regster Date </label>
                <input
                  v-model="registerDate"
                  class="form-control"
                  type="date"
                />
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Nama Tool Drawing</label>
                <input v-model="toolNm" class="form-control" type="text" />
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Drawing</label>
                <input
                  @change="onFileChange"
                  class="form-control"
                  type="file"
                />
              </div>

              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Maker Tool</label>
                <input v-model="maker" class="form-control" type="text" />
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Counter Tool</label>
                <input v-model="counter" class="form-control" type="text" />
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">PIC</label>
                <input v-model="pic" class="form-control" type="text" />
              </div>
            </div>
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
            @click="saveMasterDrawing"
            data-bs-dismiss="modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- modalToolDrawing -->

  <div class="modal" tabindex="-1" id="modalMeasurement">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Measurement</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <table class="table table-bordered table-striped">
            <tr>
              <th>Tool Drawing Name</th>
              <th>Maker</th>
              <th>Counter Tool</th>
            </tr>
            <tbody>
              <tr>
                <td>{{ selectedDrawing.toolNm }}</td>
                <td>{{ selectedDrawing.maker }}</td>
                <td>{{ selectedDrawing.counter }}</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th style="width: 30%">Measure Name</th>
                <th style="width: 14%">Value</th>
                <th style="width: 14%">Upper Limit</th>
                <th style="width: 14%">Lower Limit</th>
                <th style="width: 14%">Unit</th>
                <th style="width: 14%">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(measurement, index) in measurements" :key="index">
                <td>
                  <input
                    type="text"
                    v-model="measurement.name"
                    class="form-control"
                    placeholder="Enter Measure Name"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    v-model="measurement.value"
                    class="form-control"
                    placeholder="Enter Value"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    v-model="measurement.upperLimit"
                    class="form-control"
                    placeholder="Enter Upper Limit"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    v-model="measurement.lowerLimit"
                    class="form-control"
                    placeholder="Enter Lower Limit"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    v-model="measurement.unit"
                    class="form-control"
                    placeholder="Enter Unit"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteRow(index)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" class="btn btn-primary" @click="addRow">
            Add Measurement
          </button>
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
            @click="saveMeasurements"
            data-bs-dismiss="modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- modalMeasurement -->

  <div class="modal" tabindex="-1" id="modalEditDrawing">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Drawing</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Register Date </label>
                <input
                  v-model="registerDateEdit"
                  class="form-control"
                  type="date"
                />
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Nama Tool Drawing</label>
                <input v-model="toolNmEdit" class="form-control" type="text" />
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Drawing</label>
                <input
                  @change="onFileChange"
                  class="form-control"
                  type="file"
                />
              </div>

              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Maker Tool</label>
                <input v-model="makerEdit" class="form-control" type="text" />
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Counter Tool</label>
                <input v-model="counterEdit" class="form-control" type="text" />
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">PIC</label>
                <input v-model="picEdit" class="form-control" type="text" />
              </div>
            </div>
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
            @click="saveMasterDrawing"
            data-bs-dismiss="modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- modalPreview -->
  <div class="modal" tabindex="-1" id="modalPreview">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Preview Drawing</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img :src="previewUrl" class="img-fluid" alt="Preview" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" tabindex="-1" id="modalDeleteDrawing">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Drawing</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this drawing?</p>
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
            @click="deleteDrawing"
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
        <h4 class="text-center m-0">Master Drawing</h4>
        <CButton
          type="button"
          color="secondary"
          variant="outline"
          data-bs-toggle="modal"
          data-bs-target="#modalToolDrawing"
          >Add Drawing
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
              <th>Tool Drawing Name</th>
              <th>Drawing</th>
              <th>Maker</th>
              <th>Counter</th>
              <th>PIC</th>
              <th>Measurement</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(masterDrawing, index) in paginatedData"
              :key="masterDrawing.id"
            >
              <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
              <td>{{ masterDrawing.registerDate }}</td>
              <td>{{ masterDrawing.toolNm }}</td>
              <td>
                <button
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modalPreview"
                  @click="previewDrawing(masterDrawing.photo)"
                >
                  <i class="fas fa-eye"></i>
                </button>
              </td>
              <td>{{ masterDrawing.maker }}</td>
              <td>{{ masterDrawing.counter }}</td>
              <td>{{ masterDrawing.pic }}</td>
              <td>
                <button
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modalMeasurement"
                  @click="addMeasurement(masterDrawing)"
                >
                  <i class="fas fa-edit"></i>
                </button>
              </td>
              <td>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditDrawing"
                  class="btn btn-primary"
                  @click="editDrawing(masterDrawing)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#modalDeleteDrawing"
                  @click="showDeleteConfirmation(masterDrawing.id)"
                  class="btn btn-danger ms-2"
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
  name: 'MasterDrawing',
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      searchResult: [],
      registerDate: '',
      toolNm: '',
      maker: '',
      counter: '',
      pic: '',
      photo: '',
      measurements: [], // Make sure this is an array
      selectedDrawing: {},
      previewUrl: '',
      editingDrawingId: null,
      registerDateEdit: '',
      toolNmEdit: '',
      makerEdit: '',
      counterEdit: '',
      picEdit: '',
    }
  },

  computed: {
    ...mapGetters(['getMasterDrawings', 'getMeasurements']),
    totalPages() {
      const data =
        this.searchResult.length > 0
          ? this.searchResult
          : this.getMasterDrawings
      return Math.ceil(data.length / this.pageSize)
    },
    paginatedData() {
      const data =
        this.searchResult.length > 0
          ? this.searchResult
          : this.getMasterDrawings
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = this.currentPage * this.pageSize
      return data.slice(startIndex, endIndex)
    },
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.photo = file
      this.previewUrl = URL.createObjectURL(file) // Membuat URL pratinjau dari file yang dipilih
    },
    addMeasurement(masterDrawing) {
      // Set selectedDrawing to the clicked masterDrawing item
      this.selectedDrawing = { ...masterDrawing }
      // Set measurements to the measurements of the selected drawing
      const foundMeasurements = this.getMeasurements.find(
        (measurement) => measurement.id === masterDrawing.id,
      )
      this.measurements = foundMeasurements
        ? foundMeasurements.measurements
        : []
    },

    addRow() {
      this.measurements.push({
        name: '',
        value: '',
        upperLimit: '',
        lowerLimit: '',
        unit: '',
      })
    },
    deleteRow(index) {
      this.measurements.splice(index, 1)
    },
    editDrawing(masterDrawing) {
      this.registerDateEdit = masterDrawing.registerDate
      console.log(this.registerDateEdit)
      this.toolNmEdit = masterDrawing.toolNm
      this.makerEdit = masterDrawing.maker
      this.counterEdit = masterDrawing.counter
      this.picEdit = masterDrawing.pic
      this.photo = masterDrawing.photo // Assuming photo is a URL or similar.

      // Set ID drawing yang sedang diedit
      this.editingDrawingId = masterDrawing.id
    },

    saveMasterDrawing() {
      try {
        let payload

        if (this.editingDrawingId !== null) {
          // Update existing drawing
          payload = {
            id: this.editingDrawingId,
            registerDate: this.registerDateEdit,
            toolNm: this.toolNmEdit,
            maker: this.makerEdit,
            counter: this.counterEdit,
            photo: this.photo,
            pic: this.picEdit,
          }
          this.$store.dispatch('ActionEditMasterDrawing', payload)
        } else {
          // Add new drawing
          const id = this.getMasterDrawings.length + 1
          payload = {
            id: id,
            registerDate: this.registerDate,
            toolNm: this.toolNm,
            maker: this.maker,
            counter: this.counter,
            photo: this.photo,
            pic: this.pic,
          }
          this.$store.dispatch('ActionSaveMasterDrawing', payload)
        }

        console.log(payload)

        // Reset form fields
        this.registerDate = ''
        this.toolNm = ''
        this.maker = ''
        this.counter = ''
        this.photo = ''
        this.pic = ''
        this.editingDrawingId = null // Reset editing ID
      } catch (error) {
        console.log(error)
      }
    },
    saveMeasurements() {
      try {
        const payload = {
          id: this.selectedDrawing.id,
          measurements: this.measurements,
        }
        console.log(payload)
        this.$store.dispatch('ActionSaveMeasurements', payload)
      } catch (error) {
        console.log(error)
      }
    },
    previewDrawing(photo) {
      console.log('Drawing type:', typeof photo)
      console.log(
        'Drawing instance:',
        photo instanceof File,
        photo instanceof Blob,
      )

      if (typeof photo === 'string') {
        this.previewUrl = photo // Jika drawing adalah URL
      } else if (photo instanceof File || photo instanceof Blob) {
        this.previewUrl = URL.createObjectURL(photo) // Jika drawing adalah objek File atau Blob
      } else {
        console.error('Unsupported drawing format')
        return
      }
    },
    showDeleteConfirmation(masterDrawing) {
      this.deleteConfirmation = masterDrawing
    },
    deleteDrawing(masterDrawing) {
      this.$store.dispatch('ActionDeleteMasterDrawing', masterDrawing)
    },
  },
}
</script>
