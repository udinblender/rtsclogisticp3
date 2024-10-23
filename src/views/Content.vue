<template>
  <div>
    <h1>Content</h1>
    <button v-on:click="function1">Click</button>
  </div>
</template>

<script>
export default {
  name: 'Content',
  components: {},
  methods: {
    function1() {
      alert('Success')
      console.log('data.module')
    },
  },
}
</script>
