bottles = "";
status = "";
objects = [];

function preload(){
    bottles = loadImage("bottles.jpeg");
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    object_Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded(){
    console.log("Model has been loaded");
    status = true;
    object_Detector.detect(bottles, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(bottles, 0, 0, 640, 420);
    if(status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("label").innerHTML = "There are 5 big objects in this image from which cocossd has detected 2 objects correctly and 1 object incorrectly"
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}