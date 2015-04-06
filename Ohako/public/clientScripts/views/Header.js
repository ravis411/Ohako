
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
						<div id="header_user_image">\
							<img src="images/userProfileImage.png" alt="Profile Picture" width ="25px" height="25px" /> \
						</div>\
					<div id="header_user_name"> Log In </div>\
					</div>',
		properties: {
			textAlign: 'right'
		}
	});

	this.alignRight = new Modifier({
		origin: [1, 0],
		align: [1, 0]
	})

	this.view = new View();

	this.view.add(this.background);

	this.view.add(this.leftHeader);
	this.view.add(this.alignRight).add(this.rightHeader);

	this.buttonsInit();
}

Header.prototype.buttonsInit = function() {
	this.leftHeader.on('click', function(data){
		console.log(data.target);
		clickLocation = {layerX: data.layerX, layerY: data.layerY};
		id = data.target.attributes.value.value;
		if (id)
			displayView(View.Venue, id);
	});

	this.rightHeader.on('click', function(data){
		console.log(data.target);
		clickLocation = {layerX: data.layerX, layerY: data.layerY};
		id = data.target.attributes.value.value;
		if (id)
			displayView(View.Venue, id);
	});
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