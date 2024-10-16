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
    <ImageCanvas :image-src="imageUrl"
                 :color="color"
                 :is-blurring="isBlurring"
                 :size="size"
                 :iteration="iteration"
                 :loadFromStorage="loadFromStorage"
                 :origImage="origImage"
                 @getImageUrl="(saveUrl) => imageSaveUrl = saveUrl"
                 @new-edit="iteration++; iterMax = iteration; loadFromStorage = false"
                 @reset-storage="iteration = iterMax = 0"

    ></ImageCanvas>
    <EditPanel :image-save-url="imageSaveUrl"
               :is-blurring="isBlurring"
               :size="size"
               :iteration="iteration"
               @imageUploaded="(uri) => {imageUrl = uri; origImage = uri}"
               @colorChanged="(newColor) => color = newColor"
               @tool-changed="(state) => isBlurring = state"
               @size-changed="(newSize) => size = newSize"
               @undo-image="iteration > 0 ? iteration-- : iteration;
               iteration < iterMax ? loadFromStorage = true : loadFromStorage = false;"
               @redo-image="iteration < iterMax ? iteration++ : iteration;
               iteration <= iterMax ? loadFromStorage = true : loadFromStorage = false;"
    ></EditPanel>
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