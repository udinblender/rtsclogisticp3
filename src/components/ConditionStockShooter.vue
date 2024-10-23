<template>
  <div class="text-center" style="background-color: none">
    <CCard>
      <CListGroup
        style="
          font-size: 2rem;
          background-color: #aa0000;
          color: #ffffff;
          font-weight: bold;
        "
      >
        <div>Condition Stock In Shooter</div>
      </CListGroup>

      <CCardBody
        style="
          height: 27vh;
          font-size: 5rem;
          background-color: #e0e0e0;
          color: black;
        "
      >
        <CCardText style="color: black; margin:4rem 0">{{ condStock }}Hours</CCardText>
      </CCardBody>

      <CListGroup
        flush
        style="background-color: #aa0000; font-size: 2rem; color: white"
      >
        <CCardText @click="function1">STD:{{ condStd }}Hours</CCardText>
      </CListGroup>
    </CCard>
  </div>
</template>

<script>
export default {
  name: 'condStockShooter',
  props: {
    condStock: '',
    condStd: '',
  },
  data() {
    return {
      something: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
    }
  },
  fncColor() {
    console.log('helconstock')
  },
  components: {},
}
</script>
