Status = "";
laptop_image = "";
objects = [];
function preload(){
    laptop_image = loadImage("laptop.jpeg");
}

function setup(){
    canvas = createCanvas(740,440);
    canvas.position(415,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(laptop_image,gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error)
    }
    console.log(results);
    objects= results;
    }
    function draw(){
        image(laptop_image,0,0,700,430);
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