
{!! HTML::style('/css/viewSongbook.css') !!}

<!-- SongBook: View.SongBook -->
				<div id="songBook">
					<div id="songBookInterior">
						<div id="profilePicture">
							{!! HTML::image($data[0]['profilePicture'], $data[0]['userName'], array( 'width' => 120, 'height' => 105 )) !!}
						</div>

						<div id="profileUserName">
						{{ $data[0]['userName'] }}
						</div>

						<div id="profileStarRating">
						I'm new at this still... <br/>
{!! HTML::image("/images/starRating.jpg", "New Here", array( 'width' => 200, 'height' => 40 )) !!}

						</div>

						<br style="clear: both;"/>

						<div id="profileSongBook">
						<div id="topSongs">
							<div class="profileLabel"> My Top Songs </div>
								None yet to show...  I need to get singing!<br/><br/> 
							<div class="profileLabel"> My Top Artists </div>
								None yet to show...  You need to sing!
						</div>
						</div>
					</div>
				</div>
<!-- END SongBook: View.SongBook -->