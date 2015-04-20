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

Transitionable.registerMethod('spring', SpringTransition);

var headerContext;
var mainContext;
var clickLocation;

var content;
var header;

var mailBox;

var belowHeader = new Modifier({ 
	    transform: Transform.translate(0, 50),
	});

function famousInit(){

	var mainContentDiv = document.getElementById('contents');

	mainContext = Engine.createContext(mainContentDiv);

	header = new Header();
	content = new Content();
	footer = new Footer();

	mailBox = new Mailbox();

	var inFront = new Modifier({ 
	    transform: Transform.inFront
	});

	var belowContent = new Modifier({
		transform: Transform.translate(-1, 450),
	});

	mainContext.add(inFront).add(header.getView());
	mainContext.add(belowHeader).add(content.getView());
	mainContext.add(belowContent).add(footer.getView());
	//header.buttonsInit();

	content.setExteriorMain();
	
	//enableButtons();
}

function closeFamousView(){
	if (view==View.Mailbox)
		mailBox.close();
	else if (view==View.Venue)
		content.closeToMain();
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

function famousDisplayUserProfile(html) {
	content.slideIn(html);
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