"use strict"

var app = {

	init: function(){

		//# to do #
		//check whether the application cache has been updated, and force refresh it if so


		//initialize the page we're on

		switch (document.title) {

		case "Home":
			app.initHomePage();
			break;

		case "New Account":
			app.initAccountPage();
			break;

		case "Edit Account":
			app.initEditAccountPage();
			break;

		case "Take Photo":
			app.initNewPhotoPage();
			break;


		case "Edit Photo":
			app.initEditPhotoPage();
			break;

		}

	},


	refreshAppCache: function(){
		// called when the application cache needs refreshing
		//# to do #

	},

	initHomePage: function() {
		//initialze the home page UI

		//# to do #
		var user = JSON.parse(window.localStorage.getItem("user"));
		if(user) {
			document.querySelector("#username").textContent = user.name;
			document.querySelector("#welcome").style.display = "inline-block"
			document.querySelector("#welcome p").style.display = "inline-block";
		} else {
			document.querySelector("#account-options").style.display = "inline-block";
		}

		//# to do #

		//initialize photos
		var photos = JSON.parse(window.localStorage.getItem("photos")) || [];
		photos.forEach(function(photo) {
			var str = "<li><img src=\"" + photo.image + "\"/>" + photo.title + "</li>";
			document.querySelector("#thePhotos").insertAdjacentHTML( 'beforeend', str );
		});


		//attach event listeners
		//need event handlers for clicks etc
		document.querySelector("#create-account").addEventListener('click', app.startNewAccount, false)
		document.querySelector("#edit-account").addEventListener('click', app.editAccount, false)
		document.querySelector("#edit-photo").addEventListener('click', app.editPhoto, false)
		document.querySelector("#delete-photo").addEventListener('click', app.deletePhoto, false)
		document.querySelector("#new-photo").addEventListener('click', app.newPhoto, false)
		document.querySelector("#upload").addEventListener('click', app.uploadPhoto, false)


		//setup the UI state
		//what buttons to enable/disable
		app.updateHomeUI()
	},



	updateHomeUI: function(){

		//update the UI when we go online/offlime, or when user selects a photo

		var enablePhotoButtons = document.querySelector(".selectedPhoto")

		document.querySelector("#edit-photo").disabled = !enablePhotoButtons
		document.querySelector("#delete-photo").disabled = !enablePhotoButtons

		document.querySelector("#upload").disabled = !navigator.onLine;


	},

	deletePhoto: function(){
		//# to do #

		//delete a photo the user has selected
	},

	startNewAccount: function(){
		//called to open the create new account window
		app.gotoScreen("new-account.html")

	},

	editAccount: function(){
		//called to open the create new account window
		app.gotoScreen("edit-account.html")

	},

	gotoScreen: function(fileName){
		//go to the given filename (relative to the current document)
		window.location.href = fileName;
	},

	editPhoto: function(){

		//# to do #

		//called to edit a selected photo in the homescreen list
		//we need to open the edit photo page, and let it know which photo to edit

		//now open the photo editing screen
		app.gotoScreen("edit-photo.html")

	},

	newPhoto: function(){
		//called when the user wants to take a new photo in the home screen

		app.gotoScreen("new-photo.html")

	},

	initAccountPage: function() {
		//initialze the account page

		//attach event listeners

		var inputs = document.querySelectorAll('input')
		for (var i=0; i < inputs.length; i++) {
			inputs[i].addEventListener("input", app.updateAccountUI, false)
		};

		document.querySelector("#create-new-account").addEventListener('click', app.createAccount, false)
		document.querySelector("#cancel-new-account").addEventListener('click', app.cancel, false)

	},

	initEditAccountPage: function() {
		//initialze the account page

		//# to do #

		//set the name and email fields from localStorage

		//attach event listeners
		document.querySelector("#update-account").addEventListener('click', app.saveAccount, false)
		document.querySelector("#cancel-new-account").addEventListener('click', app.cancel, false)

	},

	updateAccountUI: function(){
		//update the UI of the new account page based on the current user input
		//in essence, don't allow the user to choose Create Account unless all fields are set, password is verified

		var enableButton = true;

		if (document.querySelector("#username").value === "") {
			enableButton = false
		}

		if (document.querySelector("#email").value === "") {
			enableButton = false
		}

		var password = document.querySelector("#password").value;
		var verifypassword = document.querySelector("#verify-password").value;

		if ( password == "" || (password !== verifypassword)) {
			enableButton = false
		}

		document.querySelector("#create-new-account").disabled = !enableButton

	},


	createNewAccount: function(){

		var user = {};
		user.name = document.querySelector("#username").value;
		user.email = document.querySelector("#email").value;
		user.password = document.querySelector("#password").value;

		window.localStorage.setItem("user", JSON.stringify(user));

		//return to the main window
		app.gotoScreen("index.html")
	},

	saveAccount: function(){


		app.gotoScreen("index.html");
	},

	initNewPhotoPage: function() {
		//initialize the new photo page

		var inputs = document.querySelectorAll('input')
		for (var i=0; i < inputs.length; i++) {
			inputs[i].addEventListener("input", app.updateNewPhotoUI, false)
		};
		document.querySelector("#description").addEventListener('change', app.updateNewPhotoUI, false)

		document.querySelector("#take-photo").addEventListener('change', app.takePhoto, false)
		document.querySelector("#get-photo").addEventListener('click', app.fakePhoto, false)
		document.querySelector("#save-photo").addEventListener('click', app.saveNewPhoto, false)
		document.querySelector("#cancel").addEventListener('click', app.cancel, false)

		//# to do #
		//need to handle drag, drop, drag over events on the body
	},

	dragOverPhoto: function(evt) {
		//for drop events otbe received, you need to handle dragover, and call preventDefault
		evt.dataTransfer.dropEffect = 'copy';

		evt.stopPropagation()
		evt.preventDefault()

	},

	dropPhoto: function(evt){
		// handle images being dropped onto the image element
		evt.stopPropagation()
		evt.preventDefault() //stops the default of loading the file into the window
		app.takePhoto(evt);

	},

	updateNewPhotoUI: function(){
		//update the UI of the new photo page based on the current user input
		//in essence, don't allow the user to choose Save a new photo unless all mandatory fields are set, and a photo is taken

		var enableButton = true;

		if (document.querySelector("#title").value === "") {
			enableButton = false
		}

		//description, tags and location are optional

		//# to do #

		//need to check if a photo has been taken
		//does the img have a src?

		document.querySelector("#save-photo").disabled = ! enableButton

	},

	takePhoto: function(evt){
		var reader = new FileReader();
		var file = document.querySelector("#take-photo").files[0];
		document.querySelector("#size").value = file.size;

		reader.onload = function(e) {
			document.querySelector("#the-photo").src = reader.result;
		};

		reader.readAsDataURL(file);
	},

	photoTaken: function(event){
		//# to do #
		 //called when the load event fires on the FileReader

	},

	drawImage: function(dataURL){
		//# to do #
		//draw the image from this dataURL

	},

	saveNewPhoto: function(){
		//save the photo taken in the newPhoto screen

		var photo = {}
		photo.id = Date.now()
		photo.title = document.querySelector("#title").value;
		photo.description = document.querySelector("#description").value;
		photo.size = document.querySelector("#size").value;
		photo.date = document.querySelector("#date").value;
		photo.tags = document.querySelector("#tags").value;
		photo.location = document.querySelector("#location").value;
		photo.image = document.querySelector("#the-photo").src;

		//# to do #

		var collection = JSON.parse(window.localStorage.getItem("photos")) || [];

		collection.push(photo);

		window.localStorage.setItem("photos", JSON.stringify(collection));

		//return to the main screen
		app.gotoScreen("index.html")

	},

	saveEditedPhoto: function(){
		//save the changes to the photo


		//return to the main screen
		app.gotoScreen("index.html")

	},

	initEditPhotoPage: function() {
		//# to do #
		//initialize the edit photo page
		//show photo details and the photo

		//add event listeners

		document.querySelector("#take-photo").addEventListener('change', app.takePhoto, false)
		document.querySelector("#get-photo").addEventListener('click', app.fakePhoto, false)
		document.querySelector("#cancel").addEventListener('click', app.cancel, false)
		document.querySelector("#save-photo").addEventListener('click', app.saveEditedPhoto, false)

		document.querySelector("body").addEventListener('dragover', app.dragOverPhoto, false) //need to handle dragover for dropevents to be received
		document.querySelector("body").addEventListener('dragenter', app.dragOverPhoto, false) //need to handle dragover for dropevents to be received
		document.querySelector("body").addEventListener('drop', app.dropPhoto, false) //need to handle dragover for dropevents to be received

		var inputs = document.querySelectorAll('input')
		for (var i=0; i < inputs.length; i++) {
			inputs[i].addEventListener("input", app.updateNewPhotoUI, false)
		};

		document.querySelector("#description").addEventListener('change', app.updateNewPhotoUI, false)

	},

	fakePhoto: function(evt){
		document.querySelector("#take-photo").click();
	},

	cancel: function() {

		//return to the homescreen

		app.gotoScreen("index.html")

	}

}

window.addEventListener("load", app.init, false)
//initialize the app when the window loads
