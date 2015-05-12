
function karaokeInit(){
	$('.songSelection').on('click', function(){requestSong($(this).attr('value'), $(this).html())});
	$('#toggleSongBook').on('click', function(){toggleBook()});

	getSongs();
}

function toggleBook()
{
	if ($('#requestScreen').css("display") == "block")
		$('#requestScreen').hide();
	else{
		$('#requestScreen').show();
		$('#queue').jScrollPane();
	}
}

function requestSong(song, artist){

	$.post("/addRequest", {_token: inputToken, userID: user.id, artist: artist, song: song}, function(result){
			console.log(result);
			requests = result;
			string = "";
			counter=0;
			for (request=0; request<10 && request<requests.length; request++) {
				if (request==0){
					$('#currentSinger').html(requests[request]['userName']);
					$('#currentSinger').val(requests[request]['ID']);
					$('#currentSong').html(requests[request]['artist']);
					$('#currentArtist').html(requests[request]['song']);
				}
				else{
				string+= "<div class=\"requestName\" value=\""+requests[request]['ID']+"\">"+requests[request]['userName']+"</div>";
				string+="<div class=\"requestSong\" value=\""+requests[request]['ID']+"\">"+requests[request]['artist']+"</div><br/>";
				string+="<div class=\"requestArtist\" value=\""+requests[request]['ID']+"\">"+requests[request]['song']+"</div>";
			}
			}

			toastr.success("Request added!");

			$('#queue').html(string);
			//toggleBook();
			//$('#queue').jScrollPane();

			// $('#profilePicture').html("<img width=120 height=105 src=\"" + profileData[0].profilePicture +"\" />");
			// $('#profileUserName').html(profileData[0].userName);
		});
}

function getSongs(song, artist){

	$.get("/getRequests", function(result){
			requests = result;
	
			string = "";
			counter=0;
			if (!requests.length<1){
			for (request=0; request<10 && request<requests.length; request++) {
				if (request==0){
					$('#currentSinger').html(requests[request]['userName']);
					$('#currentSinger').val(requests[request]['ID']);
					$('#currentSong').html(requests[request]['artist']);
					$('#currentArtist').html(requests[request]['song']);
					continue;
				}
				else{
				string+= "<div class=\"requestName\" value=\""+requests[request]['ID']+"\">"+requests[request]['userName']+"</div>";
				string+="<div class=\"requestSong\" value=\""+requests[request]['ID']+"\">"+requests[request]['artist']+"</div><br/>";
				string+="<div class=\"requestArtist\" value=\""+requests[request]['ID']+"\">"+requests[request]['song']+"</div>";
			}
			}
		}

			$('#queue').html(string);
			//$('#requestScreen').css("display", "block");
		//	$('#queue').jScrollPane();

			// $('#profilePicture').html("<img width=120 height=105 src=\"" + profileData[0].profilePicture +"\" />");
			// $('#profileUserName').html(profileData[0].userName);
		});
}