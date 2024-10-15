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
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3c213d;
}
</style>
