let tracks = [];
let lyrics;

const GENIUS_URL = 'https://genius-song-lyrics1.p.rapidapi.com';
const GENIUS_OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0c2286d76bmshec233881f1e6be2p1cfee8jsn1e295e4c1b73',
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
};

const OPENAI_URL = 'https://open-ai21.p.rapidapi.com/texttoimage2';
const OPENAI_OPTIONS = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '0c2286d76bmshec233881f1e6be2p1cfee8jsn1e295e4c1b73',
		'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
	}
};

// Retrieves data from genius API
async function searchSong(searchQuery) {
    const searchSongUrl = `${GENIUS_URL}/search/?q=${searchQuery}&per_page=10&page=1`;
    
    const response = await fetch(searchSongUrl, GENIUS_OPTIONS);
    const result = await response.text();
    const data = JSON.parse(result);

    const { id, artist_names, title, song_art_image_url, release_date_for_display } = data.hits[0].result;
    console.log(data.hits[0].result);

    const song = {
        id: id,
        artist: artist_names,
        title: title,
        photo: song_art_image_url, 
        date: release_date_for_display,
    };
    return song;
}

// Retrieves lyrics
async function searchLyrics(songId) {
    const searchLyricsUrl = `${GENIUS_URL}/song/lyrics/?id=${songId}`;
    
    const response = await fetch(searchLyricsUrl, GENIUS_OPTIONS);
    const result = await response.text();
    const data = JSON.parse(result);
    const { body } = data.lyrics.lyrics;
    
    return body.html;
}

function storeData(data) {
    localStorage.setItem(data.title, JSON.stringify(data));
}

function returnsData(title) {
    return JSON.parse(localStorage.getItem(title));
}

// Populates HTML with API data
async function onSearchClick(event) {
    event.preventDefault();

    // Emptying elements 
    $('#artist-photo').empty();
    $('.footer-section').empty();
    $('#artist-details').empty();
    $('#lyrics').empty();
    $('#ai-image').empty();
    
    const searchInput = $("#artist-name").val().trim();
    if (!searchInput) {
        return;
    }

    const { id, artist, title, photo, date } = await searchSong(searchInput);
    const lyrics = await searchLyrics(id);
    
    // Populates the tracks array
    tracks.push(title);
    
    // Populates the buttons
    displayButtons();

    // HTML Handling
    const uri = `https://genius.com/songs/${id}/apple_music_player`
    $('.footer-section').append(`<iframe allow="encrypted-media *;" src="${ uri }"></iframe>`);
        
    // Description Details
    let titleElem = $(`<h3>Song title </h3> <p>${ title }</p>`);
    let authorElem = $(`<p>Artist </p><p>${ artist }</p>`);
    let dateElem; 
    if (date) {
        dateElem = $(`<p>Album Released date </p><p>${ date }</p>`);
    }
    $('#artist-details').append(titleElem)
        .append(authorElem)
        .append(dateElem);

    // Photo
    let photoElem = $(`<img src="${photo}"></img>`);
    $('#artist-photo').append(photoElem);

    // Lyrics
    $('#lyrics').append(lyrics);


    // AI Image
    const aiImage = await convertSongToImage(lyrics);
    let imageElem = $(`<img src="${aiImage}" class="ai-image"></img>`);
    $('#ai-image').append(imageElem);

    let storeObject = {id, artist, title, photo, date, lyrics, aiImage};
    storeData(storeObject);
}

// Displays history buttons
function displayButtons() {
    $("#search-history").empty();

    for (var i = 0; i < tracks.length; i++) {    
        var btn = $("<button>")
            .append('<i class="fas fa-music pr-2"></i>')
            .addClass("btn btn-secondary bg-transparent")
            .attr("data-name", tracks[i])
            .append(tracks[i])
        $("#search-history").append(btn)
        $(btn).on( "click", function(event) {
            event.preventDefault();
            console.log("clicked");
            const title = $(this).attr("data-name");
            let song = returnsData(title);
            console.log(song);
        });
    }
    
};

// Open AI converts Song to one image
async function convertSongToImage(lyrics) {
    const songToImageUrl = `${OPENAI_URL}`;
    const body = { text: lyrics }
    OPENAI_OPTIONS.body =  JSON.stringify(body);
    try {
        const response = await fetch(songToImageUrl, OPENAI_OPTIONS);
        const result = await response.text();
        const openAiData = JSON.parse(result);
        console.log(openAiData.generated_image)
        
        return openAiData.generated_image;
    } catch (error) {
	    console.error(error);
    }
    
}

// Generating modal
async function onGenerateAIImageClick () {
    // AI Image
    $('#ai-question').empty();
    const aiImage = await convertSongToImage(lyrics);
    let imageElem = $(`<img src="${aiImage}" class="ai-image"></img>`);
    $('#ai-image').empty();
    $('#ai-image').append(imageElem);
}

$(document).on("click", "#search-artist", onSearchClick);
$(document).on("click", "#ai-generate", onGenerateAIImageClick);

// Local storage
