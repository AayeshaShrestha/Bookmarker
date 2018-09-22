document.getElementById('myForm').addEventListener('submit',addBookmark);

function addBookmark(e){
	//console.log('it works works works');

	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteAddress').value;

	if(!siteName || !siteURL){
		alert('Please fill the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteURL.match(regex)){
		alert('Please use a valid url');
		return false;
	}


	var bookmark = {
		name : siteName,
		url : siteURL
	}

	/*
	//local storage test
	localStorage.setItem('test','Hello Aayesha');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	*/

	if(localStorage.getItem('bookmarks') === null){
		//if bookmarks is null, init array
		var bookmarks = [];

		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	}else{
		//fetch bookmark from localstorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		bookmarks.push(bookmark);

		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	
	//prevent form from submitting
	e.preventDefault();
	fetchBookmarks();
}

function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	var resultHere = document.getElementById("bookmarkResult");
	resultHere.innerHTML = '';

	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		resultHere.innerHTML += '<div class="well">'+
									'<h3>'+name+'</h3>'+
									' <a class="btn btn-success" target="_blank" href="'+url+'">Visit</a> '+
									' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
								'</div>';
	}
}

function deleteBookmark(url){
	//console.log(url);
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			bookmarks.splice(i,1);
		}
		
	}

	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	fetchBookmarks();
}

