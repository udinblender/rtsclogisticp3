<template>
  <div class="text-center" style="overflow: hidden">
    <CCard style="overflow: hidden">
      <CListGroup
        style="
          font-size: 2rem;
          color: white;
          background-color: #aa0000;
          color: #ffffff;
          font-weight: bold;
        "
      >
        <div>Next Truck Delivery</div>
      </CListGroup>

      <div class="d-flex" >
        <!-- first -->
        <div style="width: 100%">
          <CListGroup
            flush
            style="
              height: 3rem;
              background-color: orangered;
              font-size: 2rem;
              color: white;
            "
          >
            <CCardText>{{ curTruck }}</CCardText>
          </CListGroup>

          <CCardBody style="height: 28.5vh ;background-color: #e0e0e0">
            <CCardText>
              <img
                src="../assets/images/truck.png"
                class="sidebar-brand-narrow"
                style="position: absolute; left: 35%; top: 10rem"
                width="30%"
              />
            </CCardText>
          </CCardBody>

          <CListGroup
            flush
            style="
              height: 3rem;
              background-color: #aa0000;
              font-size: 2rem;
              color: white;
            "
          >
            <CCardText>{{ planeTime }} min left</CCardText>
          </CListGroup>
        </div>
      </div>
    </CCard>
  </div>
</template>

<script>
import Truck from '@/assets/images/truck.png'
export default {
  name: 'nextTruckImport',
  components: {
    Truck,
  },
  props: {
    curTruck: '',
  planeTime: '',
  },
}
</script>
