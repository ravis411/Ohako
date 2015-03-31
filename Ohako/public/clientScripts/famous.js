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
var Lightbox = famous.views.Lightbox;

Transitionable.registerMethod('spring', SpringTransition);

var headerContext;
var mainContext;
var clickLocation;

var content;
var header;

function famousInit(){

	var mainContentDiv = document.getElementById('contents');

	mainContext = Engine.createContext(mainContentDiv);

	header = new Header();
	content = new Content();

	var modifier = new Modifier({ 
	    transform: Transform.translate(0, 50),
	});

	mainContext.add(modifier).add(content.getView());
	mainContext.add(header.getView());

	content.setContent();
	
	enableButtons();
}

function famousDisplay(html){
	console.log(html);

	content.openProfile(html);
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