<script setup>

</script>

<template>
  <h2><slot></slot></h2>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

  h2 {
    font-family: "Inter", serif;
    font-weight: bold;
    margin-top: 1.5vw;
    margin-bottom: 1vw;
    font-size: 1.1vw;
    color: white;
    transition: all 0.3s;
  }
</style>