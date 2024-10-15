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
                 @getImageUrl="(saveUrl) => imageSaveUrl = saveUrl"
                 @new-edit="iteration++"
                 @reset-storage="iteration = 0; loadFromStorage = false"

    ></ImageCanvas>
    <EditPanel :image-save-url="imageSaveUrl"
               :is-blurring="isBlurring"
               :size="size"
               :iteration="iteration"
               @imageUploaded="(uri) => {imageUrl = uri; }"
               @colorChanged="(newColor) => color = newColor"
               @tool-changed="(state) => isBlurring = state"
               @size-changed="(newSize) => size = newSize"
               @undo-image="iteration > 0 ? iteration-- : iteration; loadFromStorage = true"
               @redo-image="iteration < iterMax ? iteration++ : iteration"
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