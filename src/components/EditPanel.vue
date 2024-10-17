<script>

import UIButton from "@/components/UI/UIButton.vue";
import UIH2 from "@/components/UI/UIH2.vue";
import {useImageStore} from "@/stores/ImageStore";
import {mapState} from "pinia";

export default {
  name: "EditPanel",
  components: {
    UIButton, UIH2
  },
  computed: {
    ...mapState(useImageStore, ['iteration']),
    ...mapState(useImageStore, ['imageEdits']),
    ...mapState(useImageStore, ['isBlurring']),
  },
  data() {
    return {
      colors: ['red', 'yellow', 'lime', 'deepskyblue', 'purple', 'black', 'white'],
    }
  },
  methods: {
    useImageStore,
    async imageUpload(e) {
      const file = e.target.files[0];
      if (file) {
        const uri = await this.fileToDataUri(file)
        const store = useImageStore()
        store.updateUrl(uri)
        store.newUploaded(true)
      }
    },
    fileToDataUri(field) {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          resolve(reader.result);
        });

        reader.readAsDataURL(field);
      });
    },
    saveImage() {
      const saveBtn = document.getElementById("save");
      const store = useImageStore();
      saveBtn.href = store.imgUrl
      saveBtn.download = "EternalImage" + Math.floor(new Date().getTime() / 1000)
    },
    undoCanvas(multiplier) {
      if (this.iteration > 0) {
        const store = useImageStore();
        store.updateIteration(multiplier);
      }
    },
    redoCanvas(multiplier) {
      if (this.imageEdits.length > this.iteration + 1) {
        const store = useImageStore();
        store.updateIteration(multiplier);
      }
    }
  }
}

</script>

<template>
  <div class="edit-panel">
    <u-i-h2>Tool</u-i-h2>
    <div class="tools">
      <u-i-button @click="() => {useImageStore().updateMode(false)}" id="brush-tool">Brush</u-i-button>
      <u-i-button @click="() => {useImageStore().updateMode(true)}" id="blur-tool">Blur</u-i-button>
    </div>
    <u-i-h2 v-bind:class ="isBlurring ? 'hide ' : 'nothing'">Color</u-i-h2>
    <div v-bind:class="isBlurring ? 'hide' : 'nothing'" class="colors color-scheme">
      <button @click="() => {useImageStore().updateColor(color)}" v-for="color in colors" :key="color" :class="color"></button>
    </div>
    <u-i-h2>Size</u-i-h2>
    <label class="brush-size">
      <input @change="(e) => {useImageStore().updateSize(e.target.value)}"
             id="tool-size" :value="this.size" min="10" max="100" type="range">
    </label>
    <div class="controls">
      <label>Upload Image
        <input @change="imageUpload" id="file-input" type="file">
      </label>
      <a download="" id="save" @click="saveImage()">Save</a>
      <u-i-button @click="undoCanvas(-1)">Undo</u-i-button>
      <u-i-button @click="redoCanvas(1)">Redo</u-i-button>
    </div>
<!--    {{ imageEdits }}-->
  </div>
</template>

<style scoped>
  .edit-panel {
    background-color: #22222e;
    width: 50%;
    padding: 0 25%;
  }

  .edit-panel .tools {
    display: flex;
    gap: 1vw;
  }

  .edit-panel .tools button:active {
    background-color: #34344a;
  }

  .controls {
    margin-top: 2vw;
    margin-bottom: 2vw;
    display: flex;
    justify-content: space-between;
  }

  .controls label,
  .controls a {
    background-color: #34344a;
    padding: 0.5vw 0.7vw;
    border-radius: 15px;
    font-size: 1vw;
    transition: transform 0.5s;
    font-family: "Calibri", serif;
    font-weight: 500;
    border: solid 2px transparent;
    color: white;
    text-decoration: none;
  }

  .controls label:hover,
  .controls a:hover {
    cursor: pointer;
    color: deepskyblue;
    border-color: deepskyblue;
  }

  .edit-panel .controls a:hover {
    color: deepskyblue;
    background-color: white;
  }

  input[type=range] {
    width: 100%;
  }

  .controls input[type="file"] {
    position: absolute;
    z-index: -1;
    opacity: 0;
    display: block;
    width: 0;
    height: 0;
  }

  .colors {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    column-gap: 0.7vw;
    z-index: 0;
    position: relative;
    transition: all 0.3s
  }

  .colors button {
    width: 8%;
    aspect-ratio: 1/1;
    background-color: red;
    border-radius: 35%;
    transition: transform 0.3s;
    border: none;

  }

  .colors .yellow {
    background-color: yellow;
  }

  .colors .lime {
    background-color: lime;
  }

  .colors .deepskyblue {
    background-color: deepskyblue;
  }

  .colors .purple {
    background-color: purple;
  }

  .colors .black {
    background-color: black;
  }

  .colors .white {
    background-color: white;
  }

  .colors button:hover {
    cursor: pointer;
    transform: scale(1.05);
    -webkit-backface-visibility: hidden; /* Chrome, Safari, Opera */
    backface-visibility: hidden;
  }

  .hide {
    opacity: 0;
    margin-bottom: -2.5vw;
  }



</style>