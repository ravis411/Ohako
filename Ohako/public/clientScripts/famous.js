/*
	Do NOT animated a div inside a Surface.
	Animate surfaces.

	Make this entire thing into a class!!!!

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
var Lightbox = famous.views.Lightbox;
var RenderController = famous.views.RenderController;

Transitionable.registerMethod('spring', SpringTransition);

var headerContext;
var mainContext;
var clickLocation;
var renderController;

var content;
var header;

var user;

var mailBox;

var belowHeader = new Modifier({ 
	    transform: Transform.translate(0, 50),
	});

function famousInit(){

	renderController = new RenderController();

	var mainContentDiv = document.getElementById('contents');

	mainContext = Engine.createContext(mainContentDiv);

	header = new Header();
	content = new Content();
	footer = new Footer();

	mailBox = new Mailbox();
	userProfile = new UserProfile();
	search = new Search();
	settings = new Settings();

	var inFront = new Modifier({ 
	    transform: Transform.inFront
	});

	var belowContent = new Modifier({
		transform: Transform.translate(-1, 450),
	});
	var inFront2 = new Modifier({ 
	    transform: Transform.inFront
	});

	mainContext.add(inFront).add(header.getView());
	mainContext.add(inFront2).add(belowContent).add(footer.getView());
	mainContext.add(belowHeader).add(content.getView());
	//header.buttonsInit();

	content.setExteriorMain();
	
	//enableButtons();
}

function closeFamousView(){
	if (view==View.Mailbox)
		mailBox.close();
	else if (view==View.SongBook)
		userProfile.close();
	else if (view==View.Search)
		search.close();
	else if (view==View.Settings)
		settings.close();
	else if (view==View.Venue)
		content.closeToMain();
}

function famousPullDown() {
	if (header.isDown())
		header.pullUp();
	else
		header.pullDown();
}

function famousEngine() {
	return Engine;
}

function famousRightHeaderClick() {
	if (!user.isLoggedIn())
		header.displayLogIn();
	else{
		if (checkedIn)
			header.displayCheckOut();
		else
			header.displayCheckIn();
	}
	famousPullDown();

	Engine.defer(function() {
		Engine.nextTick(function() {
			if (!user.isLoggedIn()) {
				header.buttonsLoginInit();
				loginButtonsInit();
			}
			else{
				header.checkInButtonsInit();
				//chat.buttontsInit();
			}
		});
	});
}

var globalChat = null;

function famousInitHTML() {
	Engine.defer(function() {
		Engine.nextTick(function() {
			// ADD ALL HTML DEPENDENCIES HERE
				// Load everything in resources/views/layout.blade.php
				// Call their functions here.
				// Or load things in here....
				globalChat = new Chat("userID", "Chat", "venue");
		});
	});
}

function famousDisplayMailBox() {
	var inFront = new Modifier({ 
	    transform: Transform.inFront
	});

	var belowHeader1 = new Modifier({ 
	    transform: Transform.translate(0, 50),
	});

	mainContext.add(belowHeader1).add(mailBox.getTransitionMod()).add(mailBox.getView());
	mailBox.slideIn();
}

function famousCloseMailBox() {

}

function famousDisplaySettings() {
	var inFront = new Modifier({ 
	    transform: Transform.inFront
	});

	var belowHeader1 = new Modifier({ 
	    transform: Transform.translate(0, 50),
	});

	mainContext.add(belowHeader1).add(settings.getTransitionMod()).add(settings.getView());
	settings.slideIn();
}

function famousDisplaySearch() {
	var inFront = new Modifier({ 
	    transform: Transform.inFront
	});

	var belowHeader1 = new Modifier({ 
	    transform: Transform.translate(0, 50),
	});

	mainContext.add(belowHeader1).add(search.getTransitionMod()).add(search.getView());
	search.slideIn();
}

function famousDisplayUserProfile(html) {
	var inFront = new Modifier({ 
	    transform: Transform.inFront
	});

	var belowHeader1 = new Modifier({ 
	    transform: Transform.translate(0, 50),
	});

	mainContext.add(belowHeader1).add(userProfile.getTransitionMod()).add(userProfile.getView());
	userProfile.slideIn();
}

function famousSetUserProfile(data) {
	userProfile.setHTML(data);
}

function famousDisplayVenueProfile(html){
	
	content.openVenueProfile(html);
	return; 

	// Create the surface with the returned html
	var displayContent = new Surface({
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
	var growMod = new Modifier({
		transform: Transform.scale(0, 0, 0)
	});

	// Seperate mod to set the position of the surface
	var positionMod = new Modifier({
		transform: Transform.translate(clickLocation.layerX, clickLocation.layerY, 0)
	});

	// Set the transform of the mod
		/*
			We want to scale the surface all the way up. 
		*/
	growMod.setTransform(Transform.scale(1,1,1), {duration: 1000, curve: Easing.outBounce});

	// Add a transition effect to the position mod
	positionMod.setTransform(Transform.translate(0,0,0), {duration: 1000, curve: Easing.outBounce});

	// Set the transition
	//transitionable.set([300, 400], {duration: 5000});

	mainContext.add(positionMod).add(growMod).add(displayContent);
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