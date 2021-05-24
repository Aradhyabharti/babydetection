status = ""
child = [];



function preload() {
    sound = loadSound("alarm_sound.mp3");

}


function setup() {
    canvas = createCanvas(380, 380)
    canvas.center()

    video=createCapture(VIDEO)
    video.hide()
    object_detector = ml5.objectDetector('cocossd,', modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting child";
}


function modelLoaded() {
    console.log("model is loaded")
    status = true;
}



function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results)
        child = results
    }
}



function draw() {
    image(video, 0, 0, 380, 380)
    if (status != "") {
        r = random(255)
        g = random(255)
        b = random(255)
        object_detector.detect(video, gotResult)

        for (i = 0; i < child.length; i++) {
           
           
            fill(r,g,b)
            stroke(r,g,b)
              percent=floor(child[i].confidence*100)
            text(child[i].label+" "+percent+"%",child[i].x,child[i].y)
            noFill()
            rect(child[i].x,child[i].y,child[i].width,child[i].height)
        if(child[i].label=="person"){
            document.getElementById("status").innerHTML = "baby detected"  
            sound.stop()
        }
        else{
            document.getElementById("status").innerHTML = "baby not detected"  
            sound.play() 
        }
   
        }
    }
}