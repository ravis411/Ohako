
<div id="upperDiv">
	<div id="loginDiv">
		<form id="loginForm" name="loginForm" method="post">
			<input type="hidden" name="_token" value="' + inputToken + '">
				<h2>Log in</h2>
				<div id="loginFail" class="fail"></div>
				<input id="loginFormUserName" name="email" type="text" placeholder="Email" autofocus required /><br>
				<input id="loginFormPassword" name="password" type="password" placeholder="Password" required /><br>
				<input id="loginFormSubmitButton" type="submit" name="submit" class="button" value="Login" /><div id="loginFormSwitchToRegistrationButton">Register?</div>
		</form>
	</div>

	<div id="registrationDiv">\
		<form id="registrationForm" name="registrationForm" method="post" action="">\
			<h2>Register!</h2>\
			<div id="registrationFail" class="fail"></div>\
			<input id="registrationFirstName" class="registrationName" name="firstName" type="text" placeholder="First Name" required /><input id="registrationLastName" class="registrationName" name="lastName" type="text" placeholder="Last Name" required /><br>\
			<input id="registrationUserName" name="username" type="text" placeholder="User Name" required /><br>\
			<input id="registrationEmail" name="email" type="email" placeholder="Email" required /><br>\
			<input id="registrationPassword" name="password" type="password" placeholder="Password" required /><br>\
			<input id="registrationPassword2" name="password2" type="password" placeholder="Verify Password" required /><br>\
			<input id="registrationSubmitButton" type="submit" name="submit" class="button" value="Register" />\
			<div id="registrationSwitchToLoginButton">Login?</div>\
		</form>\
	</div>
</div>