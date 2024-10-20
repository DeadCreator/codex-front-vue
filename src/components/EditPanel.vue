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
    ...mapState(useImageStore, ['size']),
    ...mapState(useImageStore, ['colors']),
    ...mapState(useImageStore, ['color']),
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
      <button @click="() => {useImageStore().updateColor(color)}" v-for="color in this.colors" :key="color" :class="{active: color === this.color}" :style="`background-color: ${color};`"></button>
    </div>
    <u-i-h2>Size</u-i-h2>
    <label class="brush-size">
      <input @change="(e) => {useImageStore().updateSize(e.target.value); console.log(e.target.value)}"
             id="tool-size" :value="this.size" min="40" max="120" type="range">
    </label>
    <div class="controls">
      <label>Upload Image
        <input @change="imageUpload" id="file-input" type="file">
      </label>
      <a download="" id="save" @click="saveImage()">Save</a>
      <u-i-button @click="undoCanvas(-1)">
        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.77778 7.3889L1 4.61112L3.77778 1.83334M1 4.61112H8.63889C9.3756 4.61112 10.0821 4.90378 10.6031 5.42471C11.124 5.94565 11.4167 6.65219 11.4167 7.3889C11.4167 8.12561 11.124 8.83215 10.6031 9.35308C10.0821 9.87402 9.3756 10.1667 8.63889 10.1667H7.94444" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </u-i-button>
      <u-i-button @click="redoCanvas(1)">
        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.22222 7.3889L12 4.61112L9.22222 1.83334M12 4.61112H4.36111C3.6244 4.61112 2.91786 4.90378 2.39693 5.42471C1.87599 5.94565 1.58333 6.65219 1.58333 7.3889C1.58333 8.12561 1.87599 8.83215 2.39693 9.35308C2.91786 9.87402 3.6244 10.1667 4.36111 10.1667H5.05556" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </u-i-button>
    </div>
<!--    {{ imageEdits }}-->
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
  .edit-panel {
    background-color: #282c34;
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
    gap: 1vw;
  }

  svg {
    width: 85%;
    height: 85%;
  }

  .controls label,
  .controls a {
    border: solid 2px #1c84ff;
    background-color: #1c84ff;
    padding: 0.5vw;
    border-radius: 5px;
    font-size: 1vw;
    transition: transform 0.5s;
    font-family: "Inter", serif;
    font-weight: 400;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .controls label:hover,
  .controls a:hover {
    cursor: pointer;
    border-color: deepskyblue;
    background-color: deepskyblue;
  }


  input[type=range] {
    width: 100%;
  }

  input[type=range]:hover {
    cursor: pointer;
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
    background-color: #ff4c4c;
    border-radius: 35%;
    transition: transform 0.3s;
    border: none;

  }

  .colors button:hover {
    cursor: pointer;
    -webkit-backface-visibility: hidden; /* Chrome, Safari, Opera */
    backface-visibility: hidden;
  }

  .hide {
    opacity: 0;
    margin-bottom: -2.5vw;
  }

  .active {
    transform: scale(1.3);
  }



</style>