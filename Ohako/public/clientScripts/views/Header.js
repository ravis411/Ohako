
function Header() {
	var Surface = famous.core.Surface;
	var Modifier = famous.core.Modifier;
	var View = famous.core.View;
	var Transform = famous.core.Transform;
	var StateModifier = famous.modifiers.StateModifier;

	headerDiv = document.getElementById('header');

	this.background = new Surface({
		content: '<div id="header"> </div>'
	});

	// Surface for the Title
		// TODO
			// Animate logo by making a surface for each letter.
	this.leftHeader = new Surface({
		content: '<span id="title"><img id="logo" src="images/logo_ohako.png" alt="OHAKO" /></span>'
	});

	this.rightHeader = new Surface({
		content: '<div id="header_user_div">\
						<div id="header_user_image">\
							<img src="images/userProfileImage.png" alt="Profile Picture" width ="25px" height="25px" /> \
						</div>\
					<div id="header_user_name"> Log In </div>\
					</div>',
		properties: {
			textAlign: 'right'
		}
	});

	this.view = new View();

	this.view.add(this.background);

	this.view.add(this.leftHeader);
	this.view.add(this.rightHeader);
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