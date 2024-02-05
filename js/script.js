let tracks = [];

const GENIUS_URL = 'https://genius-song-lyrics1.p.rapidapi.com';
const GENIUS_OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '68b20fda16msh22b9122aed21d27p11649fjsna0827e29cc48',
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
    
    // const response = await fetch(searchSongUrl, GENIUS_OPTIONS);
    // const result = await response.text();
    // const data = JSON.parse(result);

    // const { id, artist_names, title, song_art_image_url } = data.hits[0].result;
    // console.log(data.hits[0].result);

    const { id, artist_names, title, song_art_image_url } = searchData;
    console.log(searchData);

    const song = {
        id: id,
        artist: artist_names,
        title: title,
        photo: song_art_image_url, 
    };
    return song;
}

async function searchLyrics(songId) {
    const searchLyricsUrl = `${GENIUS_URL}/song/lyrics/?id=${songId}`;
    
    // const response = await fetch(searchLyricsUrl, GENIUS_OPTIONS);
    // const result = await response.text();
    // const data = JSON.parse(result);
    // const { body } = data.lyrics.lyrics;
    
    console.log('lyrics', lyrics);
    return lyrics.html;
}

async function onSearchClick() {
    $('#artist-photo').empty();
    $('.footer-section').empty();
    $('#artist-details').empty();
   

    const searchInput = $("#artist-name").val().trim();
    if (!searchInput) {
        return;
    }

    const { id, artist, title, photo } = await searchSong(searchInput);
    const lyrics = await searchLyrics(id);

    const aiImage = await convertSongToImage(lyrics);

    // HTML Handling
    const uri = `https://genius.com/songs/${id}/apple_music_player`
    $('.footer-section').append(`<iframe allow="encrypted-media *;" src="${ uri }"></iframe>`);
        
    // Description Details
    let titleElem = $(`<h3>${ title }</h3>`);
    let authorElem = $(`<p>${ artist }</p>`);
    $('#artist-details').append(titleElem)
        .append(authorElem)

    // Photo
    let photoElem = $(`<img src="${photo}"></img>`);
    $('#artist-photo').append(photoElem);

    // Lyrics
    $('#lyrics').append(lyrics);

    // AI Image
    let imageElem = $(`<img src="${aiImage}"></img>`);
    $('#ai-image').append(imageElem);
}

// Open AI converts Song to one image
async function convertSongToImage(lyrics) {
    const songToImageUrl = `${OPENAI_URL}`;
    const body = { text: 'cat' }
    OPENAI_OPTIONS.body =  JSON.stringify(body);
    console.log(OPENAI_OPTIONS)
    try {
        // const response = await fetch(songToImageUrl, OPENAI_OPTIONS);
        // const result = await response.text();
        // const openAiData = JSON.parse(result);
        // console.log(openAiData)
        const image = 'https://audiospace-1-r4970717.deta.app/matagimage?id=Qve3IXWKTYhwlrumM8ys1707129944.9716625'
        console.log(image);
        return image;
    } catch (error) {
	    console.error(error);
    }
    
}

$(document).on("click", "#search-artist", onSearchClick);


// Display release date

// Local storage

// Second API

