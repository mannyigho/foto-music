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
            'X-RapidAPI-Key': '68b20fda16msh22b9122aed21d27p11649fjsna0827e29cc48',
            'X-RapidAPI-Host': 'tokapi-mobile-version.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();

        let data = JSON.parse(result);
        console.log(data);
        let trackItem = data.music[0].play_url.uri;
        console.log('trackItem', trackItem)
        $('#artist-tracks').append(`<iframe src="${trackItem}"></iframe>`);

    } catch (error) {
        console.error(error);
    }

}
console.log(displayTrack())

$(document).on("click", "#search-artist", displayTrack);
//displayButtons();