<template>
  <div class="underdevelopment card">
    <div class="gear-container mt-0">
      <img src="../../assets/images/gear.png" alt="Gear" class="gear" />
    </div>
    <h1>Feature Under Development</h1>
    <p>We are working hard to bring this feature to you. Stay tuned!</p>
  </div>
</template>

<script>
export default {
  name: 'UnderDevelopment',
}
</script>

<style scoped>
.underdevelopment {
  text-align: center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.gear-container {
  display: inline-block;
  margin-bottom: 2px;
}
.gear {
  max-width: 100px;
  animation: spin 4s linear infinite;
}
.underdevelopment h1 {
  font-size: 24px;
  color: #333;
}
.underdevelopment p {
  font-size: 16px;
  color: #666;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
