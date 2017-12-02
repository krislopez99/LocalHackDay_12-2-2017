var hackathonName;

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
	hackathonName = replace[2];
	return hackathonName;
}