
function Header() {
	var Surface = famous.core.Surface;
	var Modifier = famous.core.Modifier;
	var View = famous.core.View;
	var Transform = famous.core.Transform;
	var StateModifier = famous.modifiers.StateModifier;

	var EventHandler = famous.core.EventHandler;

	this.down = false;

	this.checkIn = '<div id="checkIn">\
						<div id="checkInInterior">\
							<div id="checkInLogo">\
								<img src="images/checkIn/901bar.png"/>\
							</div>\
	\
							<div id="checkInDetails">\
								Welcome!\
							</div>\
	\
							<div value="4" id="buttonCheckIn">\
								<img src="images/checkIn/checkin.png"/>\
							<div>\
						</div>\
					</div>';

	this.loginForm = '<div id="upperDiv">\
				<div id="loginDiv">\
					<form action="login" id="loginForm" name="loginForm" method="post">\
						<input type="hidden" name="_token" value="' + inputToken + '">\
						<div id="loginFail" class="fail"></div>\
						<input id="loginFormUserName" name="email" type="text" placeholder="Email" autofocus required /><br>\
						<input id="loginFormPassword" name="password" type="password" placeholder="Password" required /><br>\
						<input id="loginFormSubmitButton" type="submit" name="submit" class="button" value="Login" /><div id="loginFormSwitchToRegistrationButton">Register?</div>\
					</form>\
				</div>\
				<div id="registrationDiv">\
					 <form role="form" id="registrationForm" method="post" action="/auth/register">\
						<div id="registrationFail" class="fail"></div>\
						<input type="hidden" name="_token" value="' + inputToken + '">\
						<input id="registrationFirstName" class="registrationName" name="firstName" type="text" placeholder="First Name" required /><input id="registrationLastName" class="registrationName" name="lastName" type="text" placeholder="Last Name" required /><br>\
						<input id="registrationUserName" name="userName" type="text" placeholder="User Name" required /><br>\
						<input id="registrationEmail" name="email" type="email" placeholder="Email" required /><br>\
						<input id="registrationPassword" name="password" type="password" placeholder="Password" required /><br>\
						<input id="registrationSubmitButton" type="submit" name="submit" class="button" value="Register" />\
						<div id="registrationSwitchToLoginButton">Login?</div>\
					</form>\
				</div></div>';

	headerDiv = document.getElementById('header');

	this.background = new Surface({
		content: '<div id="header"> </div>'
	});

	this.backgroundMod = new Modifier({
		transform: Transform.translate(0, -150, 0)
	});

	this.leftMod = new Modifier({
		transform: Transform.translate(0, 0, 2)
	});

	this.rightMod = new Modifier({
		transform: Transform.translate(0, 0, 2)
	});

	this.contentMod = new Modifier({
		opacity: 0,
		transform: Transform.translate(0, 0, 1)
	});

	// Surface for the Title
		// TODO
			// Animate logo by making a surface for each letter.
	this.leftHeader = new Surface({
		size: [true, true],
		content: '<span id="title"><img id="logo" src="images/logo_ohako.png" alt="OHAKO" /></span>'
	});

	this.rightHeader = new Surface({
		size: [true, true],
		content: '<div id="header_user_div">\
					<div id="header_user_name"> Log In </div>\
					</div>',
		properties: {
			textAlign: 'right'
		}
	});

	this.content = new Surface({
		content: this.loginForm
	});

	this.alignRight = new Modifier({
		origin: [1, 0],
		align: [1, 0]
	});

	this.view = new View();

	this.view.add(this.backgroundMod).add(this.background);
	//this.view.add(this.contentMod).add(this.content);

	this.view.add(this.leftMod).add(this.leftHeader);
	this.view.add(this.rightMod).add(this.alignRight).add(this.rightHeader);

	this.buttonsInit();
}

Header.prototype.buttonsInit = function() {
	this.leftHeader.on('click', function(data){
		displayView(View.home);
	});

	this.rightHeader.on('click', function(data){
		famousRightHeaderClick();
	});

	this.background.on('click', function(data){
		famousPullDown();
	});
}

Header.prototype.isDown = function() {
	return this.down;
}

Header.prototype.loggedIn = function(response) {
	if (response!='fail'){
		header.pullUp();
		header.rightHeader.setContent('<div id="header_user_div">\
					<div id="header_user_name"> '+response.userName+' </div>\
					</div>');
		user.setUser(response);
		console.log(response);
	}
}

Header.prototype.buttonsLoginInit = function() {
	$('#loginForm').submit(function(event) { 
				event.preventDefault();

				var options = { 
			        //target:        '#output2',   // target element(s) to be updated with server response 
			        //beforeSubmit:  settings.showRequest,  // pre-submit callback 
			        success:       header.loggedIn,  // post-submit callback 
			 		//contentType: false,
			 		//processData: false,
			 		//iframe: true,
			 		//data: 'uploadButton',
			        // other available options: 
			    //    url:       "uploadPhoto",         // override for form's 'action' attribute 
			    //    type:      'POST',        // 'get' or 'post', override for form's 'method' attribute 
			       // dataType:  'multipart/form-data'        // 'xml', 'script', or 'json' (expected server response type) 
			        clearForm: true,        // clear all form fields after successful submit 
			        resetForm: true,        // reset the form after successful submit 
			 
			        // $.ajax options can be used here too, for example: 
			        timeout:   3000 
			    }; 

		        // inside event callbacks 'this' is the DOM element so we first 
		        // wrap it in a jQuery object and then invoke ajaxSubmit 
		       	 $(this).ajaxSubmit(options); 

		        // !!! Important !!! 
		        // always return false to prevent standard browser submit and page navigation 
		        return false; 
    		}); 

	$('#registrationForm').submit(function(event) { 
					event.preventDefault();

					var options = { 
				        //target:        '#output2',   // target element(s) to be updated with server response 
				        //beforeSubmit:  settings.showRequest,  // pre-submit callback 
				        success:       header.loggedIn,  // post-submit callback 
				 		//contentType: false,
				 		//processData: false,
				 		//iframe: true,
				 		//data: 'uploadButton',
				        // other available options: 
				    //    url:       "uploadPhoto",         // override for form's 'action' attribute 
				    //    type:      'POST',        // 'get' or 'post', override for form's 'method' attribute 
				       // dataType:  'multipart/form-data'        // 'xml', 'script', or 'json' (expected server response type) 
				        clearForm: true,        // clear all form fields after successful submit 
				        resetForm: true,        // reset the form after successful submit 
				 
				        // $.ajax options can be used here too, for example: 
				        timeout:   3000 
				    }; 

			        // inside event callbacks 'this' is the DOM element so we first 
			        // wrap it in a jQuery object and then invoke ajaxSubmit 
			       	 $(this).ajaxSubmit(options); 

			        // !!! Important !!! 
			        // always return false to prevent standard browser submit and page navigation 
			        return false; 
	    		}); 
}

Header.prototype.displayLogIn = function() {
	this.content.setContent(this.loginForm);
	this.view.add(this.contentMod).add(this.content);
	this.contentMod.setOpacity(1, {duration: 500});
}

Header.prototype.checkInButtonsInit = function() {
	$('#buttonCheckIn').on('click', function(){checkIn()});
}

Header.prototype.pullDown = function() {
	this.down = true;
	this.backgroundMod.setTransform(Transform.translate(0,0,0), {duration: 500, curve: 'easeOut'});
}

Header.prototype.displayCheckIn = function() {
	this.content.setContent(this.checkIn);
	this.contentMod.setOpacity(1, {duration: 500});
}

Header.prototype.pullUp = function() {
	this.down = false;
	this.content.setContent("");
 	this.backgroundMod.setTransform(Transform.translate(0,-150,0), {duration: 500, curve: 'easeOut'});
}

Header.prototype.setContent = function(htmlContent) {
	this.content.setContent(htmlContent);
}

Header.prototype.getView = function() {
	return this.view;
}

Header.prototype.getLogoSurface = function() {
	return this.leftHeader;
}

Header.prototype.getNameSurface = function() {
	return this.rightHeader;
}