# codex-front-vue

### Web Image Editor - CodeX Test Task

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

# How To Use

## Image Editor
Main component of the app, containing EditPanel and ImageCanvas components. This component is inner container, which store main data and connect canvas with panel

## Edit Panel
Control panel of the tool.
### Tools (Modes)
There are two basic modes: Brushing (Brush button) and Blurring (Blur button)
- In Brushing mode there are available 7 default colors of the brush, which you can choose by tapping on appropriate button
- In Blurring mode the color is only one - Blur effect. By tapping/clicking on the image, the space in selected radius will be blurred using special blur algorithm
In both modes The User can select size of the tool by appropriate range input
### Control buttons
Below size control there are 4 buttons to manage your image editing
- Upload Button. Simply choose which file to upload
- Save Button. Simply save completed file with name "EternalImage.png" (custom filename will be added in next updates)
- Undo Button. Return back to previous edit
- Redo Button. Return back to next edit
## Image Canvas
Canvas, where the image is edited. The size of component depends on user's screen, but has fixed ratio - 16 / 9. So every image uploaded will be resized to fit canvas element.


