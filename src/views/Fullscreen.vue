<template>
    <div>
  <MostCriticalPart/>
  <div class="d-flex flex-row justify-content-around">
  
    <ConditionStock/>
   
  
      <CounterPline/>
  <a href="/app/master/Fullscreen">click</a>
  </div>
    </div>
  </template>
  
  <script>
  import ConditionStock from '@/components/ConditionStock.vue';
  import CounterPline from '@/components/CounterPline.vue';
  import MostCriticalPart from '@/components/MostCriticalPart.vue';
  
  export default{
    name:'fullscreen',
    components:{
      CounterPline,
      MostCriticalPart,
      ConditionStock
    },
  }
  console.log(MostCriticalPart.data().tasks)
  </script>