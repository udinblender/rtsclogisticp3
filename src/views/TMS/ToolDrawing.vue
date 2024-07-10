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
                <label class="tool-drawing-label">Tanggal</label>
                <input class="form-control" type="date" />
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Tool Drawing</label>
                <input
                  @change="onFileChange"
                  class="form-control"
                  type="file"
                />
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Nama Tool Drawing</label>
                <input v-model="toolNm" class="form-control" type="text" />
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
                <label class="tool-drawing-label">Point Angle</label>
                <div class="input-with-unit">
                  <input
                    class="form-control"
                    type="text"
                    v-model="pointAngle"
                  />
                  <span class="unit">°</span>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Run Out</label>
                <input class="form-control" type="text" />
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Step Length</label>
                <div class="input-with-unit">
                  <input
                    class="form-control"
                    type="text"
                    v-model="stepLength"
                  />
                  <span class="unit">mm</span>
                </div>
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Diameter</label>
                <div class="input-with-unit">
                  <input class="form-control" type="text" v-model="diameter" />
                  <span class="unit">mm</span>
                </div>
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Chamfer Width</label>
                <div class="input-with-unit">
                  <input
                    class="form-control"
                    type="text"
                    v-model="chamferWidth"
                  />
                  <span class="unit">mm</span>
                </div>
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">Margin Width</label>
                <div class="input-with-unit">
                  <input
                    class="form-control"
                    type="text"
                    v-model="marginWidth"
                  />
                  <span class="unit">mm</span>
                </div>
              </div>
              <div class="mb-3 form-group">
                <label class="tool-drawing-label">PIC</label>
                <div class="input-with-unit">
                  <input class="form-control" type="text" v-model="pic" />
                </div>
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
            @click="addToolDrawing"
            data-bs-dismiss="modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" tabindex="-1" id="modalPreviewDrawing">
    <div class="modal-dialog modal-xl">
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
          <!-- Konten untuk menampilkan gambar di sini -->
          <img :src="previewImageUrl" class="img-fluid" alt="Preview Drawing" />
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
  <div class="card mt-1">
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">
          <div class="mb-3 form-group">
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalToolDrawing"
            >
              Tambah Drawing
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="table custom-table tbl-emp table-bordered mt-3">
            <thead>
              <tr>
                <th style="width: 3%">No</th>
                <th style="width: 10%">Nama Tool</th>
                <th style="width: 10%">Drawing</th>
                <th style="width: 10%">Maker Tool</th>
                <th style="width: 5%">Counter Tool</th>
                <th style="width: 5%">Run Out</th>
                <th style="width: 5%">Point Angle</th>
                <th style="width: 5%">Step Length</th>
                <th style="width: 5%">Diameter</th>
                <th style="width: 5%">Chamfer Width</th>
                <th style="width: 5%">Margin Width</th>
                <th style="width: 8%">PIC</th>
                <th style="width: 15%">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(toolDrawing, index) in paginatedData"
                :key="toolDrawing.id"
              >
                <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                <td>{{ toolDrawing.tool_nm }}</td>
                <td>
                  <button
                    class="btn btn-link"
                    @click="previewDrawing(toolDrawing.drawing)"
                  ></button>
                  {{ toolDrawing.drawing }}
                </td>
                <td>{{ toolDrawing.maker }}</td>
                <td>{{ toolDrawing.counter }}</td>
                <td>{{ toolDrawing.run_out }}</td>
                <td>{{ toolDrawing.point_angle }}</td>
                <td>{{ toolDrawing.step_length }}</td>
                <td>{{ toolDrawing.diameter }}</td>
                <td>{{ toolDrawing.chamfer_width }}</td>
                <td>{{ toolDrawing.margin_width }}</td>
                <td>{{ toolDrawing.pic }}</td>
                <td>
                  <button class="btn btn-primary">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-danger ms-2">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ToolDrawing',
  data() {
    return {
      toolNm: '',
      drawing: null,
      maker: '',
      counter: '',
      runOut: '',
      pointAngle: '',
      stepLength: '',
      diameter: '',
      chamferWidth: '',
      marginWidth: '',
      pic: '',
      currentPage: 1,
      pageSize: 10,
      previewImageUrl: '',
    }
  },
  computed: {
    ...mapGetters(['getToolDrawings']),
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.getToolDrawings.slice(startIndex, endIndex)
    },
  },

  methods: {
    addToolDrawing() {
      const newToolDrawing = {
        id: this.getToolDrawings.length + 1,
        tool_nm: this.toolNm,
        drawing: this.drawing,
        maker: this.maker,
        counter: this.counter,
        run_out: this.runOut,
        point_angle: this.pointAngle,
        step_length: this.stepLength,
        diameter: this.diameter,
        chamfer_width: this.chamferWidth,
        margin_width: this.marginWidth,
        pic: this.pic,
      }
      console.log(newToolDrawing)
      this.$store.dispatch('ActionAddToolDrawing', newToolDrawing)
      this.newToolDrawing = {}
    },
    onFileChange(event) {
      const file = event.target.files[0]
      const maxSize = 500 * 1024 // 500 KB

      // Validasi jenis file
      if (!file || !file.type.startsWith('image/')) {
        alert('Pilih file gambar yang valid.')
        return
      }

      // Validasi ukuran file
      if (file.size > maxSize) {
        alert('Ukuran file terlalu besar. Maksimal 500 KB.')
        return
      }

      // Buat objek FileReader untuk membaca file
      const reader = new FileReader()

      // Atur apa yang dilakukan ketika file selesai dibaca
      reader.onload = () => {
        // Menyimpan URL preview gambar
        this.previewImageUrl = reader.result

        // Menyimpan nama file atau path file yang dipilih
        this.drawing = file.name // atau ganti dengan path file jika diperlukan
      }

      // Mulai membaca file sebagai URL data
      reader.readAsDataURL(file)
    },
    previewDrawing(drawingFileName) {
      // Dapatkan URL gambar dari nama file atau dari server
      // Misalnya: this.previewImageUrl = `${API_URL}/drawings/${drawingFileName}`;
      // Simulasi untuk preview
      this.previewImageUrl = this.getToolDrawings[0].drawing // Ganti dengan path yang sesuai
      $('#modalPreviewDrawing').modal('show')
    },
  },
}
</script>
<style scoped>
.modal-body {
  padding: 1rem;
}

.tool-drawing-label {
  font-weight: bold;
  white-space: nowrap;
  margin-bottom: 0.5rem;
}

.form-control {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  width: 100%;
  box-sizing: border-box;
}

.input-with-unit {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-unit input {
  padding-right: 2.5rem;
  width: 100%;
  box-sizing: border-box;
}

.input-with-unit .unit {
  position: absolute;
  right: 10px;
  font-size: 0.875rem;
  color: #6c757d;
  pointer-events: none;
  display: flex;
  align-items: center;
  height: 100%;
}
.tbl-emp th {
  background-color: rgb(243, 216, 60); /* Warna latar belakang th */
  height: 50px !important;
  text-align: center;
  vertical-align: middle;
}

.table-bordered {
  border: 1px solid black;
  text-align: center;
  border-collapse: collapse; /* Gabungkan batas tepi tabel */
  width: 100%;
}

.tbl-emp th,
.tbl-emp td {
  border: 1px solid black; /* Batas tepi untuk sel-sel dalam tabel */
  text-align: center;
  padding: 8px; /* Atur jarak antara konten dan batas tepi */
}
</style>
