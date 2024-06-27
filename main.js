status1 = "";
objects = [];

function preload() {
    document.getElementById("alarm").load()
}

function setup() {
    canvas = createCanvas(480, 620)
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 620)
    video.hide();

    objectDetecter = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(video, 0, 0, 480, 620);
    for (i = 0; i < objects.length; i++) {
        if (i == "person") {
            document.getElementById("status").innerHTML = "Status: Baby Detected";
            audio.stop()
        } else {
            document.getElementById("status").innerHTML = "Status: Baby Not Detected";
            audio.play()
        }
        if (objects.length < 0) {
            document.getElementById("status").innerHTML = "Status: Baby Not Detected";
            audio.play()
        }
    }
}

function modelLoaded() {
    console.log("ModelLoaded")
    status1 = true;
    objectDetecter.detect(video, gotResult);

}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results
}