<script setup>

</script>

<template>
  <button><slot></slot></button>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

  button {
    background-color: rgba(255, 255, 255, 0.12);
    padding: 0.7vw;
    border-radius: 5px;
    font-size: 1vw;
    transition: transform 0.5s;
    font-family: "Inter", serif;
    font-weight: 400;
    border: solid 1px #32353c;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:hover {
    cursor: pointer;
    color: #1c84ff;
    border-color: #1c84ff;
  }
</style>