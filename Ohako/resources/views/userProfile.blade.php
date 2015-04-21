
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
							User's details here. 
						</div>

						<br style="clear: both;"/>

						<div id="profileSongBook">
							Multi-Tab content. 
						</div>
					</div>
				</div>
<!-- END SongBook: View.SongBook -->