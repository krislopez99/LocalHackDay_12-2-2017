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

function enterData() {
	alert("Thank You");
	writeData();
}

function writeData() {
	var e = document.getElementById("school");
	var school = e.options[e.selectedIndex].value;
	window.open("findTeammates.html?hack="+school, "_self");
}