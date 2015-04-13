
function Footer() {
	var Surface = famous.core.Surface;
	var Modifier = famous.core.Modifier;
	var View = famous.core.View;
	var Transform = famous.core.Transform;
	var StateModifier = famous.modifiers.StateModifier;

	var EventHandler = famous.core.EventHandler;

	headerDiv = document.getElementById('header');

	this.background = new Surface({
		content: '<div id="controlsBox"> </div>'
	});

	// Surface for the Title
		// TODO
			// Animate logo by making a surface for each letter.
	this.menu = new Surface({
		size: [true, true],
		content: '<div id="controlsNav">\
					<img id="mailboxNav" class="option" src="images/mailbox.png" alt="Mailbox" />\
					<img id="songBookNav" class="option" src="images/songbook.png" alt="Songbook"/>\
					<img id="searchNav" class="option" src="images/search.png" alt="Search" />\
					<img id="settingsNav" class="option" src="images/settings.png" alt="Settings" />\
				</div>'
	});

	this.adSpace = new Surface({
		size: [true, true],
		content: '<div id="adspace">\
					<img src="images/ad.jpg" width="326px" height="101px"/>\
				</div>',
		properties: {
		}
	});

	this.besideMenu = new Modifier({
	    transform: Transform.translate(37, 0),
	});

	this.view = new View();

	this.view.add(this.background);

	var behind = new Modifier({ 
	    transform: Transform.behind
	});

	this.view.add(this.menu);
	this.view.add(this.besideMenu).add(behind).add(this.adSpace);

	this.buttonsInit();
}

Footer.prototype.buttonsInit = function() {
	this.menu.on('click', function(data){
		console.log(data.target.attributes.id.value);
		switch (data.target.attributes.id.value) {
			case 'mailboxNav':
				displayView(View.Mailbox);
				break;
		}
		//displayView(View.home);
	});

	// this.rightHeader.on('click', function(data){
	// 	console.log(data.target);
	// 	clickLocation = {layerX: data.layerX, layerY: data.layerY};
	// 	id = data.target.attributes.value.value;
	// 	if (id)
	// 		displayView(View.Venue, id);
	// });
}

Footer.prototype.getView = function() {
	return this.view;
}