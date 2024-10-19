(function(){"use strict";var t={601:function(t,e,n){var i=n(5130),a=n(6768);function s(t,e,n,i,s,o){const r=(0,a.g2)("image-editor");return(0,a.uX)(),(0,a.Wv)(r)}const o={class:"image-editor"};function r(t,e,n,i,s,r){const l=(0,a.g2)("ImageCanvas"),d=(0,a.g2)("EditPanel");return(0,a.uX)(),(0,a.CE)("div",o,[(0,a.bF)(l),(0,a.bF)(d)])}const l={class:"ground"};function d(t,e,n,i,s,o){return(0,a.uX)(),(0,a.CE)("div",l,[(0,a.Lk)("canvas",{onMousedown:e[0]||(e[0]=(...t)=>o.startDrawing&&o.startDrawing(...t)),onMousemove:e[1]||(e[1]=(...t)=>o.draw&&o.draw(...t)),onMouseleave:e[2]||(e[2]=(...t)=>o.stopDrawing&&o.stopDrawing(...t)),onMouseup:e[3]||(e[3]=(...t)=>o.stopDrawing&&o.stopDrawing(...t)),id:"canvas"},null,32)])}var u=n(5234);const c=(0,u.nY)("images",{state:()=>({iteration:0,imgUrl:"",imageEdits:[],isDrawing:!1,isBlurring:!1,newUpload:!1,color:"black",size:"30"}),actions:{newUploaded(t){this.newUpload=t},removeRedos(){while(this.imageEdits.length-this.iteration>1)this.imageEdits.pop()},resetEdits(){this.imageEdits=[],this.iteration=0},switchDrawing(t){this.isDrawing=t},updateColor(t){this.color=t},updateIteration(t){this.iteration+=t},updateImageEdits(t,e){this.imageEdits[t]=e},updateMode(t){this.isBlurring=t},updateSize(t){this.size=t},updateUrl(t){this.imgUrl=t}}});var h={name:"ImageCanvas",computed:{...(0,u.aH)(c,["imgUrl"]),...(0,u.aH)(c,["imageEdits"]),...(0,u.aH)(c,["isDrawing"]),...(0,u.aH)(c,["isBlurring"]),...(0,u.aH)(c,["iteration"]),...(0,u.aH)(c,["newUpload"]),...(0,u.aH)(c,["color"]),...(0,u.aH)(c,["size"])},data(){return{canvas:null,context:null,ground:null,kernel:[[.0625,.125,.0625],[.125,.25,.125],[.0625,.125,.0625]]}},watch:{imgUrl(){const t=c();if(this.newUpload){t.resetEdits();const e=new Image;e.src=this.imgUrl,e.addEventListener("load",(()=>{this.drawOnImage(e),t.updateImageEdits(0,this.canvas.toDataURL("image/png"))})),t.newUploaded(!1)}else t.updateImageEdits(this.iteration,this.imgUrl)},iteration(){const t=c(),e=new Image;e.src=this.imageEdits[this.iteration],e.onload=()=>{this.context.drawImage(e,0,0,this.canvas.width,this.canvas.height),t.updateUrl(this.canvas.toDataURL("image/png"))}}},methods:{drawOnImage(t=null){if(t){const e=t.width/t.height,n=this.ground.clientHeight,i=n*e;this.canvas.height=n,this.canvas.width=i,this.context.drawImage(t,0,0,i,n)}},applyBlur(t,e){const n=Math.floor(Math.sqrt(this.size)),i=n%2===0?3*(n+1):3*n,a=Math.floor((i-1)/2);if(t-a>0&&e-a>0&&this.canvas.width-t-a>0&&this.canvas.height-e-a>0){const n=this.context.getImageData(t-a,e-a,i,i),s=Math.floor(i/2),o=Math.floor(i/2),r=n.data,l=this.context.createImageData(i,i);l.data.set(r);const d=l.data;for(let t=4*i;t<r.length-4*i;t+=12*i)for(let e=4;e<4*(i-1);e+=12){const n=[e+t-4-4*i,e+t-4*i,e+t+4-4*i,e+t-4,e+t,e+t+4,e+t-4+4*i,e+t+4*i,e+t+4+4*i],a=r[e-4-4*i+t]*this.kernel[0][0]+r[e-4*i+4+t]*this.kernel[0][1]+r[e-4*i+4+8+t]*this.kernel[0][2]+r[e-4+t]*this.kernel[1][0]+r[e+4+t]*this.kernel[1][1]+r[e+4+8+t]*this.kernel[1][2]+r[e+4+4*i+t]*this.kernel[2][0]+r[e+4*i+4+t]*this.kernel[2][1]+r[e+4*i+4+8+t]*this.kernel[2][2],s=r[e-4-4*i+1+t]*this.kernel[0][0]+r[e-4*i+5+t]*this.kernel[0][1]+r[e-4*i+4+9+t]*this.kernel[0][2]+r[e-4+1+t]*this.kernel[1][0]+r[e+5+t]*this.kernel[1][1]+r[e+4+9+t]*this.kernel[1][2]+r[e+4+4*i+1+t]*this.kernel[2][0]+r[e+4*i+5+t]*this.kernel[2][1]+r[e+4*i+4+9+t]*this.kernel[2][2],o=r[e-4-4*i+2+t]*this.kernel[0][0]+r[e-4*i+6+t]*this.kernel[0][1]+r[e-4*i+4+10+t]*this.kernel[0][2]+r[e-4+2+t]*this.kernel[1][0]+r[e+6+t]*this.kernel[1][1]+r[e+4+10+t]*this.kernel[1][2]+r[e+4+4*i+2+t]*this.kernel[2][0]+r[e+4*i+6+t]*this.kernel[2][1]+r[e+4*i+4+10+t]*this.kernel[2][2],l=r[e-4-4*i+3+t]*this.kernel[0][0]+r[e-4*i+7+t]*this.kernel[0][1]+r[e-4*i+4+11+t]*this.kernel[0][2]+r[e-4+3+t]*this.kernel[1][0]+r[e+7+t]*this.kernel[1][1]+r[e+4+11+t]*this.kernel[1][2]+r[e+4+4*i+3+t]*this.kernel[2][0]+r[e+4*i+7+t]*this.kernel[2][1]+r[e+4*i+4+11+t]*this.kernel[2][2];n.forEach((t=>{d[t]=a,d[t+1]=s,d[t+2]=o,d[t+3]=l}))}for(let t=0,e=0;t<d.length;t+=4,e++){const n=e%i,l=Math.floor(e/i);(n-s)**2+(l-o)**2<=a**2||(d[t]=r[t],d[t+1]=r[t+1],d[t+2]=r[t+2],d[t+3]=r[t+3])}this.context.putImageData(l,t-a,e-a)}},startDrawing(t){if(this.imgUrl){const e=c();e.switchDrawing(!0);const n=t.pageX-this.canvas.offsetLeft,i=t.pageY-this.canvas.offsetTop;this.context.beginPath(),this.context.lineWidth=this.size/5,this.context.strokeStyle=this.color,this.context.lineJoin="round",this.context.lineCap="round",this.context.moveTo(n,i),this.draw(t)}},stopDrawing(){if(this.isDrawing){const t=c();t.switchDrawing(!1),t.updateIteration(1),t.updateUrl(this.canvas.toDataURL("image/png")),t.updateImageEdits(this.iteration,this.canvas.toDataURL("image/png")),t.removeRedos()}},draw(t){if(this.isDrawing){const e=t.pageX-this.canvas.offsetLeft,n=t.pageY-this.canvas.offsetTop;this.isBlurring?this.applyBlur(e,n):this.context.stroke(),this.context.lineTo(e,n)}}},mounted(){this.canvas=document.getElementById("canvas"),this.context=this.canvas.getContext("2d"),this.ground=document.querySelector(".ground"),this.canvas.willUpdateFrequently=!0}},g=n(1241);const p=(0,g.A)(h,[["render",d],["__scopeId","data-v-107d5deb"]]);var f=p,v=n(4232);const m={class:"edit-panel"},k={class:"tools"},w=["onClick"],I={class:"brush-size"},b=["value"],U={class:"controls"};function E(t,e,n,i,s,o){const r=(0,a.g2)("u-i-h2"),l=(0,a.g2)("u-i-button");return(0,a.uX)(),(0,a.CE)("div",m,[(0,a.bF)(r,null,{default:(0,a.k6)((()=>e[7]||(e[7]=[(0,a.eW)("Tool")]))),_:1}),(0,a.Lk)("div",k,[(0,a.bF)(l,{onClick:e[0]||(e[0]=()=>{o.useImageStore().updateMode(!1)}),id:"brush-tool"},{default:(0,a.k6)((()=>e[8]||(e[8]=[(0,a.eW)("Brush")]))),_:1}),(0,a.bF)(l,{onClick:e[1]||(e[1]=()=>{o.useImageStore().updateMode(!0)}),id:"blur-tool"},{default:(0,a.k6)((()=>e[9]||(e[9]=[(0,a.eW)("Blur")]))),_:1})]),(0,a.bF)(r,{class:(0,v.C4)(t.isBlurring?"hide ":"nothing")},{default:(0,a.k6)((()=>e[10]||(e[10]=[(0,a.eW)("Color")]))),_:1},8,["class"]),(0,a.Lk)("div",{class:(0,v.C4)([t.isBlurring?"hide":"nothing","colors color-scheme"])},[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(s.colors,(t=>((0,a.uX)(),(0,a.CE)("button",{onClick:()=>{o.useImageStore().updateColor(t)},key:t,class:(0,v.C4)(t)},null,10,w)))),128))],2),(0,a.bF)(r,null,{default:(0,a.k6)((()=>e[11]||(e[11]=[(0,a.eW)("Size")]))),_:1}),(0,a.Lk)("label",I,[(0,a.Lk)("input",{onChange:e[2]||(e[2]=t=>{o.useImageStore().updateSize(t.target.value),console.log(t.target.value)}),id:"tool-size",value:this.size,min:"20",max:"100",type:"range"},null,40,b)]),(0,a.Lk)("div",U,[(0,a.Lk)("label",null,[e[12]||(e[12]=(0,a.eW)("Upload Image ")),(0,a.Lk)("input",{onChange:e[3]||(e[3]=(...t)=>o.imageUpload&&o.imageUpload(...t)),id:"file-input",type:"file"},null,32)]),(0,a.Lk)("a",{download:"",id:"save",onClick:e[4]||(e[4]=t=>o.saveImage())},"Save"),(0,a.bF)(l,{onClick:e[5]||(e[5]=t=>o.undoCanvas(-1))},{default:(0,a.k6)((()=>e[13]||(e[13]=[(0,a.eW)("Undo")]))),_:1}),(0,a.bF)(l,{onClick:e[6]||(e[6]=t=>o.redoCanvas(1))},{default:(0,a.k6)((()=>e[14]||(e[14]=[(0,a.eW)("Redo")]))),_:1})])])}function C(t,e){return(0,a.uX)(),(0,a.CE)("button",null,[(0,a.RG)(t.$slots,"default",{},void 0,!0)])}const D={},x=(0,g.A)(D,[["render",C],["__scopeId","data-v-fb5dca30"]]);var _=x;function y(t,e){return(0,a.uX)(),(0,a.CE)("h2",null,[(0,a.RG)(t.$slots,"default",{},void 0,!0)])}const L={},M=(0,g.A)(L,[["render",y],["__scopeId","data-v-48c70bb2"]]);var B=M,F={name:"EditPanel",components:{UIButton:_,UIH2:B},computed:{...(0,u.aH)(c,["iteration"]),...(0,u.aH)(c,["imageEdits"]),...(0,u.aH)(c,["isBlurring"]),...(0,u.aH)(c,["size"])},data(){return{colors:["red","yellow","lime","deepskyblue","purple","black","white"]}},methods:{useImageStore:c,async imageUpload(t){const e=t.target.files[0];if(e){const t=await this.fileToDataUri(e),n=c();n.updateUrl(t),n.newUploaded(!0)}},fileToDataUri(t){return new Promise((e=>{const n=new FileReader;n.addEventListener("load",(()=>{e(n.result)})),n.readAsDataURL(t)}))},saveImage(){const t=document.getElementById("save"),e=c();t.href=e.imgUrl,t.download="EternalImage"+Math.floor((new Date).getTime()/1e3)},undoCanvas(t){if(this.iteration>0){const e=c();e.updateIteration(t)}},redoCanvas(t){if(this.imageEdits.length>this.iteration+1){const e=c();e.updateIteration(t)}}}};const H=(0,g.A)(F,[["render",E],["__scopeId","data-v-701d5631"]]);var z=H,O={components:{EditPanel:z,ImageCanvas:f},data(){return{imageUrl:"",imageSaveUrl:"",origImage:"",color:"black",size:25,isBlurring:!1,iteration:0,iterMax:0,loadFromStorage:!1}}};const S=(0,g.A)(O,[["render",r],["__scopeId","data-v-5657524e"]]);var R=S,T={name:"App",components:{ImageEditor:R}};const W=(0,g.A)(T,[["render",s]]);var X=W;const A=(0,u.Ey)();(0,i.Ef)(X).use(A).mount("#app")}},e={};function n(i){var a=e[i];if(void 0!==a)return a.exports;var s=e[i]={exports:{}};return t[i].call(s.exports,s,s.exports,n),s.exports}n.m=t,function(){var t=[];n.O=function(e,i,a,s){if(!i){var o=1/0;for(u=0;u<t.length;u++){i=t[u][0],a=t[u][1],s=t[u][2];for(var r=!0,l=0;l<i.length;l++)(!1&s||o>=s)&&Object.keys(n.O).every((function(t){return n.O[t](i[l])}))?i.splice(l--,1):(r=!1,s<o&&(o=s));if(r){t.splice(u--,1);var d=a();void 0!==d&&(e=d)}}return e}s=s||0;for(var u=t.length;u>0&&t[u-1][2]>s;u--)t[u]=t[u-1];t[u]=[i,a,s]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={524:0};n.O.j=function(e){return 0===t[e]};var e=function(e,i){var a,s,o=i[0],r=i[1],l=i[2],d=0;if(o.some((function(e){return 0!==t[e]}))){for(a in r)n.o(r,a)&&(n.m[a]=r[a]);if(l)var u=l(n)}for(e&&e(i);d<o.length;d++)s=o[d],n.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return n.O(u)},i=self["webpackChunkcodex_front_vue"]=self["webpackChunkcodex_front_vue"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=n.O(void 0,[504],(function(){return n(601)}));i=n.O(i)})();
//# sourceMappingURL=app.74e2fcb0.js.map