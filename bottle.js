Status = "";
bottle_image = "";
objects =[];
function preload(){
    bottle_image = loadImage("bottle.png");
}

function setup(){
    canvas = createCanvas(440,540);
    canvas.position(415,190);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(bottle_image,gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error)
    }
    console.log(results);
    objects= results;
    }
    function draw(){
        image(bottle_image,0,0,440,640);
        if(Status != " ") {
            for(i=0; i < objects.length; i++)
            {
                document.getElementById("status").innerHTML = "Status: Object Detected";
    
                fill("#FF0000");
                percent= floor(objects[i].confidence * 100);
                text(objects[i].label+" "+percent + "%" , objects[i].x, objects[i].y);
                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
    }
