var canvas = document.getElementById('canvas')
var pen = document.getElementById('pen')
var eraser = document.getElementById('eraser')
var context = canvas.getContext('2d')
autoSetCanvasSize(canvas)
listenToMouse(canvas)

//设置canvas的宽高与页面一致
function autoSetCanvasSize(canvas){
    setCanvasSize()
    window.onresize = function(){
        setCanvasSize()
    }
    function setCanvasSize(){
        let pageWidth = document.documentElement.clientWidth
        let pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth-32
        canvas.height = pageHeight-60
    }
}


//切换笔和橡皮擦
var eraserEnabled = false
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
    context.strokeStyle = 'black'
}

red.onclick = function(){
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    context.strokeStyle = 'red';
}
green.onclick = function(){
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    context.strokeStyle = 'green'
}
blue.onclick = function(){
    blue.classList.add('active')
    green.classList.remove('active')
    red.classList.remove('active')
    context.strokeStyle = 'blue'
}
clear.onclick = function(){
    context.clearRect(0,0,canvas.width,canvas.height)
}
download.onclick = function(){
    var url = canvas.toDataURL('image/png')
    var a  = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    var name = window.prompt('给你的画起个名吧！') || '新建图片'
    a.download = name
    a.click()
}

//画线
function drawLine(x1,y1,x2,y2,color,lineWidth = 5){
    context.beginPath();
    context.strokeStyle = color;
    context.fillStyle = color;
    context.moveTo(x1-10,y1-10);//起点
    context.lineWidth = lineWidth;
    context.lineTo(x2-10,y2-10);//终点
    context.fill();
    context.stroke();
    context.closePath()
}

//监听鼠标事件
function listenToMouse(){
    var using = false
    let lastPoint = {x:undefined,y:undefined}
    if(document.body.ontouchstart !== undefined){
        canvas.ontouchstart = function(a){
            let x = a.touches[0].clientX
            let y = a.touches[0].clientY
            using = true
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                lastPoint = {x:x,y:y}
            }
        }
        canvas.ontouchmove = function(a){
            let x = a.touches[0].clientX
            let y = a.touches[0].clientY
            if(!using){return}
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{      
                let newPoint = {x:x,y:y}
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint = newPoint
            }       
        }
        canvas.ontouchend = function(){
            using = false
        }
    }else{
        canvas.onmousedown = function(a){
            let x = a.clientX
            let y = a.clientY
            using = true
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                lastPoint = {x:x,y:y}
            }
            }
        canvas.onmousemove = function(a){
            let x = a.clientX
            let y = a.clientY
            if(!using){return}
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{      
                let newPoint = {x:x,y:y}
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint = newPoint
            }
            
        }
        canvas.onmouseup = function(){
            using = false
        }
    } 
}
