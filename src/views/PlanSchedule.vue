<template>
  <UnderDevelopment />
  <div class="card">
    <div class="container-fluid">
      <h1>Schedule Kuras</h1>
      <div class="card col">
        <div class="row">
          <div class="col">
            <h5 class="text-start">Pilih Bulan</h5>
            <div class="input-group mb-2">
              <input
                v-model="selectedSearchMonth"
                type="month"
                class="form-control"
                @="onMonthChange"
              />
            </div>
          </div>
          <div class="col">
            <h5 class="text-start">Line</h5>
            <div class="input-group mb-2">
              <select
                class="form-select sz-hst"
                v-model="selectedSearchLine"
                @change="onLineChange('selectedSearchLine')"
              >
                <option
                  v-for="line in getLineNames"
                  :key="line.line_id"
                  :value="line"
                >
                  {{ line.line_nm }}
                </option>
              </select>
            </div>
          </div>
          <div class="col">
            <h5 class="text-start">Mesin</h5>
            <div class="input-group" style="display: flex">
              <div style="flex: 1">
                <Multiselect
                  class="sz-dw search-placeholder"
                  v-model="selectedSearchMachines"
                  :options="getMachinesNames"
                  :multiple="true"
                  :disabled="!selectedSearchLine"
                  track-by="machine_id"
                  label="machine_nm"
                  placeholder="Pilih mesin..."
                  :taggable="true"
                  @select="onMachineChange"
                >
                </Multiselect>
              </div>
            </div>
          </div>
        </div>
        <!--row-->
      </div>
      <!--card-->
      <nav aria-label="Page navigation" class="mt-2">
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
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <button class="page-link" @click="goToPage(currentPage + 1)">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
      <table class="table custom-table table-bordered mt-1">
        <thead>
          <tr>
            <th style="width: 5%">No</th>
            <th style="width: 10%">Line</th>
            <th style="width: 15%">Mesin</th>
            <th style="width: 10%">Planning</th>
            <th style="width: 10%">Shift</th>
            <th style="width: 15%">Actual</th>
            <th style="width: 10%">Action</th>
            <th style="width: 15%">Reason</th>
            <th style="width: 15%">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(kuras, index) in paginatedData" :key="index">
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ kuras.line_nm }}</td>
            <td>{{ kuras.machine_nm }}</td>
            <td>{{ kuras.plan_dt }}</td>
            <td>
              <select v-model="plantShift[index]" class="form-select">
                <option value="" disabled selected></option>
                <option value="">Red</option>
                <option value="">White</option>
              </select>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <input
                  type="text"
                  class="form-control"
                  v-model="actualDates[index]"
                  :ref="`actualDate_${index}`"
                  @change="changeStatus(index, kuras.plan_dt)"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="showActualDate(`actualDate_${index}`, index)"
                  >
                    <span class="fa fa-calendar"></span>
                  </button>
                </div>
              </div>
            </td>
            <td>
              <button class="btn btn-sm">
                <i class="fas fa-edit text-primary"></i>
              </button>
              <button class="btn btn-sm">
                <i class="fas fa-trash-alt text-danger"></i>
              </button>
            </td>
            <td>
              <input type="text" class="form-control" />
              <!--v-model="reasonKuras[index]"-->
            </td>
            <td>
              <input
                class="form-control"
                type="text"
                v-model="statusKuras[index]"
                readonly
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import { mapGetters } from 'vuex'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.css'
import moment from 'moment-timezone'

export default {
  name: 'PlanSchedule',
  components: {
    Multiselect,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 15,
      searchResult: [],
      datepickerInstances: {},
      actualDates: [],
      plantShift: [],
      selectedIndex: null,
      statusKuras: [],
      reasonKuras: [],
      selectedSearchLine: null,
      selectedSearchMachines: [],
      selectedSearchMonth: null,
    }
  },
  computed: {
    ...mapGetters(['getPlanKuras', 'getLineNames', 'getMachinesNames']),
    totalPages() {
      const data =
        this.searchResult.length > 0 ? this.searchResult : this.getPlanKuras
      return Math.ceil(data.length / this.pageSize)
    },
    paginatedData() {
      const data =
        this.searchResult.length > 0 ? this.searchResult : this.getPlanKuras
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = this.currentPage * this.pageSize
      return data.slice(startIndex, endIndex)
    },
  },

  mounted() {
    this.$store.dispatch('fetchPlanKuras')
    this.$store.dispatch('fetchLines')
  },

  methods: {
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return
      this.currentPage = page
    },
    showActualDate(refName, index) {
      console.log('refName:', refName)
      this.selectedIndex = index
      const datePickerInput = this.$refs[refName] // Access ref directly

      if (!datePickerInput) {
        console.error(`Datepicker reference '${refName}' not found`)
        return
      }

      if (!this.datepickerInstances) {
        this.datepickerInstances = {} // Initialize if not already
      }

      if (!this.datepickerInstances[refName]) {
        this.datepickerInstances[refName] = flatpickr(datePickerInput, {
          dateFormat: 'Y-m-d',
          onChange: (selectedDates) => {
            if (selectedDates.length > 0) {
              const selectedDate = moment(selectedDates[0]).format('YYYY-MM-DD')
              this.actualDates[this.selectedIndex] = selectedDate
              this.changeStatus(
                this.selectedIndex,
                this.paginatedData[this.selectedIndex].plan_dt,
              ) // Update status after date change
            }
          },
        })
        // Ensure the datepicker opens immediately after initialization
        setTimeout(() => {
          this.datepickerInstances[refName].open()
        }, 100) // Adjust as needed
      } else {
        if (this.actualDates[this.selectedIndex]) {
          this.datepickerInstances[refName].setDate(
            this.actualDates[this.selectedIndex],
          )
        }
        // Ensure the datepicker opens immediately
        setTimeout(() => {
          this.datepickerInstances[refName].open()
        }, 100) // Adjust as needed
      }
    },

    changeStatus(index, plan_dt) {
      const actualDate = moment(this.actualDates[index])
      console.log('actualDate:', actualDate)
      const planningDate = moment(plan_dt)
      console.log('planningDate:', planningDate)

      const isAfterPlanningMonth = actualDate.isAfter(planningDate, 'month')

      if (isAfterPlanningMonth) {
        this.statusKuras[index] = 'Delayed'
      } else {
        this.statusKuras[index] = 'On Schedule'
      }

      // Trigger reactivity manually by creating a new array reference
      this.statusKuras = [...this.statusKuras]

      console.log('this.statusKuras:', this.statusKuras)
    },
    onLineChange(inputType) {
      if (inputType === 'selectedSearchLine' && this.selectedSearchLine) {
        this.$store.dispatch('fetchMachines', this.selectedSearchLine.line_id)
      }
    },
  },
}
</script>
