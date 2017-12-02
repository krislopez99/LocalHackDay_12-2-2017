var database, hackathonName;
var userID = 0;

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

function userWebpage(ID) {
	var name = document.getElementsByClassName('name');
	var hold = name[ID].innerHTML;
	hold = hold.substring(3, hold.length - 4);
	hold = hold.split(",");
	window.open("individualPage.html?hack="+hackathonName+"&fName="+hold[1].trim()+"&lName="+hold[0].trim(), "_self");
}

var parseQueryString = function(url) {
  var urlParams = [];
  var i = 0;
  url.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function($0, $1, $2, $3) {
      urlParams[i] = $3;
	  i++;
    }
  );
  
  return urlParams;
}

function init() {
	var replace = parseQueryString(location.search);
	hackathonName = replace[0].trim();
	return hackathonName;
}

var checkUser = firebase.database().ref(init());
checkUser.orderByChild("attendedHacks").on('child_added', function(snapshot) {
	$("#scrollerMenu").append("<div class='userTile' onclick='userWebpage("+userID+")'><p class='name'><b>"+snapshot.val().lastName+", "+snapshot.val().firstName+"</b></p><p class='attended'><i style='color:#960018'>Hackathons Attended: </i>"+snapshot.val().attendedHacks+"</p><p class='major'><i style='color:#960018'>Major: </i>"+snapshot.val().major+"</p><p class='school'><i style='color:#960018'>School: </i>"+snapshot.val().school+"</p><p class='experience'><i style='color:#960018'>Experience Level: </i>"+snapshot.val().experience+"</p><p class='mentor'><i style='color:#960018'>Willing To Mentor? </i>"+snapshot.val().mentor+"</p><p class='age'><i style='color:#960018'>Age: </i>"+snapshot.val().age+"</p><div class='profileImage' style='background-image: url("+snapshot.val().profileImage+")'></div></div><br>");
	userID+=1;
});