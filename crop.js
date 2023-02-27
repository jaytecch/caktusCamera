let videoWidth = null;
let videoHeight = null;

let box = document.getElementById("caktus-focus-box")

const camera = document.querySelector(".caktus-camera-wrapper")

const preview = document.getElementById('preview')

const cropPreview = document.querySelector(".caktus-pic-preview")
const caktusSnap = document.getElementById("caktus-snap")

const video = document.getElementById("caktus-camera")


const {height, width} = getCameraResolution()

//Box coordinates

let boxX = null

let boxY = null;

let boxWidth  = null;

function getCameraResolution(){
    const viewportHeight = window.innerHeight;
    const screenHeight = window.screen.height
    const viewportWidth = window.screen.width
    
    
    const aspectRatio = viewportWidth/screenHeight
    
    const cameraWidth = viewportHeight/ aspectRatio
    
    return {width: cameraWidth, height: viewportHeight}
  }

// Initialize Camera

const openCam = async (videoElem)=>{
   try{
    const MediaDevice = navigator?.mediaDevices
    
    if(!MediaDevice || !MediaDevice?.getUserMedia){
      throw new Error("Can't Access Device Camera")
    }
    
const constraints = {
      video: {
     width: {ideal: width - 80}, 
     height: {ideal: height}, 
      facingMode: {
        exact: "environment"
      },
      audio: false,
    }
    }
 const VideoStream = await MediaDevice.getUserMedia(constraints)
    
   const videoTrack = VideoStream.getVideoTracks()[0]
   
   
    
    if("srcObject" in videoElem){
      
    videoElem.srcObject = VideoStream

   }
    else{
      
     videoElem.src = URL.createObjectURL(VideoStream)
      
    }
    
    
   videoElem.onloadedmetadata = ()=>{
      videoElem.play()
    
    }
    
  }
  catch(error){
    console.log(error)
  }
  }
  
  
// Listen for Snap Button Click event

caktusSnap.addEventListener("click", async function(){
  
const canvas = document.createElement("canvas")

canvas.width = video.videoWidth

canvas.height = video.videoHeight

canvas.getContext('2d').drawImage(video, 0, 0);
  
  boxX = box.offsetLeft
  boxY= box.offsetTop
  boxWidth = parseInt(getComputedStyle(box).width.replace("px", ""))
  
  
  camera.style.display = "none"
  
  
   image = canvas.toDataURL("image/png")
  
  preview.src = image
   
   preview.onload = ()=>{ 
   
  $("#preview").rcrop({
     minSize: [getCropWidth(300, canvas.width), getCropHeight(180, canvas.height)],
     grid: true,
   })
  
  $("#preview").on("rcrop-ready", function(){
    
    
  
     $("#preview").rcrop("resize", getCropWidth(boxWidth, canvas.width), 180,
    getCropWidth(boxX, canvas.width), getCropHeight(boxY, canvas.height)
  )
  

  })

   }
})



$("#caktus-crop-btn").on("click", ()=>{
  const src = $("#preview").rcrop ('getDataURL')
  
  $("#prev")[0].src = src
  
 $("#preview").rcrop("destroy")
 
  cropPreview.style.display= "none"
})



function getCropWidth(desiredWidth,imageWidth){
  const viewportWidth = window.innerWidth
  const scale = imageWidth / viewportWidth
  const finalWidth = desiredWidth * scale
  return finalWidth;
}

function getCropHeight(desiredHeight,imageHeight){
  const viewportHeight = window.innerHeight
  const scale = imageHeight / viewportHeight
  const finalHeight = desiredHeight * scale
  return finalHeight;
}


