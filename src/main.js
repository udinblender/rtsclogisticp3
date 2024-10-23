

import './set-public-path'
import { h, createApp } from 'vue'
import singleSpaVue from 'single-spa-vue'

import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import VueSweetalert2 from 'vue-sweetalert2'
import vSelect from 'vue-select'
import './styles/sweetalert2.css'
import 'vue-select/dist/vue-select.css'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
if(process.env.VUE_APP_STANDALONE_SINGLE_SPA==='true'){
  require('@/components/StandAloneStyle.vue');
}else{
  require('@/components/SingleSpaStyle.vue')
}
const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecycle-props
        // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
        /*
        name: this.name,
        mountParcel: this.mountParcel,
        singleSpa: this.singleSpa,
        */
      })
    },
  },
  handleInstance(app) {
    app.use(router)
    app.use(store)
    app.use(CoreuiVue)
    app.provide('icons', icons)
    app.use(VueSweetalert2)
    app.component('CIcon', CIcon)
    app.component('v-select', vSelect)
    app.use(HighchartsVue, {
      highcharts: Highcharts
    })
    app.use(VCalendar, {})
  },
})

export const bootstrap = vueLifecycles.bootstrap
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount
