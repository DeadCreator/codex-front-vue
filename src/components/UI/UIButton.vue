<script setup>

</script>

<template>
  <button><slot></slot></button>
</template>

<style scoped>
  button {
    background-color: #34344a;
    padding: 0.5vw 0.7vw;
    border-radius: 15px;
    font-size: 1vw;
    transition: transform 0.5s;
    font-family: "Calibri", serif;
    font-weight: 500;
    border: solid 2px transparent;
    color: white;
  }

  button:hover {
    cursor: pointer;
    color: deepskyblue;
    border-color: deepskyblue;
  }
</style>