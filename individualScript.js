var hackathonName, fName, lName;

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
	fName = replace[1].trim();
	lName = replace[2].trim();
	return hackathonName + (fName + lName.charAt(0));
}

var userInformation = firebase.database().ref(init());
userInformation.on('value', function(snapshot) {
	console.log(snapshot.val());
	$("#pageWrapper").append("<div id='userInfo'><p id='name'><b>"+snapshot.val().lastName+", "+snapshot.val().firstName+"</b></p><p id='email'><i style='color:#960018'>Email: </i>"+snapshot.val().email+"</p><p id='phone'><i style='color:#960018'>Phone: </i>"+snapshot.val().phone+"</p><p id='resumeLink'><i style='color:#960018'>Resume: </i><a id='resumeLinkH' href='"+snapshot.val().resume+"'>Click Here</a></p><p id='skills'><i style='color:#960018'>Skills: </i>"+snapshot.val().skills+"</p><div id='profileImage' style='background-image: url("+snapshot.val().profileImage+")'></div></div>");
});