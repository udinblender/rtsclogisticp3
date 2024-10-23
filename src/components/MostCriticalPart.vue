<template>
<component :is="currentComponent"></component>
</template>

<script>
import PartUnder20Minutes from './PartUnder20Minutes.vue'
import PartUnder60Minutes from './PartUnder60Minutes.vue'
import PartAbove60Minutes from './PartAbove60Minutes.vue'
import data from '@/standalone/components/data.vue'
import { CChartBar } from '@coreui/vue-chartjs'

export default {
  name: 'mostCriticalPart',
  components: { data,
    PartUnder20Minutes,
    PartUnder60Minutes,
    PartAbove60Minutes,
   },
   data() {
    return {
      components: ['PartUnder20Minutes', 'PartUnder60Minutes', 'PartAbove60Minutes'],
      currentIndex: 0,
    };
  },
  computed: {
    currentComponent() {
      return this.components[this.currentIndex];
    },
  },
  mounted() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.components.length;
    }, 5000);
  },
 
}
</script>
