"use strict";

const clearBtn = document.querySelector('[data-clear]');
const saveBtn = document.querySelector('[data-save]');
const downloadBtn = document.querySelector("[data-download]");
const colorsContainer = document.querySelector('.colors');

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext("2d");


let selectedCol = null;
let prevX = null;
let prevY = null;
let draw = false;

ctx.lineWidth = 5;

colorsContainer.addEventListener("click" ,(e) => {
   
    if ( e.target.tagName === 'DIV' && e.target.classList.contains("btn") ){
            removeSelectedClass();
            e.target.classList.toggle("selected");
            selectedCol = e.target.dataset.color;
            
    }
})

clearBtn.addEventListener("click" ,(e) => {
    selectedCol = null;
    removeSelectedClass();
    clearCanvas();
})

canvas.addEventListener("mousemove" ,(e) => {
    if(prevX == null || prevY == null || !draw){
        prevX = e.pageX
        prevY = e.pageY
        return
    }

    let currentX = e.pageX
    let currentY = e.pageY

    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    prevX = currentX
    prevY = currentY
})

canvas.addEventListener("mousedown" , () => { draw = true; })
canvas.addEventListener("mouseup" , () => { draw = false; })

saveBtn.addEventListener("click" ,() => {
    ctx.strokeStyle = selectedCol ;
})

downloadBtn.addEventListener("click" ,downloadImg);

function removeSelectedClass(){
    colorsContainer.querySelectorAll(".btn").forEach(button => {
        button.classList.remove("selected");
    })
}

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function downloadImg(){

    if(isCanvasBlank()){
        let result = confirm("The canvas is empty , do you want to download it ? ");
        if (result){
            let dataURL = canvas.toDataURL("img/png");
            console.dir(dataURL);
            let a = document.createElement("a");
        
            a.href = dataURL;
            a.download = "canvas-img.jpeg";
            a.click();
        }else return ;
    }

    let dataURL = canvas.toDataURL("img/png");
    console.dir(dataURL);
    let a = document.createElement("a");

    a.href = dataURL;
    a.download = "canvas-img.jpeg";
    a.click();
}


function isCanvasBlank(){

    let blank = document.createElement("canvas");

    blank.width = canvas.width;
    blank.height = canvas.height;

    return canvas.toDataURL() === blank.toDataURL();
}