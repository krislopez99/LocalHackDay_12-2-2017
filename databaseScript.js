var JSONdata, canvasRefreshData, JSONfile;
var refresh = new Image();
var database;

var config = {
	apiKey: "AIzaSyDmHxxMpjsEkT4AG3_th-nZ6gtt_ZhhqQ4",
	authDomain: "whiteboard-21f79.firebaseapp.com",
	databaseURL: "https://whiteboard-21f79.firebaseio.com",
	projectId: "whiteboard-21f79",
	storageBucket: "whiteboard-21f79.appspot.com",
    messagingSenderId: "248376421307"
};
firebase.initializeApp(config);

database = firebase.database();
function writeUserData(data) {
	firebase.database().ref('courses/' + data).set({
		canvasData: canvas.toDataURL('image/PNG', 0.1)
	});
}

var checkCanvas = firebase.database().ref('courses/' + courseID);
var isTimeoutSet = true;
checkCanvas.on('value', function(snapshot) {
	if(isTimeoutSet) {
		setTimeout(function(){
			userWhiteboard.drawImage(refresh, 0, 0, window.innerWidth, window.innerHeight);
			isTimeoutSet = false;
		}, 600);
	}
	isTimeoutSet = true;
	
	if(readData != false) {
		JSONdata = snapshot.val();
		
		JSONdata = JSON.stringify(JSONdata);
		canvasBaseData = JSONdata.substring(JSONdata.indexOf('"') + 14, JSONdata.lastIndexOf('"'));
		
		refresh.src = canvasBaseData;
	}
});

database = firebase.database();
function addImageLink(name, linkText) {
	firebase.database().ref(courseID + name).set({
		name: name,
		imageLoc: linkText,
		timeStamp: (new Date).getTime()
	});
}

var fileButton = document.getElementById("fileButton");
fileButton.addEventListener('change', function(event) {
	var file = event.target.files[0];
	var storageRef = firebase.storage().ref(courseID + file.name);
	var upload = storageRef.put(file);
	upload.on('state_changed', function(snapshot) {	
	}, function(error) {
		alert("image upload failed");
	}, function() {
		addImageLink(file.name.split('.')[0], upload.snapshot.downloadURL);
	});
});

var checkFile = firebase.database().ref(courseID);
checkFile.orderByChild("timeStamp").on('child_added', function(snapshot) {
	JSONfile = snapshot.val();
	$("#fileMenu").append("<a class='file' target='_blank' href='" + snapshot.val().imageLoc + "'><img class='fileIcon' src='sideBar/fileIcon.svg'></img><p class='fileLink'>" + snapshot.val().name + "</p></a><br>");
	resetFileSize();
});

function resetFileSize() {
	var fileIcons = document.getElementsByClassName("fileIcon");
	for(var i = 0; i < fileIcons.length; i++) {
		fileIcons[i].style.height = (window.innerHeight/7) + "px";
		fileIcons[i].style.width = (window.innerHeight/7) + "px";
	}
}