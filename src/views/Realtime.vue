<template>
  <div>
    <WidgetsStatsTypeA />
    <Stockpage />
    <WidgetsStatsTypeD />
    <!-- <InputIcon />
    <Pagination />
    <Pagination2 />
 
    <SingleSpaStyle />
    <StandAloneStyle />
    <Stockpage />   
    <TreeItem /> -->
  </div>
</template>

<script>
import Widgetsnew from './widgets/Widgetsnew.vue'
import WidgetsStatsD from './widgets/WidgetsStatsTypeD.vue'
import Stockpage from '@/components/Stockpage.vue'
import WidgetsStatsTypeA from '@/views/widgets/WidgetsStatsTypeA.vue'
import WidgetsStatsTypeD from '@/views/widgets/WidgetsStatsTypeD.vue'
// import InputIcon from '@/components/InputIcon.vue'
// import Pagination from '@/components/Pagination.vue'
// import Pagination2 from '@/components/Pagination2.vue'
// import SelectWSearch from '@/components/SelectWSearch.vue'
// import SingleSpaStyle from '@/components/SingleSpaStyle.vue'
// import StandAloneStyle from '@/components/StandAloneStyle.vue'
// import TreeItem from '@/components/TreeItem.vue'


export default {
  name: 'realtime',
  components: {
    Stockpage,
    WidgetsStatsTypeA,
    WidgetsStatsTypeD,
    // Pagination,
    // Pagination2,
    // SelectWSearch,
    // SingleSpaStyle,
    // StandAloneStyle,
    // TreeItem,
  },
}
</script>
