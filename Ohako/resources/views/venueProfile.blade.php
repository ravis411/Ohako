
{!! HTML::style('/css/viewVenue.css') !!}

	<!-- Venue: View.Venue -->
		<div id="venue">
			<div id="venueInterior">
				<div id="venueInteriorLogo" >
					{!! HTML::image($venue[0]['imageLocation'], $venue[0]['name'], array( 'width' => 135, 'height' => 100 )) !!}

				</div>

				<div id="venueDetails" >
					<div id="venueTitle"> {{ $venue[0]['name'] }} </div> <br/>
					<div id="drinks"> <img width="20px" height="20px" src="images/icons/drinks.png" alt="drinks"/> 
						@if ($details[0]['drinks'] != "true")
							<img id="prohibited" src="images/icons/prohibited.png" width="25px" height="25px" \>
						@endif
					</div>
					<div id="food"> <img width="20px" height="20px" src="images/icons/food.png" alt="food"/> 
					@if ($details[0]['food'] != "true")
							<img id="prohibited" src="images/icons/prohibited.png" width="25px" height="25px" \>
						@endif
					</div>
					<div id="patio"> <img width="20px" height="20px" src="images/icons/patio.png" alt="patio"/> 
					@if ($details[0]['patio'] != "true")
							<img id="prohibited" src="images/icons/prohibited.png" width="25px" height="25px" \>
						@endif
					</div>
					<div id="smoking"> <img width="25px" height="30px" src="images/icons/smoking.png" alt="smoking" /> 
						@if ($details[0]['smoking'] != "true")
							<img id="prohibited" src="images/icons/prohibited.png" width="25px" height="25px" \>
						@endif
					</div>
					<br/> <br/>
					<div id="karaokeListing"> <img id="karaokeIcon" width="20px" height="20px" src="images/icons/karaoke.png" alt="karaoke" /> 
						<div id="karaokeNights"> {{ $karaoke }} </div>  
					</div>
					<br/> 
					<div id="locationListing"> <img id="locationIcon" width="20px" height="20px" src="images/icons/location.png" alt="location" /> 
						<div id="location"> {{ $location[0]['street'] }} </div> 
					</div>
				</div>

				<br style="clear: both;"/>

				<div id="venueRating">
					<div id="venueStarCount" class="rateit">
					</div>
				</div>
				<script> $('#venueStarCount').rateit('value', {{ $venue[0]['rating'] }}); </script>

				<div id="venueContent">
					{{ $venue[0]['description'] }}
				</div>
			</div>
		</div>
	<!-- END Venue: View.Venue -->