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

      <div class="d-flex" style="height: 34vh">
        <!-- first -->
        <div style="width: 50%; border-right: 1px solid black">
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

          <CCardBody style="height: 65%; background-color: #e0e0e0">
            <CCardText>
              <img
                src="../assets/icons/circle-1.png"
                alt=""
                width="50rem"
                height="50rem"
                style="position: absolute; left: 0; top: 6.5rem"
              />
              <img
                src="../assets/images/truck.png"
                class="sidebar-brand-narrow"
                style="position: absolute; left: 10%; top: 10rem"
                width="30%"
              />
            </CCardText>
          </CCardBody>

          <CListGroup
            flush
            style="background-color: #aa0000; font-size: 2rem; color: white"
          >
            <CCardText>{{ curTime }}Min left</CCardText>
          </CListGroup>
        </div>
        <!-- second -->
        <div style="width: 50%">
          <CListGroup
            flush
            style="
              height: 3rem;
              background-color: orangered;
              font-size: 2rem;
              color: white;
            "
          >
            <CCardText>{{ planTruck }}</CCardText>
          </CListGroup>

          <CCardBody
            style="height: 65%; background-color: #e0e0e0; font-size: 8rem"
          >
            <CCardText>
              <img
                src="../assets/icons/circle-2.png"
                alt=""
                width="50rem"
                height="50rem"
                style="position: absolute; left: 50%; top: 6.5rem"
              />

              <img
                src="../assets/images/truck.png"
                class="sidebar-brand-narrow"
                style="position: absolute; right: 10%; top: 10rem"
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
            <CCardText>{{ planTime }}Min left</CCardText>
          </CListGroup>
        </div>
      </div>
    </CCard>
  </div>
</template>

<script>
import Truck from '@/assets/images/truck.png'
export default {
  name: 'nextTruckDelivery',
  components: {
    Truck,
  },
  props: {
    curTruck: '',
    curTruckDelv: '',
    curTime: '',
    planTruck: '',
    planTruckDelv: '',
    planTime: '',
  },
}
</script>
