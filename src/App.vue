<template>
  <image-editor></image-editor>
</template>

<script>
import ImageEditor from "@/components/ImageEditor.vue";

export default {
  name: 'App',
  components: {
    ImageEditor,
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  user-select: none;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #17191e;
}
</style>
