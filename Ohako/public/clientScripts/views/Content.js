

function Content() {
	var Surface = famous.core.Surface;
	var Modifier = famous.core.Modifier;
	var View = famous.core.View;
	var Transform = famous.core.Transform;
	var StateModifier = famous.modifiers.StateModifier;

	var EventHandler = famous.core.EventHandler;

	this.karaokeBook = new Surface({
		content: '<!-- KaraokeSongBook: View.KaraokeSongBook -->\
				<div id="karaokeSongBook">\
				<div id="karaokeSongBookList">\
						<ul id="songBookAdd">\
\
				        </ul>\
					</div>\
					<div id="requestScreen">\
\
							<div id="waitingTitle"> Right Now: </div>\
							<div id="currentDetails">\
							<div id="currentSinger">\
								</div><br/>\
								<div id="currentSong">\
								</div>\
								<div id="currentArtist">\
								</div>\
							</div>\
\
\
						<div id="queueTitle">\
							Coming Up...\
						</div> <br style="clear:both;"/>\
\
						<div id="queue">\
\
						</div>\
\
					</div>\
					\
				</div>\
				<!-- END KaraokeSongBook: View.KaraokeSongBook -->'});

	this.chatRoom = new Surface({
		content: '<div id="head">\
		<form id="roomInput" action="">\
      <input id="r" autocomplete="off" /><button>Change Room</button>\
    </form>\
	</div>\
  <div id="Chat_Container">\
   <div id="Chat"></div>\
  </div>'});

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
	                    <div id="adHeaderFeatured">  </div>\
	                    <img value="1" class="contentVenueImage" src="images/ads/1.png" id="featuredImage"/>\
	                </div>\
	\
	                <div id="customContent">\
	                    <div id="adHeaderTonight">  </div>\
	                    <img value="3" class="contentVenueImage" src="images/ads/3.png" id="customImage"/>\
	                </div>\
	            </div>\
	            <!-- End Home.SearchAndDiscover -->\
	\
	            <!-- Home.Venue -->\
	            <div id="homeVenue">\
					<div id="head">\
		<form id="roomInput" action="">\
      <input id="r" autocomplete="off" /><button>Change Room</button>\
    </form>\
	</div>\
  <div id="Chat_Container">\
   <div id="Chat"></div>\
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

Content.prototype.openChat = function() {
	this.karaokeBookMod = new Modifier({
		transform: Transform.translate(0, 225, 0)
	});

	this.view.add(this.karaokeBookMod).add(this.karaokeBook);
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