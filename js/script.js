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

async function searchLyrics(songId) {
    const searchLyricsUrl = `${GENIUS_URL}/song/lyrics/?id=${songId}`;
    
    const response = await fetch(searchLyricsUrl, GENIUS_OPTIONS);
    const result = await response.text();
    const data = JSON.parse(result);
    const { body } = data.lyrics.lyrics;
    
    return body.html;
}

async function onSearchClick() {
    $('#artist-photo').empty();
    $('.footer-section').empty();
    $('#artist-details').empty();
    $('#ai-image').empty();
   

    const searchInput = $("#artist-name").val().trim();
    if (!searchInput) {
        return;
    }

    const { id, artist, title, photo, date } = await searchSong(searchInput);
    lyrics = await searchLyrics(id);

    // HTML Handling
    const uri = `https://genius.com/songs/${id}/apple_music_player`
    $('.footer-section').append(`<iframe allow="encrypted-media *;" src="${ uri }"></iframe>`);
        
    // Description Details
    let titleElem = $(`<h3>Song title </h3> <p>${ title }</p>`);
    let authorElem = $(`<p>Artist </p><p>${ artist }</p>`);
    let dateElem; 
    if (date) {
        dateElem = $(`<p>Album Released date</p><p>${ date }</p>`);
    }
    
    $('#artist-details').append(titleElem)
        .append(authorElem)
        .append(dateElem);

    // Photo
    let photoElem = $(`<img src="${photo}"></img>`);
    $('#artist-photo').append(photoElem);

    // Lyrics
    $('#lyrics').append(lyrics);
}

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

// Creating bootstrap modal for generated image?

// Fix bottom lyrics

// name and description stuff

