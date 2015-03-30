/*
	Do NOT animated a div inside a Surface.
	Animate surfaces.

	http://book.famousmobileapps.com/full_app/footer.html
*/

var Engine = famous.core.Engine; //require('famous/src/core/Engine');
var Surface = famous.core.Surface; //require('famous/src/core/Surface');
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;

var StateModifier = famous.modifiers.StateModifier;
var Transitionable = famous.transitions.Transitionable;
var SpringTransition = famous.transitions.Spring;
var Easing = famous.transitions.Easing;

Transitionable.registerMethod('spring', SpringTransition);

var headerContext;
var mainContext;

function famousInit(){

	// var layout = new HeaderFooterLayout({
	//         headerSize: 50,
	//         footerSize: 100
	//     });

	var headerDiv = document.getElementById('header');
	var mainContentDiv = document.getElementById('mainContent')

	headerContext = Engine.createContext(headerDiv);
	mainContext = Engine.createContext(mainContentDiv);

	var header = new Surface({
		content: '<span id="title"><img id="logo" src="images/logo_ohako.png" alt="OHAKO" /></span>\
					<div id="header_user_div">\
						<div id="header_user_image">\
							<img src="images/userProfileImage.png" alt="Profile Picture" width ="25px" height="25px" /> \
						</div>\
					<div id="header_user_name"> Luk3 </div>\
					</div>',
		size: [360, 50],
		properties: {

		}
	});

//	layout.header.add(header);

	var content = new Surface({
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
								<div class="userProfile" id="userProfileID1"> Don </div> \
								<div class="userProfile" id="userProfileID2"> June </div>\
								<div class="userProfile" id="userProfileID3"> Cool Guy </div> \
								<div class="userProfile" id="userProfileID4"> Missy </div> \
								<div class="userProfile" id="userProfileID5"> LF Duet </div> \
								<div class="userProfile" id="userProfileID6"> Tommy </div> \
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
	})

	var modifier = new Modifier({ 
	    transform : Transform.translate(0, 50)
	});

	headerContext.add(header);
	mainContext.add(content); 

	content.on("click", function(data) {
		id = data.target.attributes.value;
		if (id)
			displayView(View.Venue, id);
	});

	enableButtons();
}

function famousDisplay(html){
	console.log(html);
	var displayContent = new Surface({
		origin: [-360, 0],
		content: html
	});

	var stateModifier = new StateModifier({
		transform: Transform.translate(0,0,0)
	});

	var spring = {
		method: 'spring',
		period: 1000,
		dampingRatio: 0.3
	};

	mainContext.add(stateModifier).add(displayContent);

	stateModifier.setTransform(Transform.translate(0, 0, 0), {duration: 1500, curve: Easing.outBounce});
}

function enableButtons(){
	var GenericSync = famous.inputs.GenericSync;
	var MouseSync = famous.inputs.MouseSync;
	var TouchSync = famous.inputs.TouchSync;
	var FastClick = famous.inputs.FastClick;



	// GenericSync.register({
	// 	"mouse": MouseSync,
	// 	"touch": TouchSync
	// });


}