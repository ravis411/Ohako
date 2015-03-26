
function karaokeInit(){
	$('.songSelection').on('click', function(){requestSong($(this).attr('value'), $(this).html())});
}

function requestSong(song, artist){

	$.post("/scripts/putData/addRequest.php", {artist: artist, song: song}, function(result){
			requests = jQuery.parseJSON(result);
			string = "";
			counter=0;
			for (request=0; request<10; request++) {
				if (request==0){
					$('#currentSinger').html(requests[request]['userName']);
					$('#currentSinger').val(requests[request]['ID']);
					$('#currentSong').html(requests[request]['artist']);
					$('#currentArtist').html(requests[request]['song']);
					continue;
				}
				string+= "<div class=\"requestName\" value=\""+requests[request]['ID']+"\">"+requests[request]['userName']+"</div>";
				string+="<div class=\"requestSong\" value=\""+requests[request]['ID']+"\">"+requests[request]['artist']+"</div><br/>";
				string+="<div class=\"requestArtist\" value=\""+requests[request]['ID']+"\">"+requests[request]['song']+"</div><br/>";
			}

			$('#queue').html(string);
			$('#requestScreen').css("display", "block");
			$('#queue').jScrollPane();

			// $('#profilePicture').html("<img width=120 height=105 src=\"" + profileData[0].profilePicture +"\" />");
			// $('#profileUserName').html(profileData[0].userName);
		});

}