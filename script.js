const searchBar = document.querySelector('#search-bar')
const searchBtn = document.querySelector('#search-btn')
const movieList = document.querySelector('#movie-list')

searchBtn.addEventListener('click', async () => {
    const searchQuery = searchBar.value;
    console.log(searchQuery);
    try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=3846cfad&s=${searchQuery}`);
        const data = await res.json();
        console.log(data);
        const searchResults = data.Search;

        // Use Promise.all to resolve all Promises
        const searchResultsHtml = await Promise.all(
            searchResults.map(async (movie) => {
                const res = await fetch(`http://www.omdbapi.com/?apikey=3846cfad&i=${movie.imdbID}`);
                const data = await res.json();
                console.log(data);
                return `
                    <article>
                        <div class="movie-poster">
                            <img src="${data.Poster}" alt="${data.Title} poster">
                        </div>
                        <div class="movie-details">
                            <div class="top-details">
                                <h2>${data.Title}</h2>
                                <span class="rating"><i class="fa fa-star" aria-hidden="true"></i>${data.imdbRating}</span>
                            </div>
                            <div class="bottom-details">
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                            </div>
                            <p>${data.Plot}</p>
                            <button class="add-to-watch-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i> Watchlist</button>
                        </div>
                    </article>
                `;
            })
        );

        // Join the resolved HTML strings and update the DOM
        movieList.innerHTML = searchResultsHtml.join('');
    } catch (err) {
        console.error(err);
    }
})



// Search: Array(10)
// 0: {Title: 'The Shaolin Avengers', Year: '1976', imdbID: 'tt0074513', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BODE1Mzk5Y2…WExYjctYTdhYzExOWEwMTQ2XkEyXkFqcGc@._V1_SX300.jpg'}
// 1: {Title: 'Avengers: Quantum Encounter', Year: '2022', imdbID: 'tt21192014', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BOTRlM2QwYj…zI4M2VmXkEyXkFqcGdeQXVyMTA4Mzg1NzM5._V1_SX300.jpg'}


// {
//     "Title": "The Avengers",
//     "Year": "2012",
//     "Rated": "PG-13",
//     "Released": "04 May 2012",
//     "Runtime": "143 min",
//     "Genre": "Action, Sci-Fi",
//     "Director": "Joss Whedon",
//     "Writer": "Joss Whedon, Zak Penn",
//     "Actors": "Robert Downey Jr., Chris Evans, Scarlett Johansson",
//     "Plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
//     "Language": "English, Russian",
//     "Country": "United States",
//     "Awards": "Nominated for 1 Oscar. 39 wins & 81 nominations total",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_SX300.jpg",
//     "Ratings": [
//         {
//             "Source": "Internet Movie Database",
//             "Value": "8.0/10"
//         },
//         {
//             "Source": "Rotten Tomatoes",
//             "Value": "91%"
//         },
//         {
//             "Source": "Metacritic",
//             "Value": "69/100"
//         }
//     ],
//     "Metascore": "69",
//     "imdbRating": "8.0",
//     "imdbVotes": "1,506,017",
//     "imdbID": "tt0848228",
//     "Type": "movie",
//     "DVD": "N/A",
//     "BoxOffice": "$623,357,910",
//     "Production": "N/A",
//     "Website": "N/A",
//     "Response": "True"
// }