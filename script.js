var theStream;
let facingMode = "environment"

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
      document.querySelector(".photo").classList.remove('d-none')
      var theImageTag = document.getElementById("imageTag");
      theImageTag.src = URL.createObjectURL(blob);
    })
    .catch(err => alert('Error: ' + err));
});


document.getElementById("img-input").addEventListener("change", readImage, false);

function readImage() {
    if (this.files && this.files[0]) {
        var file = new FileReader();
        file.onload = function(e) {
          document.querySelector('.show-video').classList.add('d-none')
          document.querySelector(".photo").classList.remove('d-none')
            document.getElementById("imageTag").src = e.target.result;
        };       
        file.readAsDataURL(this.files[0]);
    }
}
  







