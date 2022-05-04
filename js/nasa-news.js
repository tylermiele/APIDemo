// link to nasa api with the key in the url
nasaUrl = 'https://api.nasa.gov/planetary/apod?api_key=JL0BfG1jo8Gz9GNtFqBLDaw5aGBWbwKTbN8L5p9f';

// grab the DOM elements that will be used for the Nasa API data
const nasaImage = document.querySelector('.displayNasa .nasaImage');
const nasaDescription = document.querySelector('.displayNasa #nasaDescription');
const nasaDate = document.querySelector('.displayNasa #nasaDate');
const nasaTitle = document.querySelector('.displayNasa #nasaTitle');

// link to the News API
newsUrl = 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=Leo016bUCR4BFfIHi3uZedyq4yp4L8QT';
// grab the DOM elements that will be used for the News API data
const newsImage = document.querySelector('.displayNews .newsImage');
const newsTitle = document.querySelector('.displayNews #newsTitle');
const newsLink = document.querySelector('.displayNews #newsLink');
const newsAuthor = document.querySelector('.displayNews #newsAuthor');

// handles the Nasa API fetch
fetch(nasaUrl).then(response => {
    // handles errors, if no error then fetch the json object of the data
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
})
    // function that sends back data to the DOM
    .then(object => {
        nasaImage.style.backgroundImage = `url(${object.hdurl})`;
        nasaImage.style.backgroundSize = 'cover';
        nasaImage.style.backgroundRepeat = 'no-repeat';
        nasaImage.style.backgroundPosition = 'center';
        nasaImage.style.backgroundAttachment = 'fixed';

        nasaTitle.textContent = object.title;
        nasaDate.textContent = object.date;
        nasaDescription.textContent = object.explanation;
    });

// handles the BING News API fetch
fetch(newsUrl).then(response => {
    // handles errors, if no error then fetch the json object of the data
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
})
    // function that sends back data to the DOM
    .then(object => {
        let article;
        // only grab one article from the results based on a random number in the list. This will make a new top story from around the world on the same day as the nasa photo
        let x = Math.floor((Math.random() * object.results.length) + 1);
        article = object.results[x];

        // selects the first image of the list of images since the first one is typically the main thumbnail of the article
        newsImage.style.backgroundImage = `url(${article.multimedia[0].url})`;
        
        newsImage.style.backgroundSize = 'cover';
        newsImage.style.backgroundRepeat = 'no-repeat';

        newsTitle.textContent = article.title;
        newsAuthor.textContent = article.byline;
        newsLink.href = article.url;
    });

