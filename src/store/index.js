import { createStore } from 'vuex'
import mappingModule from './mappingModule'
import CoolantModule from './CoolantModule'
import EmployeeModule from './EmployeeModule'
import AbsensiModule from './AbsensiModule'
import PlanKurasModule from './PlanKurasModule'
import DashBoardToolModule from './DashBoardToolModule'

import focusInputModule from './TMS/focusInput.module'
import MasterDrawingModule from './MasterDrawingModule'
import DeliveryModule from './Delivery.Module'
import MasterMachineModule from './MasterMachine.module'
import DistributionModule from './Distribution.module'
import SystemModule from './System.module'
import MasterLineModule from './MasterLine.module'
import KanbanFromGel from './KanbanFromGel.module'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {
    EmployeeModule,
    AbsensiModule,
    mappingModule,
    CoolantModule,
    PlanKurasModule,
    DashBoardToolModule,
    MasterDrawingModule,
    DeliveryModule,
    focusInputModule,
    MasterMachineModule,
    DistributionModule,
    SystemModule,
    MasterLineModule,
    KanbanFromGel,
  },
})
