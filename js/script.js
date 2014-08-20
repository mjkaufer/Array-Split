var alphabet = "abcdefghijklmnopqrstuvwxyz";

var mainArray = [];//format = {display:$thingToDisplay, ret: $someFunction()}, the function either returns a char or "" if it does weird bg stuff

var input = document.getElementById('splinput');

for(var i = 0; i < alphabet.length; i++){
	mainArray[mainArray.length] = {
		display: alphabet.substring(i,i+1),
		val: alphabet.substring(i,i+1)
	};
}

for(var i = 0; i < 10; i++){
	mainArray[mainArray.length] = {
		display: i,
		val: i.toString()//has to be a string
	};
}

mainArray[mainArray.length] = {
	display: "&nbsp",
	val: "&nbsp;"
};

mainArray[mainArray.length] = {
	display: "alert & clear",
	ret: function(){
		alert(input.innerHTML);
		clearVal();
	}
};

var subArray = mainArray.slice(0);//copies it
updateDisplay();

window.onkeyup = function(e){//use keys a, s, d, which map to 65, 83, 68

	if(e.which==65)
		go(0);
	else if(e.which==83)
		go(1);
	else if(e.which==68)
		go(2);

};

function go(num){//0-2
	subArray = subArray.slice(subArray.length * num / 3, subArray.length * (num+1) / 3);

	updateDisplay();

	document.getElementsByTagName('li')[num].className = "";//reset anything before
	document.getElementsByTagName('li')[num].className = "animate";
	setTimeout(function(){
		document.getElementsByTagName('li')[num].className = "";
	}, 500);
}

function reset(){
	subArray = mainArray.slice(0);
	updateDisplay();
}

function updateDisplay(){
	if(subArray.length == 1){
		if(typeof subArray[0].val === "string")
			input.innerHTML += subArray[0].val;//we're doing innerHTML so we can add stuff like &nbsp;
		else
			subArray[0].ret();

		reset();
		return;
	}
	if(subArray.length == 0){
		reset();
	}
	var lists = document.getElementsByTagName('li');
	for(var i = 0; i < 3; i++)
		lists[i].innerText = formatArray(subArray.slice(subArray.length * i / 3, subArray.length * (i+1) / 3));//this is innerHTML so we can see stuff

}

function formatArray(arr){
	var retString = "";
	for(var i = 0; i < arr.length; i++){
		retString += arr[i].display + " | ";
	}

	return retString.substring(0,retString.lastIndexOf(" | "));

}

function clearVal(){
	var old = document.getElementById('splinput').innerHTML;
	document.getElementById('splinput').innerHTML = "";
	var p = document.body.appendChild(document.createElement('p'));
	p.innerHTML = old;
}
