<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-5">
            <h6>PT.TOYOTA MOTOR MANUFACTURING INDONESIA</h6>
            <h6>ENGINE PRODUCTION KARAWANG DIVISION</h6>
            <h6>ENGINEERING SERVICE DEPARTMENT</h6>
          </div>
          <div class="col-5 align-self-center">
            <h3>ASSIGNMENT MAN POWER</h3>
          </div>
          <div class="col-2 d-flex align-items-center justify-content-end">
            <input
              class="form-control"
              v-model="todaydate"
              type="text"
              readonly
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="card">
      <div class="card-body" style="position: relative">
        <img
          class="card-img-top"
          src="../assets/images/Mapping Assessment Board card.jpg"
          alt="Mapping Assessment Board"
          height="600px"
        />
        <PositionCard
          v-for="position in positions"
          :key="position.key"
          :position="position"
          :selectedEmployee="selectedEmployees[position.key]"
          :employees="employees"
          @show-popover="showPopover"
          @hide-popover="hidePopover"
          @update:selected-employee="
            (employee) => updateSelectedEmployee(position.key, employee)
          "
        />

        <Popover
          v-for="position in positions"
          :key="position.key"
          :position="position"
          :visible="popovers[position.key]"
          :style="{ top: position.popoverTop, left: position.popoverLeft }"
        />
      </div>
    </div>
  </div>
  <Struktur />
</template>

<script>
import Struktur from '../standalone/components/Struktur.vue'
import PositionCard from './PositionCard.vue'
import Popover from './Popover.vue'
import { mapGetters } from 'vuex'
import moment from 'moment-timezone'
import { reactive, toRefs } from 'vue'

export default {
  name: 'MappingJob',
  components: {
    Struktur,
    PositionCard,
    Popover,
  },
  setup() {
    const state = reactive({
      todaydate: '',
      popovers: {
        NC: false,
        GL: false,
        QC: false,
        WnD: false,
        SnO: false,
      },
      selectedEmployees: {
        GL: null,
        NC: null,
        QC: null,
        SettingDelivery: null,
        OilSupply: null,
      },
      positions: [
        {
          key: 'GL',
          top: '7%',
          left: '5%',
          popoverTop: '7%',
          popoverLeft: '11%',
          label: 'GL',
        },
        {
          key: 'TL',
          top: '50%',
          left: '10%',
          popoverTop: '50%',
          popoverLeft: '16%',
          label: 'QC GATE',
          content: [
            '1. 100% check.',
            '2. Input data tool finish regrinding & finish setting.',
            '3. Pendataan tool yang akan direservasi.',
            '4. Mengirim tool out sourching ke gudang.',
            '5. Konfirmasi jika ada pemakaian tool yang over.',
          ],
        },
        {
          key: 'NC',
          top: '35%',
          left: '67%',
          popoverTop: '11%',
          popoverLeft: '55%',
          label: 'POS NC',
          content: [
            '1. Proses rough drill, tap, reamer, endmill dll.',
            '2. pengasahan tool manual (MC, Plank cutter)',
            '3. Proses finishing Drill, Tap, Reamer, Endmill dll.',
            '4. Pengasahan Tool spesial (BC, Ball nose)',
            '5. Konfirmasi kualitas dengan tool regrinding drawing.',
            '6. Check kesesuaian jumlah dan type tool dengan box',
          ],
        },
        {
          key: 'OilSupply',
          top: '75%',
          left: '10%',
          popoverTop: '75%',
          popoverLeft: '16%',
          label: 'SUPPLY OLI',
          content: [
            '1. Pengisian dan pengecekan level oli.',
            '2. Dokumentasi penggunaan oli.',
          ],
        },
        {
          key: 'SettingDelivery',
          top: '55%',
          left: '52%',
          popoverTop: '55%',
          popoverLeft: '58%',
          label: 'DELIVERY & SETTING',
          content: [
            '1. Mengelompokan tool yang akan diregrinding.',
            '2. Mengelompokan tool yang akan direservasi.',
            '3. Memisahkan tool problem.',
            '4. Membersihkan tool, box & check internal coolant.',
            '5. Mengechek "L" minim, jmulah tool & keausan mata potong.',
            '6. Input data tool bekas yang masuk.',
            '7. Menempatkan tool pada rak sesuai jam delivery.',
            '8. Menempatkan tool sesuai lokasi pengerjaanya (regrinding dan setting).',
            '9. Cleaning milling cutter dan membersihkan insert.',
            '10. Mencuci body cutter / washing.',
            '11. Menyeleksi insert yang masih bisa dipakai.',
            '12. menyeting milling cutter(manual, analog, laser)',
            '13. mengganti insert yang kurang.',
          ],
        },
      ],
      employees: [],
    })

    return { ...toRefs(state) }
  },
  computed: {
    ...mapGetters([
      'getCurrentShift',
      'getPositionRedShift',
      'getPositionWhiteShift',
      'getSelectedEmployees',
    ]),
  },
  async created() {
    await this.displayTodayDate()
    await this.$store.dispatch('ambilShift')
    await this.$store.dispatch('fetchEmployeeForSelect')
    await this.$store.dispatch('fetchActualPosition')

    this.selectEmployeesByShift()
    this.fillUnavailablePositions()
    this.defaultPosition()
  },
  methods: {
    fillUnavailablePositions() {
      const actualPositions = this.$store.getters.getActualPosition
      console.log('Actual Positions:', actualPositions) // Menampilkan data actual positions ke konsol

      for (const positionKey in actualPositions) {
        if (
          !this.selectedEmployees[positionKey] &&
          actualPositions[positionKey]
        ) {
          const actualEmployee = { ...actualPositions[positionKey] }
          this.selectedEmployees[positionKey] = actualEmployee
          console.log('Filled position:', positionKey, actualEmployee)
        } else if (
          !this.selectedEmployees[positionKey] &&
          !this.positions.find((position) => position.key === positionKey)
            .default
        ) {
          console.log('Unfilled position with no default:', positionKey)
        } else {
          console.log('Unfilled position:', positionKey)
        }
      }
    },

    displayTodayDate() {
      this.todaydate = moment().format('DD-MM-YYYY')
    },
    selectEmployeesByShift() {
      const currentShift = this.getCurrentShift
      const employeesByShift =
        currentShift === 'Red'
          ? this.getPositionRedShift
          : this.getPositionWhiteShift
      // console.log('getPositionRedShift', this.getPositionRedShift)
      // console.log('getPositionWhiteShift', this.getPositionWhiteShift)
      this.employees = employeesByShift.filter(
        (employee) => employee.status === 'Hadir',
      )
    },
    updateSelectedEmployee(positionKey, employee) {
      // Jika karyawan dipilih dan merupakan objek
      if (employee && typeof employee === 'object') {
        // Periksa apakah karyawan sebelumnya memiliki posisi default yang sama dengan yang dipilih
        const previousDefaultPosition = Object.keys(
          this.selectedEmployees,
        ).find(
          (key) =>
            this.selectedEmployees[key] === employee && key !== positionKey,
        )

        // Atur selectedEmployee sesuai posisi yang dipilih
        this.selectedEmployees[positionKey] = employee
        // Panggil fungsi updatePosition untuk memperbarui posisi
        this.updatePosition(positionKey)

        if (previousDefaultPosition) {
          // Jika ya, kosongkan posisi default sebelumnya
          this.selectedEmployees[previousDefaultPosition] = null
          // Panggil fungsi updatePosition untuk memperbarui posisi default yang dikosongkan
          this.updatePosition(previousDefaultPosition)
        }
      } else {
        console.error('Employee bukan objek:', employee)
        // Jika karyawan tidak mengisi posisinya
        // dan posisi default sebelumnya adalah positionKey
        if (this.selectedEmployees[positionKey] === this.defaultPosition) {
          // Atur default position menjadi null
          this.selectedEmployees[positionKey] = null
          // Panggil fungsi updatePosition dengan default position kosong
          this.updatePosition(positionKey)
        }
      }
    },
    updatePosition(positionKey) {
      const selectedEmployee = this.selectedEmployees[positionKey]
      // console.log('selectedEmployee', selectedEmployee)
      if (!selectedEmployee) {
        // alert(`Tidak ada karyawan yang dipilih untuk posisi ${positionKey}`)
        return
      }
      const date_pos = moment().tz('Asia/Jakarta').format('YYYY-MM-DD')
      const payload = {
        employee_id: selectedEmployee.employee_id,
        nama: selectedEmployee.nama,
        noreg: selectedEmployee.noreg,
        posisi: positionKey,
        date_assign: date_pos,
        photourl: selectedEmployee.photourl,
        jabatan: selectedEmployee.jabatan,
      }
      // console.log('payload', payload)
      this.$store.dispatch('updatePositionEmployee', payload)
      alert(`Pos ${positionKey} berhasil dikirim`)
    },

    defaultPosition() {
      const currentShift = this.getCurrentShift
      const employeesWithCurrentShift =
        currentShift === 'Red'
          ? this.getPositionRedShift
          : this.getPositionWhiteShift
      for (const employee of employeesWithCurrentShift) {
        if (employee.status === 'Hadir') {
          this.selectedEmployees[employee.default_position] = employee
        }
      }
    },
    showPopover(positionKey) {
      this.popovers[positionKey] = true
    },
    hidePopover(positionKey) {
      this.popovers[positionKey] = false
    },
    actualPosition() {
      this.$store.dispatch('fetchActualPosition')
    },
  },
}
</script>

<style scoped>
input.form-control {
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  background-color: none;
  font-size: x-large;
}
</style>
