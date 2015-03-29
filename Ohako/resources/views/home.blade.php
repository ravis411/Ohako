
@extends('layout')

@section('content')
	<!-- Main view...  View.Home -->
		<div id="home">
			<!-- Home.SearchAndDiscover -->
        	<div id="searchAndDiscover">
                <div id="featuredContent">
                    <div id="adHeader"> Featured This Week </div>
                    <img value="1" class="contentVenueImage" src="images/ads/1.png" id="featuredImage"/>
                </div>

                <div id="customContent">
                    <div id="adHeader"> Happening Tonight </div>
                    <img value="3" class="contentVenueImage" src="images/ads/3.png" id="customImage"/>
                </div>
            </div>
            <!-- End Home.SearchAndDiscover -->

            <!-- Home.Venue -->
            <div id="homeVenue">
				<div id="homeChatBoxDiv">
					<div id="chatUsers">
						<img id="usersLogo" src="images/logo_users.png" alt="Current Users" width="80px" height="26" />
						<div id="chatUsersList">
							<div class="userProfile" id="userProfileID1"> Don </div> 
							<div class="userProfile" id="userProfileID2"> June </div>
							<div class="userProfile" id="userProfileID3"> Cool Guy </div> 
							<div class="userProfile" id="userProfileID4"> Missy </div> 
							<div class="userProfile" id="userProfileID5"> LF Duet </div> 
							<div class="userProfile" id="userProfileID6"> Tommy </div> 
						</div>
					
					</div>

					<div id ="chatBox">
						<div id ="chatBoxScroll">
							<div class="chatMessage recievedChat">A Recieved Message</div>
							<div class="chatMessage sentChat">Sent by User</div>
						</div>
					</div>
					<div id="chatBoxInputDiv">
						<input type="text" placeholder="Chat">
					</div>
				</div>
            </div>
        </div>   
	<!-- End main view...  View.Home -->

@stop