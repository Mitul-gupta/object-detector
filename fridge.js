Status = "";
fridge_image = "";
objects = [];

function preload(){
    fridge_image = loadImage("fridge.jpg");
}

function setup(){
    canvas = createCanvas(740,540);
    canvas.position(415,220);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(fridge_image,gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error)
    }
    console.log(results);
    objects= results;
    }
    function draw(){
        image(fridge_image,0,0,740,520);    
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