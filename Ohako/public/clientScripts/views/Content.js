

function Content() {
	var Surface = famous.core.Surface;
	var Modifier = famous.core.Modifier;
	var View = famous.core.View;
	var Transform = famous.core.Transform;
	var StateModifier = famous.modifiers.StateModifier;

	var EventHandler = famous.core.EventHandler;

	this.background = new Surface({
		content: '<div id="content"> </div>'
	});

	// Surface for the Title
		// TODO
			// Animate logo by making a surface for each letter.
	// this.leftHeader = new Surface({
	// 	content: '<span id="title"><img id="logo" src="images/logo_ohako.png" alt="OHAKO" /></span>'
	// });

	// this.rightHeader = new Surface({
	// 	content: '<div id="header_user_div">\
	// 					<div id="header_user_image">\
	// 						<img src="images/userProfileImage.png" alt="Profile Picture" width ="25px" height="25px" /> \
	// 					</div>\
	// 				<div id="header_user_name"> Log In </div>\
	// 				</div>',
	// 	properties: {
	// 		textAlign: 'right'
	// 	}
	// });

	this.view = new View();

	this.view.add(this.background);
}

Content.prototype.setExteriorMain = function(data) {
	this.exteriorMain = new Surface({
		content: '<!-- Main view...  View.Home -->\
			<div id="home">\
				<!-- Home.SearchAndDiscover -->\
	        	<div id="searchAndDiscover">\
	                <div id="featuredContent">\
	                    <div id="adHeader"> Featured This Week </div>\
	                    <img value="1" class="contentVenueImage" src="images/ads/1.png" id="featuredImage"/>\
	                </div>\
	\
	                <div id="customContent">\
	                    <div id="adHeader"> Happening Tonight </div>\
	                    <img value="3" class="contentVenueImage" src="images/ads/3.png" id="customImage"/>\
	                </div>\
	            </div>\
	            <!-- End Home.SearchAndDiscover -->\
	\
	            <!-- Home.Venue -->\
	            <div id="homeVenue">\
					<div id="homeChatBoxDiv">\
						<div id="chatUsers">\
							<img id="usersLogo" src="images/logo_users.png" alt="Current Users" width="80px" height="26" />\
							<div id="chatUsersList">\
							</div>\
						\
						</div>\
	\
						<div id ="chatBox">\
							<div id ="chatBoxScroll">\
								<div class="chatMessage recievedChat">A Recieved Message</div>\
								<div class="chatMessage sentChat">Sent by User</div>\
							</div>\
						</div>\
						<div id="chatBoxInputDiv">\
							<input type="text" placeholder="Chat">\
						</div>\
					</div>\
	            </div>\
	        </div>   \
		<!-- End main view...  View.Home -->'
	});

	this.view.add(this.exteriorMain);

		this.exteriorMain.on('click', function(data){
		clickLocation = {layerX: data.layerX, layerY: data.layerY};
		id = data.target.attributes.value.value;
		if (id)
			displayView(View.Venue, id);
	});
}

Content.prototype.openVenueProfile = function(html) {
	// Create the surface with the returned html
	venueProfile = new Surface({
		content: html
	});

	// Create the Mod
		/*
			Mod can include many things to change the Surface.
			Everything added AFTER a mod obtains the mods.
			
			We will use transform to have the mod transform the surface.
				Here we scale it down to 0,0,0.

			This will grow the page
		*/
	this.growMod = new Modifier({
		transform: Transform.scale(0, 0, 0)
	});

	// Seperate mod to set the position of the surface
	this.positionMod = new Modifier({
		transform: Transform.translate(clickLocation.layerX, clickLocation.layerY, 0)
	});

	// Set the transform of the mod
		/*
			We want to scale the surface all the way up. 
		*/
	this.growMod.setTransform(Transform.scale(1,1,1), {duration: 500, curve: 'easeIn'});

	// Add a transition effect to the position mod
	this.positionMod.setTransform(Transform.translate(0,0,0), {duration: 500, curve: 'easeIn'});

	this.venueProfile = this.view.add(this.positionMod).add(this.growMod).add(venueProfile);
}

Content.prototype.closeToMain = function() {
	this.growMod.setTransform(Transform.scale(0,0,0), {duration: 500, curve: 'easeOut'});

	this.positionMod.setTransform(Transform.translate(0, 0,0), {duration: 500, curve: 'easeOut'});
}

Content.prototype.getView = function() {
	return this.view;
}