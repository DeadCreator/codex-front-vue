import {defineStore} from "pinia";

export const useImageStore = defineStore('images', {
    state: () => {
        return {
            iteration: 0,
            imgUrl: "",
            imageEdits: [],
            isDrawing: false,
            isBlurring: false,
            newUpload: false,
            color: "black",
            colors: ['#ff4c4c', '#ffe629', '#10f549', '#35a4ff', '#a467ff', 'black', 'white'],
            size: "50",
        }
    },
    actions: {
        newUploaded(value) {
            this.newUpload = value
        },
        removeRedos() {
            while ((this.imageEdits.length - this.iteration) > 1) {
                this.imageEdits.pop()
            }
        },
        resetEdits() {
            this.imageEdits = []
            this.iteration = 0
        },
        switchDrawing(value) {
            this.isDrawing = value
        },
        updateColor(color) {
            this.color = color
        },
        updateIteration(point) {
            this.iteration += point
        },
        updateImageEdits(index, editUrl) {
            this.imageEdits[index] = editUrl
        },
        updateMode(value) {
            this.isBlurring = value
        },
        updateSize(size) {
            this.size = size
        },
        updateUrl(newUrl) {
            this.imgUrl = newUrl
        },


    }
})