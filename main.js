var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
autoSetCanvasSize(canvas)


//设置canvas的宽高与页面一致
function autoSetCanvasSize(canvas){
    setCanvasSize()
    window.onresize = function(){
        setCanvasSize()
    }
    function setCanvasSize(){
        let pageWidth = document.documentElement.clientWidth
        let pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}




//画线
function drawLine(x1,y1,x2,y2,color = 'black',lineWidth = 5){
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(x1,y1);//起点
    context.lineWidth = lineWidth;
    context.lineTo(x2,y2);//终点
    context.stroke();
    context.closePath()
}
function listenToMouse(){
    var using = false
    let lastPoint = {x:undefined,y:undefined}
    canvas.onmousedown = function(a){
        using = true
        if(using){
            let x = a.clientX
            let y = a.clientY
            lastPoint = {x:x,y:y}
        }
        
    }
    canvas.onmousemove = function(a){
        if(using){
            let x = a.clientX
            let y = a.clientY
            let newPoint = {x:x,y:y}
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
            lastPoint = newPoint
        }
        
    }
    canvas.onmouseup = function(){
        using = false
}

}
