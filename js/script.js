let tracks = [];

const GENIUS_URL = 'https://genius-song-lyrics1.p.rapidapi.com';
const GENIUS_OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '68b20fda16msh22b9122aed21d27p11649fjsna0827e29cc48',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
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

    // HTML Handling
    const uri = `https://genius.com/songs/${id}/apple_music_player`
    $('.footer-section').append(`<iframe allow="encrypted-media *;" src="${ uri }"></iframe>`);
        
    // Description Details
    let titleElem = $(`<h3>${ title }</h3>`);
    let authorElem = $(`<p>${ artist }</p>`);
    // let albumElem = $(`<p>${ album }</p>`);
    $('#artist-details').append(titleElem)
        .append(authorElem)
        //.append(albumElem)

    // Photo
    let photoElem = $(`<img src="${photo}"></img>`);
    $('#artist-photo').append(photoElem);

    // Lyrics
    $('#lyrics').append(lyrics);
}

$(document).on("click", "#search-artist", onSearchClick);
