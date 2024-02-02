
async function searchSong(){

// Empty elements before new data
$("#artist-tracks").empty();
const trackName = $("#artist-name").val().trim();
if (!trackName) {
    return;
}

const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${trackName}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5701b10cffmshde604a1858ed057p10e163jsnb3fbda7cd2d3',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();

    $('#artist-photo').empty()
    $('#artist-details').empty()

	    //console.log(result.data[0].album.cover_big);
    var artistImage = $(`<img src="${result.data[0].album.cover_big}" height="450" width="400" />`)
    $('#artist-photo').append(artistImage)

   //console.log(result.data[0].album.title);
      var albumTitle = $(`<h2>ARTIST NAME:</h2><h4>${result.data[0].artist.name}</h4>`)
   $('#artist-details').append(albumTitle)

   //console.log(result.data[0].preview);
   $('#artist-tracks').append('<h2><br/>TRACKS:</h2>')
   for(i = 0; i < result.data.length; i++){
    $('#artist-tracks').append(`<h4>${result.data[i].title} [${i + 1}]</h4>`)
   $('#artist-tracks').append(`<iframe src="${result.data[i].preview}"></iframe>`);
   }

    console.log(result.data);

} catch (error) {
	console.error(error);
}
}
console.log(searchSong())

$(document).on("click", "#search-artist", searchSong);