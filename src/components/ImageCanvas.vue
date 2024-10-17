<script>

import {useImageStore} from "@/stores/ImageStore";
import {mapState} from "pinia";

export default {
  name: "ImageCanvas",
  computed: {
    ...mapState(useImageStore, ['imgUrl']),
    ...mapState(useImageStore, ['imageEdits']),
    ...mapState(useImageStore, ['isDrawing']),
    ...mapState(useImageStore, ['isBlurring']),
    ...mapState(useImageStore, ['iteration']),
    ...mapState(useImageStore, ['newUpload']),
    ...mapState(useImageStore, ['color']),
    ...mapState(useImageStore, ['size']),
  },
  data() {
    return {
      canvas: null,
      context: null,
      ground: null,
    }
  },
  watch: {
    imgUrl() {
      const store = useImageStore();
      if (this.newUpload) {
        store.resetEdits()

        const image = new Image();
        image.src = this.imgUrl
        image.addEventListener("load", () => {
          this.drawOnImage(image)
          store.updateImageEdits(0, this.canvas.toDataURL("image/png"))
        })
        store.newUploaded(false)
      } else {
        store.updateImageEdits(this.iteration, this.imgUrl)
      }
    },
    iteration() {
      const store = useImageStore();
      const image = new Image();
      image.src = this.imageEdits[this.iteration];
      image.onload = () => {
        this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
        store.updateUrl(this.canvas.toDataURL("image/png"))
      }
    },
  },
  methods: {
    drawOnImage(image = null) {
      if (image) {
        const ratio = image.width / image.height;
        const imageHeight = this.ground.clientHeight
        const imageWidth = imageHeight * ratio;
        // rescaling the canvas element
        this.canvas.height = imageHeight
        this.canvas.width = imageWidth;
        this.context.drawImage(image, 0, 0, imageWidth, imageHeight);
      }
    },
    applyBlur(x, y) {
      const radius = this.size /16; // Радиус размытия
      const imageData = this.context.getImageData(
          x - radius,
          y - radius,
          radius * 2 + 1,
          radius * 2 + 1
      );

      // Создаем временный canvas для размытия
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = radius * 2 + 1;
      tempCanvas.height = radius * 2 + 1;

      const tempCtx = tempCanvas.getContext("2d");

      // Рисуем на временном canvas
      tempCtx.putImageData(imageData, 0, 0);

      // Применяем размытие (например, Gaussian Blur)
      tempCtx.globalAlpha = 0.5; // Уровень прозрачности для эффекта размытия
      tempCtx.drawImage(
          tempCanvas,
          -radius / 4,
          -radius / 4,
          radius * 2.5,
          radius * 2.5
      );

      // Получаем данные изображения с размытого canvas и накладываем их обратно на основной canvas
      const blurredData = tempCtx.getImageData(
          0,
          0,
          tempCanvas.width,
          tempCanvas.height
      );

      const r = radius * 2 + 1

      const centerX = Math.floor(r / 2);
      const centerY = Math.floor(r / 2);
      const blurData = blurredData.data
      const imagePixels = imageData.data

      for (let i = 0, j = 0; i < blurData.length; i+=4, j++) {
        const px_x = j % r
        const px_y = Math.floor(j / r)
        if (!((px_x - centerX) ** 2 + (px_y - centerY) ** 2 <= radius ** 2)) {
          blurData[i] = imagePixels[i]
          blurData[i + 1] = imagePixels[i + 1]
          blurData[i + 2] = imagePixels[i + 2]
          blurData[i + 3] = imagePixels[i + 3]
        }
      }

      // Накладываем размытие на основной canvas
      this.context.putImageData(blurredData, x - radius, y - radius);
    },
    startDrawing(e) {
      if (this.imgUrl) {
        const store = useImageStore();
        store.switchDrawing(true)
        const posX = e.pageX - this.canvas.offsetLeft;
        const posY = e.pageY - this.canvas.offsetTop;

        this.context.beginPath();
        this.context.lineWidth = this.size / 5;
        this.context.strokeStyle = this.color;
        this.context.lineJoin = "round";
        this.context.lineCap = "round";
        this.context.moveTo(posX, posY);
        this.draw(e)
      }
    },
    stopDrawing() {
      if (this.isDrawing) {
        const store = useImageStore();
        store.switchDrawing(false)
        store.updateIteration(1)
        store.updateUrl(this.canvas.toDataURL("image/png"))
        store.updateImageEdits(this.iteration, this.canvas.toDataURL("image/png"))
        store.removeRedos()
      }
    },
    draw(e) {
      if (this.isDrawing) {
        const posX = e.pageX - this.canvas.offsetLeft;
        const posY = e.pageY - this.canvas.offsetTop;

        if (this.isBlurring) {
          this.applyBlur(posX, posY);
        } else {
          this.context.stroke();
        }
        this.context.lineTo(posX, posY);

      }
    },
  },
  mounted() {
    this.canvas = document.getElementById("canvas")
    this.context = this.canvas.getContext("2d")
    this.ground = document.querySelector(".ground")
  }
}

</script>

<template>
  <div class="ground">
    <canvas @mousedown="startDrawing"
            @mousemove="draw"
            @mouseleave="stopDrawing"
            @mouseup="stopDrawing"
            id="canvas">
    </canvas>
  </div>
</template>

<style scoped>
  .ground {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rebeccapurple;
    aspect-ratio: 16/9;
    width: 100%;
  }
</style>