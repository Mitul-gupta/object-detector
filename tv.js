Status = "";
tv_image = "";
objects = [];
function preload(){
    tv_image = loadImage("tv.jpg");
}

function setup(){
    canvas = createCanvas(740,460);
    canvas.position(415,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(tv_image,gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error)
    }
    console.log(results);
    objects= results;
    }
    function draw(){
        image(tv_image,0,0,740,430);
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