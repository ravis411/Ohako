
function Mailbox() {
	var Surface = famous.core.Surface;
	var Modifier = famous.core.Modifier;
	var View = famous.core.View;
	var Transform = famous.core.Transform;
	var StateModifier = famous.modifiers.StateModifier;

	var EventHandler = famous.core.EventHandler;

	this.transitionMod = new Modifier({
		transform: Transform.translate(-360, 0, 0)
	});

	this.backgroundInterior = new Surface({
		content: '<div id="mailboxInterior"> </div>'
	});

	this.mailList = new Surface({
		content: '<div id="mailList">\
						<div class="mailItem" id="mailItem1"> Friend </div> \
						<div class="mailItem" id="mailItem2"> Venue </div>\
						<div class="mailItem" id="mailItem3"> Friend1 </div> \
				</div>'
	})

	this.mailView = new Surface({
		content: '<div id="mailView">\
						<div id="mailMessagesDiv">\
							<div>Select a message from left.</div>\
						</div>\
						<div id="mailInputDiv">\
							<input type="text" name="message" placeholder="Enter a message..."><div id="mailMessageSubmitButton"></div>\
						</div>\
				</div>'
	});

	this.view = new View();

	this.view.add(this.backgroundInterior);

	this.view.add(this.mailList);
	this.view.add(new Modifier({transform: Transform.translate(120, 0, 0)})).add(this.mailView);
}

Mailbox.prototype.slideIn = function() {
	this.transitionMod.setTransform(Transform.translate(0,0,0), {duration: 500, curve: 'easeIn'})
}

Mailbox.prototype.close = function() {
	this.transitionMod.setTransform(Transform.translate(-360,0,0), {duration: 500, curve: 'easeOut'})
}

Mailbox.prototype.getTransitionMod = function() {
	return this.transitionMod;
}

Mailbox.prototype.getView = function() {
	return this.view;
}