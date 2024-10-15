<script>

import UIButton from "@/components/UI/UIButton.vue";
import UIH2 from "@/components/UI/UIH2.vue";

export default {
  name: "EditPanel",
  components: {
    UIButton, UIH2
  },
  props: {
    imageSaveUrl: {
      type: String,
      default: "",
    },
    isBlurring: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 25
    },
    iteration: {
      type: Number,
      default: 0,
    }
  },
  emits: [
      'image-uploaded', 'color-changed',
    'tool-changed', 'size-changed',
      'undo-image', 'redo-image',

  ],
  data() {
    return {
      colors: ['red', 'yellow', 'lime', 'deepskyblue', 'purple', 'black', 'white'],
    }
  },
  methods: {
    async imageUpload(e) {
      const file = e.target.files[0];
      if (file) {
        const uri = await this.fileToDataUri(file)
        this.$emit("image-uploaded", uri)
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
    saveImage(imageHref) {
      const saveBtn = document.getElementById("save");
      saveBtn.href = imageHref
      saveBtn.download = "EternalImage"
    },
  }
}

</script>

<template>
  <div class="edit-panel">
    <u-i-h2>Tool</u-i-h2>
    <div class="tools">
      <u-i-button @click="$emit('tool-changed', false)" id="brush-tool">Brush</u-i-button>
      <u-i-button @click="$emit('tool-changed', true)" id="blur-tool">Blur</u-i-button>
    </div>
    <u-i-h2 v-bind:class ="isBlurring ? 'hide ' : 'nothing'">Color</u-i-h2>
    <div v-bind:class="isBlurring ? 'hide' : 'nothing'" class="colors color-scheme">
      <button @click="$emit('color-changed', color)" v-for="color in colors" :key="color" :class="color"></button>
    </div>
    <u-i-h2>Size</u-i-h2>
    <label class="brush-size">
      <input @change="(e) => {$emit('size-changed', e.target.value)}"
             id="tool-size" :value="this.size" min="10" max="100" type="range">
    </label>
    <div class="controls">
      <label>Upload Image
        <input @change="imageUpload" id="file-input" type="file">
      </label>
      <a download="" id="save" @click="saveImage(imageSaveUrl)">Save</a>
      <u-i-button @click="$emit('undo-image')">Undo</u-i-button>
      <u-i-button @click="$emit('redo-image')">Redo</u-i-button>
    </div>
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