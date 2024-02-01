let tracks = [];

async function displayTrack() {

    // Empty elements before new data
    $("#artist-tracks").empty();
    const trackName = $("#artist-name").val().trim();
    if (!trackName) {
        return;
    }

    const url = `https://tokapi-mobile-version.p.rapidapi.com/v1/search/music?keyword=${trackName}&count=10&filter_by=0`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0c2286d76bmshec233881f1e6be2p1cfee8jsn1e295e4c1b73',
            'X-RapidAPI-Host': 'tokapi-mobile-version.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();

        let data = JSON.parse(result);
        console.log(data);

        // Track Player
        let trackItem = data.music[0].play_url.uri;
        console.log('trackItem', trackItem)
        $('#artist-tracks').append(`<iframe src="${trackItem}"></iframe>`);

        // Description Details
        let songName = $(`<h3>${data.music[0].title}</h3>`);
        let author = $(`<p>${data.music[0].author}></p>`);
        let album = $(`<p>${data.music[0].album}</p>`);
        $('#artist-details').append(songName)
            .append(author)
            .append(album)

    } catch (error) {
        console.error(error);
    }

}
console.log(displayTrack())

$(document).on("click", "#search-artist", displayTrack);
displayButtons();

// Add buttons for the history dinamically

// Save buttons into local storage

// Search for second API