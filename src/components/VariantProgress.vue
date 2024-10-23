<template>
  <div style=" height: 43vh; text-align: center;background-color:none">
    <CCard style="width: 100%">
    <CListGroup
      style="
        font-size: 2rem;
        background-color: #aa0000;
        color:	#ffffff;
        font-weight: bold
      "
    >
      <div>Variant Progress</div>
    </CListGroup>

    <CCardBody
      style="height: 45vh; font-size: 8rem; background-color: #e0e0e0"
    >
      <CCardText>
        <h1 style="padding: 80px 0;  font-size: 5rem;color: black;">{{ variantProgress }}</h1>
      </CCardText>
    </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { CCard } from '@coreui/vue';

export default {
  name: 'VariantProgress',
  props: {
    variantProgress: '',
  },
}
</script>
