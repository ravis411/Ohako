/* ****
	Functions for mail messages
*/
var mailMessagesDivScrollPaneAPI = null;

function initMail(){
	//Initialise the JScrollPane
	mailMessagesDivScrollPaneAPI = $('#mailMessagesDiv').jScrollPane().data('jsp');
	
	$('#mailList').on('click', '.mailItem' , handleMailClick);
	
	$('#mailMessageSubmitButton').on('click', saveMessage);
	$("#mailInputDiv input").keyup(function (e) {	if (e.keyCode == 13) {	saveMessage();	}	});

	loadMailThreads();
}

function loadMailThreads(){
	$.post("/scripts/getThreads.php",{}, function(result){
		$("#mailList").html(result);
	});
}


function handleMailClick(e){
	if( $(this).hasClass("selectedMailThread") ){
		mailMessagesDivScrollPaneAPI.getContentPane().html("Select a message from left.");
		mailMessagesDivScrollPaneAPI.reinitialise();
		$(this).removeClass("selectedMailThread");
	}
	else{
		$(".selectedMailThread").removeClass("selectedMailThread");
		$(this).addClass("selectedMailThread");
		displayMailForSelectedThread();
	}

}

function displayMailForSelectedThread(){
		$.post("/scripts/getMessages.php",{thread:$(".selectedMailThread").html()}, function(result){
			mailMessagesDivScrollPaneAPI.getContentPane().html(result);
			mailMessagesDivScrollPaneAPI.reinitialise();
			mailMessagesDivScrollPaneAPI.scrollToBottom()
		});
}

function saveMessage(){
	var threadName = $(".selectedMailThread").html();
	var messageText = $("#mailInputDiv input").val();
	
	if(threadName == undefined){
		return;
	}
	$.post("/scripts/saveMessage.php",
		{
			thread:threadName,
			message:messageText
		},
		function(data, status){
			if(data == "Success"){
				displayMailForSelectedThread();
				$("#mailInputDiv input").val("");
			}else{
				//alert("Data: " + data + ". Success: " + status);
				displayMailForSelectedThread();
			}
		});
}

/*
	End of mail functions
*//* ****
	Functions for mail messages
*/
var mailMessagesDivScrollPaneAPI = null;

function initMail(){
	//Initialise the JScrollPane
	mailMessagesDivScrollPaneAPI = $('#mailMessagesDiv').jScrollPane().data('jsp');
	
	$('#mailList').on('click', '.mailItem' , handleMailClick);
	
	$('#mailMessageSubmitButton').on('click', saveMessage);
	$("#mailInputDiv input").keyup(function (e) {	if (e.keyCode == 13) {	saveMessage();	}	});

	loadMailThreads();
}

function loadMailThreads(){
	$.post("/scripts/getThreads.php",{}, function(result){
		$("#mailList").html(result);
	});
}


function handleMailClick(e){
	if( $(this).hasClass("selectedMailThread") ){
		mailMessagesDivScrollPaneAPI.getContentPane().html("Select a message from left.");
		mailMessagesDivScrollPaneAPI.reinitialise();
		$(this).removeClass("selectedMailThread");
	}
	else{
		$(".selectedMailThread").removeClass("selectedMailThread");
		$(this).addClass("selectedMailThread");
		displayMailForSelectedThread();
	}

}

function displayMailForSelectedThread(){
		$.post("/scripts/getMessages.php",{thread:$(".selectedMailThread").html()}, function(result){
			mailMessagesDivScrollPaneAPI.getContentPane().html(result);
			mailMessagesDivScrollPaneAPI.reinitialise();
			mailMessagesDivScrollPaneAPI.scrollToBottom()
		});
}

function saveMessage(){
	var threadName = $(".selectedMailThread").html();
	var messageText = $("#mailInputDiv input").val();
	
	if(threadName == undefined){
		return;
	}
	$.post("/scripts/saveMessage.php",
		{
			thread:threadName,
			message:messageText
		},
		function(data, status){
			if(data == "Success"){
				displayMailForSelectedThread();
				$("#mailInputDiv input").val("");
			}else{
				//alert("Data: " + data + ". Success: " + status);
				displayMailForSelectedThread();
			}
		});
}

/*
	End of mail functions
*/


/* ****
	Functions for mail messages
*/
var mailMessagesDivScrollPaneAPI = null;

function initMail(){
	//Initialise the JScrollPane
	mailMessagesDivScrollPaneAPI = $('#mailMessagesDiv').jScrollPane().data('jsp');
	
	$('#mailList').on('click', '.mailItem' , handleMailClick);
	
	$('#mailMessageSubmitButton').on('click', saveMessage);
	$("#mailInputDiv input").keyup(function (e) {	if (e.keyCode == 13) {	saveMessage();	}	});
	loadMailThreads();
}

function loadMailThreads(){
	$.post("http://wrytek.us/scripts/mail/getThreads.php",{}, function(result){
		$("#mailList").html(result);
	});
}


function handleMailClick(e){
	if( $(this).hasClass("selectedMailThread") ){
		mailMessagesDivScrollPaneAPI.getContentPane().html("Select a message from left.");
		mailMessagesDivScrollPaneAPI.reinitialise();
		$(this).removeClass("selectedMailThread");
	}
	else{
		$(".selectedMailThread").removeClass("selectedMailThread");
		$(this).addClass("selectedMailThread");
		displayMailForSelectedThread();
	}

}

function displayMailForSelectedThread(){
		$.post("http://wrytek.us/scripts/mail/getMessages.php",{thread:$(".selectedMailThread").html()}, function(result){
			mailMessagesDivScrollPaneAPI.getContentPane().html(result);
			mailMessagesDivScrollPaneAPI.reinitialise();
			mailMessagesDivScrollPaneAPI.scrollToBottom()
		});
}

function saveMessage(){
	var threadName = $(".selectedMailThread").html();
	var messageText = $("#mailInputDiv input").val();
	
	if(threadName == undefined){
		return;
	}
	$.post("http://wrytek.us/scripts/mail/saveMessage.php",
		{
			thread:threadName,
			message:messageText
		},
		function(data, status){
			if(data == "Success"){
				displayMailForSelectedThread();
				$("#mailInputDiv input").val("");
			}else{
				//alert("Data: " + data + ". Success: " + status);
				displayMailForSelectedThread();
			}
		});
}