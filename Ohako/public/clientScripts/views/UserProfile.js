
function UserProfile() {
	var Surface = famous.core.Surface;
	var Modifier = famous.core.Modifier;
	var View = famous.core.View;
	var Transform = famous.core.Transform;
	var StateModifier = famous.modifiers.StateModifier;

	var EventHandler = famous.core.EventHandler;

	this.transitionMod = new Modifier({
		transform: Transform.translate(-360, 0, 0)
	});

	this.entireProfile = new Surface({
		content: '<!-- SongBook: View.SongBook -->\
				<div id="songBook">\
					<div id="songBookInterior">\
						<div id="profilePicture">\
						</div>\
\
						<div id="profileUserName">\
						</div>\
\
						<div id="profileStarRating">\
							User\'s details here. \
						</div>\
\
						<br style="clear: both;"/>\
\
						<div id="profileSongBook">\
							Multi-Tab content. \
						</div>\
					</div>\
				</div>\
<!-- END SongBook: View.SongBook -->'
	});

	this.view = new View();

	this.view.add(this.entireProfile);
}

UserProfile.prototype.slideIn = function() {
	this.transitionMod.setTransform(Transform.translate(0,0,0), {duration: 500, curve: 'easeIn'})
}

UserProfile.prototype.close = function() {
	this.transitionMod.setTransform(Transform.translate(-360,0,0), {duration: 500, curve: 'easeOut'})
}

UserProfile.prototype.setHTML = function(htmlContent) {
	this.entireProfile.setContent(htmlContent);
}

UserProfile.prototype.getTransitionMod = function() {
	return this.transitionMod;
}

UserProfile.prototype.getView = function() {
	return this.view;
}