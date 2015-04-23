
function Header() {
	var Surface = famous.core.Surface;
	var Modifier = famous.core.Modifier;
	var View = famous.core.View;
	var Transform = famous.core.Transform;
	var StateModifier = famous.modifiers.StateModifier;

	var EventHandler = famous.core.EventHandler;

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
		content: '<div id="upperDiv">\
				<div id="loginDiv">\
					<form id="loginForm" name="loginForm" method="post" action="">\
						<input type="hidden" name="_token" value="' + inputToken + '">\
						<h2>Log in</h2>\
						<div id="loginFail" class="fail"></div>\
						<input id="loginFormUserName" name="username" type="text" placeholder="User Name or Email" autofocus required /><br>\
						<input id="loginFormPassword" name="password" type="password" placeholder="Password" required /><br>\
						<input id="loginFormSubmitButton" type="submit" name="submit" class="button" value="Login" /><div id="loginFormSwitchToRegistrationButton">Register?</div>\
					</form>\
				</div>\
				<div id="registrationDiv">\
					 <form id="registrationForm" name="registrationForm" method="post" action="">\
						<h2>Register!</h2>\
						<div id="registrationFail" class="fail"></div>\
						<input id="registrationFirstName" class="registrationName" name="firstName" type="text" placeholder="First Name" required /><input id="registrationLastName" class="registrationName" name="lastName" type="text" placeholder="Last Name" required /><br>\
						<input id="registrationUserName" name="username" type="text" placeholder="User Name" required /><br>\
						<input id="registrationEmail" name="email" type="email" placeholder="Email" required /><br>\
						<input id="registrationPassword" name="password" type="password" placeholder="Password" required /><br>\
						<input id="registrationPassword2" name="password2" type="password" placeholder="Verify Password" required /><br>\
						<input id="registrationSubmitButton" type="submit" name="submit" class="button" value="Register" />\
						<div id="registrationSwitchToLoginButton">Login?</div>\
					</form>\
				</div></div>'
	});

	this.alignRight = new Modifier({
		origin: [1, 0],
		align: [1, 0]
	});

	this.view = new View();

	this.view.add(this.backgroundMod).add(this.background);
	this.view.add(this.contentMod).add(this.content);

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
	})
}

Header.prototype.displayLogIn = function() {
	this.contentMod.setOpacity(1);
//	this.view.add(this.contentMod).add(this.content);
}

Header.prototype.pullDown = function() {
	this.backgroundMod.setTransform(Transform.translate(0,0,0), {duration: 500, curve: 'easeOut'});
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