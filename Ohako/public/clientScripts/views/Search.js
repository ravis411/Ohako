
function Search() {
	var Surface = famous.core.Surface;
	var Modifier = famous.core.Modifier;
	var View = famous.core.View;
	var Transform = famous.core.Transform;
	var StateModifier = famous.modifiers.StateModifier;

	var EventHandler = famous.core.EventHandler;

	this.transitionMod = new Modifier({
		transform: Transform.translate(-360, 0, 0)
	});

	this.entirePage = new Surface({
		content: '<!--Search: View.Search -->\
				<div id="search">\
					<div id="searchInterior">\
						<div id="searchMap">\
							<!--<iframe\
							  width="350"\
							  height="300"\
							  frameborder="0" style="border:0"\
							  src="https://www.google.com/maps/embed/v1/search?key=AIzaSyALqRx10_DMkJMChXFLtBBy6VJiBmyiZFc&q=karaoke&zoom=12&center=36.150000,-115.174247">\
							</iframe>-->\
\
							<div id="searchInput">\
							<form id="settingsForm" action="http://www.usc.edu/cgi-bin/mail_form/shiffer@usc.edu" method="post" name="ContactForm" >\
\
							<input id="settingsName" class="formField" type="text" name="displayName" required placeholder="Search" style="text-align: right;"/>\
							</div>\
							<br style="clear:both;"/> <br/>\
							</form>\
						</div>\
					</div>\
				</div>\
				<!-- END Search: View.Search -->'
	});

	this.view = new View();

	this.view.add(this.entirePage);
}

Search.prototype.slideIn = function() {
	this.transitionMod.setTransform(Transform.translate(0,0,0), {duration: 500, curve: 'easeIn'})
}

Search.prototype.close = function() {
	this.transitionMod.setTransform(Transform.translate(-360,0,0), {duration: 500, curve: 'easeOut'})
}

Search.prototype.getTransitionMod = function() {
	return this.transitionMod;
}

Search.prototype.getView = function() {
	return this.view;
}