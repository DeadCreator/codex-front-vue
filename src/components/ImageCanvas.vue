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
      circle: null,
      ground: null,
      kernel: [
          [0.0625, 0.125, 0.0625],
          [0.125, 0.25, 0.125],
          [0.0625, 0.125, 0.0625],
      ]
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
      const sizeRoot = Math.floor(Math.sqrt(this.size))
      const d = sizeRoot % 2 === 0 ?
          (sizeRoot + 1) * 3 :
          sizeRoot * 3
      const radius = Math.floor((d - 1) / 2)

      if (x - radius > 0 && y - radius > 0 &&
          this.canvas.width - x - radius > 0 && this.canvas.height - y - radius > 0) {
        const imageData = this.context.getImageData(
            x - radius,
            y - radius,
            d,
            d
        );

        const centerX = Math.floor(d / 2);
        const centerY = Math.floor(d / 2);
        const imagePixels = imageData.data
        const blurredData = this.context.createImageData(d, d)
        blurredData.data.set(imagePixels)
        const blurData = blurredData.data

        for (let j = 4*d; j < imagePixels.length - 4*d; j += 12*d) {
          for (let i = 4; i < (d - 1) * 4; i+=12) {
            const matrix_id = [
              i+j-4-4*d, i+j-4*d, i+j+4-4*d,
              i+j-4,     i+j,     i+j+4,
              i+j-4+4*d, i+j+4*d, i+j+4+4*d
            ]

            const avg0 =
                imagePixels[i-4-4*d+j] * this.kernel[0][0] + imagePixels[i-4*d + 4+j] * this.kernel[0][1] + imagePixels[i-4*d+4 + 8+j] * this.kernel[0][2] +
                imagePixels[i-4+j] * this.kernel[1][0]+ imagePixels[i + 4+j] * this.kernel[1][1] + imagePixels[i+4 + 8+j] * this.kernel[1][2]+
                imagePixels[i+4+4*d+j] * this.kernel[2][0] + imagePixels[i+4*d + 4+j] * this.kernel[2][1] + imagePixels[i+4*d+4 + 8+j] * this.kernel[2][2]

            const avg1 =
                imagePixels[i-4-4*d + 1+j] * this.kernel[0][0] + imagePixels[i-4*d + 5+j] * this.kernel[0][1] + imagePixels[i-4*d+4 + 9+j] * this.kernel[0][2] +
                imagePixels[i-4 + 1+j] * this.kernel[1][0]+ imagePixels[i + 5+j] * this.kernel[1][1] + imagePixels[i+4 + 9+j] * this.kernel[1][2]+
                imagePixels[i+4+4*d + 1+j] * this.kernel[2][0] + imagePixels[i+4*d + 5+j] * this.kernel[2][1] + imagePixels[i+4*d+4 + 9+j] * this.kernel[2][2]

            const avg2 =
                imagePixels[i-4-4*d + 2+j] * this.kernel[0][0] + imagePixels[i-4*d + 6+j] * this.kernel[0][1] + imagePixels[i-4*d+4 + 10+j]  * this.kernel[0][2] +
                imagePixels[i-4 + 2+j] * this.kernel[1][0]+ imagePixels[i + 6+j] * this.kernel[1][1] + imagePixels[i+4 + 10+j] * this.kernel[1][2] +
                imagePixels[i+4+4*d + 2+j] * this.kernel[2][0] + imagePixels[i+4*d + 6+j] * this.kernel[2][1] + imagePixels[i+4*d+4 + 10+j] * this.kernel[2][2]

            const avg3 =
                imagePixels[i-4-4*d + 3+j] * this.kernel[0][0] + imagePixels[i-4*d + 7+j] * this.kernel[0][1] + imagePixels[i-4*d+4 + 11+j]* this.kernel[0][2] +
                imagePixels[i-4 + 3+j] * this.kernel[1][0]+ imagePixels[i + 7+j] * this.kernel[1][1] + imagePixels[i+4 + 11+j] * this.kernel[1][2] +
                imagePixels[i+4+4*d + 3+j] * this.kernel[2][0] + imagePixels[i+4*d + 7+j] * this.kernel[2][1] + imagePixels[i+4*d+4 + 11+j] * this.kernel[2][2]


            matrix_id.forEach(index => {
              blurData[index] = avg0
              blurData[index + 1] = avg1
              blurData[index + 2] = avg2
              blurData[index + 3] = avg3
            })
          }
        }



        for (let i = 0, j = 0; i < blurData.length; i+=4, j++) {
          const px_x = j % d
          const px_y = Math.floor(j / d)

          if (!((px_x - centerX) ** 2 + (px_y - centerY) ** 2 <= radius ** 2)) {
            blurData[i] = imagePixels[i]
            blurData[i + 1] = imagePixels[i + 1]
            blurData[i + 2] = imagePixels[i + 2]
            blurData[i + 3] = imagePixels[i + 3]
          }
        }

        this.context.putImageData(blurredData, x - radius, y - radius);
      }
    },
    startDrawing(e) {
      if (this.imgUrl) {
        this.circle.style.display = 'block';
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
      this.circle.style.display = "none";
    },
    draw(e) {
      const posX = e.pageX - this.canvas.offsetLeft;
      const posY = e.pageY - this.canvas.offsetTop;
      if (this.isDrawing) {
        if (this.isBlurring) {
          this.applyBlur(posX, posY);
        } else {
          this.context.stroke();
        }
        this.context.lineTo(posX, posY);
      }

      this.circle.style.position = 'absolute';
      this.circle.style.display = 'block';
      this.circle.style.left = e.clientX - this.size / 10 + "px"
      this.circle.style.top = e.clientY - this.size / 10 + "px"
    },
  },
  mounted() {
    this.canvas = document.getElementById("canvas")
    this.context = this.canvas.getContext("2d")
    this.ground = document.querySelector(".ground")
    this.circle = document.querySelector(".circle")

    this.canvas.willUpdateFrequently = true
  }
}

</script>

<template>
  <div class="ground">
    <canvas
        @mousemove="draw"
        @mousedown="startDrawing"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
            id="canvas">
    </canvas>
    <div :style="`width: ${this.size / 5}px; height: ${this.size / 5}px`" class="circle"></div>
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

  .circle {
    display: none;
    border-radius: 50%;
    border: solid 1px white;
    left: auto;
    pointer-events: none;
  }

  canvas:hover {
    cursor: none;
  }

</style>