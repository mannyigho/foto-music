const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=outkast';

async function searchSong(){
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
	console.log(result);
} catch (error) {
	console.error(error);
}
}
console.log(searchSong())