
function Settings() {
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
		content: '<!--Settings: View.Settings -->\
				<div id="settings">\
					<div id="settingsInterior">\
						<form id="settingsForm" action="http://www.usc.edu/cgi-bin/mail_form/shiffer@usc.edu" method="post" name="ContactForm" >\
						<span class="settingsLabel">Display Name </span>\
							<input id="settingsName" class="formField" type="text" name="displayName" required placeholder="current user name" style="text-align: right;"/>\
						<br style="clear:both;"/> <br/>\
\
						<span class="settingsLabel">Email</span>\
							<input id="settingsEmail" class="formField" type="text" name="email" style="text-align: right;" required placeholder="current email"/>\
						<br style="clear:both;"/> <br/>\
\
					    <span class="settingsLabel">Receive Notifications?</span>\
							<input type="radio" name="workRelated" id="chooseYes" value="Yes" /> Yes\
							<input type="radio" name="workRelated" id="chooseNo" value="Yes" /> No </span>\
						<br style="clear:both;"/> <br/>\
\
						<div id="submitContact" class="label" type="submit">\
				    		<input type="submit" value="Save" id="submit"/>\
				    	</div>\
						</form>\
\
						<form action="/scripts/putData/uploadPhoto.php" method="post" enctype="multipart/form-data">\
						<input type="hidden" name="_token" value="' + inputToken + '">\
						    Select image to upload:\
						    <input type="file" name="fileToUpload" id="fileToUpload">\
						    <input type="submit" value="Upload Image" name="submit">\
						</form>\
\
						<div id="settingsLogout">\
							<a href="/scripts/login/logout.php"> Log out</a>\
						</div>\
					</div>\
				</div>\
				<!-- END Settings: View.Settings -->'
	});

	this.view = new View();

	this.view.add(this.entirePage);
}

Settings.prototype.slideIn = function() {
	this.transitionMod.setTransform(Transform.translate(0,0,0), {duration: 500, curve: 'easeIn'})
}

Search.prototype.setHTML = function(htmlContent) {
	this.entirePage.setContent(htmlContent);
}

Settings.prototype.close = function() {
	this.transitionMod.setTransform(Transform.translate(-360,0,0), {duration: 500, curve: 'easeOut'})
}

Settings.prototype.getTransitionMod = function() {
	return this.transitionMod;
}

Settings.prototype.getView = function() {
	return this.view;
}

