Webcam.set({
    width: 350,
    height: 300,
    image_format:'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="capture_image" src="' + data_uri + '"/>';
});
}
console.log("ml5 version: ", ml5.version);
classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/bYAhow4b5/model.json', modelLoaded);
function modelLoaded(){
    console.log("Model Loaded!");
}
function speak(){
    var synth = window.speechSynthesis;
    var speakdata1 = "The First Prediction Is" + prediciton_1;
    var speakdata2 = "The Second Prediciton Is" + prediciton_2;
    var utterthis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    synth.speak(utterthis);
}
function check(){
    img = document.getElementById("capture_image");
    classifier.classify(img, gotResult);

}
function gotResult(error, results){
if(error){
console.error(error);

}else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
document.getElementById("result_emotion_name2").innerHTML = results[1].label;
prediciton_1 = results[0].label;
prediciton_2 = results[1].label;
speak();
if(results[0].label == "Grinning Face with closed eyes"){
    document.getElementById("update_emoji").innerHTML = "&#128516;";
}
if(results[0].label == "Unamused Face"){
    document.getElementById("update_emoji").innerHTML = "&#128530;";
}
if(results[0].label == "Angry Face"){
    document.getElementById("update_emoji").innerHTML = "&#128545;";
}
if(results[1].label == "Grinning Face with closed eyes"){
    document.getElementById("update_emoji2").innerHTML = "&#128516;";
}
if(results[1].label == "Unamused Face"){
    document.getElementById("update_emoji2").innerHTML = "&#128530;";
}
if(results[1].label == "Angry Face"){
    document.getElementById("update_emoji2").innerHTML = "&#128545;";
}
}
}
