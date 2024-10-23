<template>
  <div>
<MostCriticalPart/>
  </div>
</template>

<script>
import ConditionStock from '@/components/ConditionStock.vue';
import MostCriticalPart from '@/components/MostCriticalPart.vue';

export default {
    name: 'home',
    component: {
MostCriticalPart,
    }
}
</script>