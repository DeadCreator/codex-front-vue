<script>

//
// eslint-disable-next-line no-undef


export default {
  name: "ImageCanvas",
  props: {
    imageSrc: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "black",
    },
    isBlurring: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 25,
    },
    iteration: {
      type: Number,
      default: 0,
    },
    loadFromStorage: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['getImageUrl', 'new-edit', 'reset-storage'],
  data() {
    return {
      canvas: null,
      context: null,
      ground: null,
      isDrawing: false,
    }
  },
  watch: {
    imageSrc(newValue) {
      localStorage.clear()
      localStorage.setItem(`edit-0`, newValue)
      this.$emit('reset-storage')
      const image = new Image();
      image.src = newValue
      image.addEventListener("load", () => {
        this.drawOnImage(image)
      })
    },
    iteration(newValue) {
      console.log("why")
      if (this.loadFromStorage) {
        const imageUrl = localStorage.getItem(`edit-${newValue}`)
        const img = new Image();
        img.src = imageUrl
        img.addEventListener("load", () => {
          this.drawOnImage(img)
        })
      }
    }
  },
  methods: {
    drawOnImage(image = null) {
      // if an image is present,
      // the image passed as a parameter is drawn in the canvas
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
      if (this.imageSrc) {
        this.isDrawing = true
        this.draw(e)
      }
    },
    stopDrawing() {
      if (this.isDrawing) {
        this.isDrawing = false
        this.imageUrl = this.canvas.toDataURL("image/png")
        this.$emit("getImageUrl", this.imageUrl)
        localStorage.setItem(`edit-${this.iteration + 1}`, this.imageUrl)
        this.$emit('new-edit')
      }
    },
    draw(e) {
      if (this.isDrawing) {
        const posX = e.pageX - this.canvas.offsetLeft;
        const posY = e.pageY - this.canvas.offsetTop;

        this.context.beginPath();
        this.context.lineWidth = this.size / 5;
        this.context.strokeStyle = this.color;
        this.context.lineJoin = "round";
        this.context.lineCap = "round";
        this.context.moveTo(posX, posY);

        if (this.isBlurring) {
          this.applyBlur(posX, posY);
        } else {
          this.context.lineTo(posX, posY);
          this.context.stroke();
        }
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
  <div ref="shit" class="ground">
    <canvas @mousedown="startDrawing"
            @mousemove="draw"
            @mouseleave="stopDrawing"
            @mouseup="stopDrawing" id="canvas"></canvas>
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