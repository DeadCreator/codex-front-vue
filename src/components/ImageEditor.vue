<script>
// eslint-disable-next-line no-unused-vars

import ImageCanvas from "@/components/ImageCanvas.vue";
import EditPanel from "@/components/EditPanel.vue";


export default {
  components: {
    EditPanel, ImageCanvas
  },
  data() {
    return {
      imageUrl: "",
      imageSaveUrl: "",
      origImage: "",
      color: 'black',
      size: 25,
      isBlurring: false,
      iteration: 0,
      iterMax: 0,
      loadFromStorage: false,
    }
  },
}

</script>

<template>
  <div class="image-editor">
    <ImageCanvas></ImageCanvas>
    <EditPanel></EditPanel>
  </div>
</template>

<style scoped>
  .image-editor {
    margin: 10vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
  }
</style>