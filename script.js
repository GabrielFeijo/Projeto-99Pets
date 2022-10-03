var theStream;
let facingMode = "environment"
let source = ""
const loc = document.location;

 



document.querySelector('.change-cam').addEventListener('click' ,() =>{
  if (facingMode == "environment"){
      facingMode = "user";
  }else{
      facingMode = "environment";
  }

    theStream.getTracks().forEach((track) => {
    track.stop()
  })
  grabVideo();
});



document.querySelector('.change-photo').addEventListener('click', grabVideo)
document.querySelector('.add-photo').addEventListener('click', grabVideo)
function grabVideo(){
  if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }

  var constraints = {
    video: {
      facingMode: facingMode
      },
  };

  getUserMedia(constraints, function(stream) {
    var mediaControl = document.querySelector('video');

    document.querySelector('.show-video').classList.remove('d-none')
    document.querySelector('.back').classList.remove('d-none')
    document.querySelector('.form').classList.add('d-none')
    document.querySelector('.add-photo').classList.add('d-none')
    document.querySelector(".confirm-photo").classList.add('d-none')
    if ('srcObject' in mediaControl) {
      mediaControl.srcObject = stream;
    } else if (navigator.mozGetUserMedia) {
      mediaControl.mozSrcObject = stream;
    } else {
      mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      
    }
    theStream = stream;
  }, function(err) {
    alert('Error: ' + err);
  });
};

function getUserMedia(options, successCallback, failureCallback) {
  var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (api) {
    return api.bind(navigator)(options, successCallback, failureCallback);
  }
}

document.querySelector('.take-photo').addEventListener('click', () => {
  if (!('ImageCapture' in window)) {
    alert('ImageCapture is not available');
    return;
  }

  if (!theStream) {
    alert('Grab the video stream first!');
    return;
  }

  var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);

  theImageCapturer.takePhoto()
    .then(blob => {
      document.querySelector('.show-video').classList.add('d-none')
      document.querySelector(".confirm-photo").classList.remove('d-none')
      document.querySelector('.form').classList.remove('d-none')
      var theImageTag = document.getElementById("imageTag");
      theImageTag.src = URL.createObjectURL(blob);
      source = URL.createObjectURL(blob);
      theStream.getTracks().forEach((track) => {
        track.stop()
      })
    })
    .catch(err => alert('Error: ' + err));
});


document.getElementById("img-input").addEventListener("change", readImage, false);

function readImage() {
    if (this.files && this.files[0]) {
        var file = new FileReader();

        
        file.onload = function(e) {
                
          theStream.getTracks().forEach((track) => {
            track.stop()
          })
          document.querySelector('.show-video').classList.add('d-none')
          document.querySelector(".confirm-photo").classList.remove('d-none')
          document.querySelector('.form').classList.remove('d-none')
            document.getElementById("imageTag").src = e.target.result;
            source = e.target.result;
        };       
        file.readAsDataURL(this.files[0]);
    }
}
let dados = ""
document.querySelector('#btn-register').addEventListener("click", (event) => {
  event.preventDefault();
  console.log(source)

  
  let name = document.querySelector('.input-name').value
  let age = document.querySelector('.input-age').value
  let dogbreed  = document.querySelector('.input-dogbreed').value


  if (name != "" && age != "" & dogbreed != "" && source != ""){
    fetch("https://api-mobile-pets.herokuapp.com/pets",
    {
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "age": age,
            "dogbreed": dogbreed,
            "url": source
      
        })
    })
    .then(res => {
        if (res.ok) {
          document.querySelector('.desc-dog').reset();
           window.open("../list-pets/index.html", target="_self" )       
            return res.json();    
        }else{
            console.log(res)
            return Promise.reject({ status: res.status, statusText: res.statusText });
        }
      })
  }else{
    alert('Preencha todas as informações')
  }

 


  async function fetchQuestionsJSON() {
    const response = await fetch('http://localhost:8080/pets');
    const questions = await response.json();
    return questions;
  }
  fetchQuestionsJSON().then(questions => {
    questions; // fetched questions
    dados = questions
    // console.log(dados[1]['url'])
    // document.querySelector('.alvimar').src = dados[1]['url'];
});
  


  
  

  
});
  






