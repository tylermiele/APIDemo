// link to nasa api with the key in the url
let nasaUrl = 'https://api.nasa.gov/planetary/apod?api_key=JL0BfG1jo8Gz9GNtFqBLDaw5aGBWbwKTbN8L5p9f';

// grab the DOM elements that will be used for the Nasa API data
const nasaContainer = document.querySelector('.nasa-container');
const nasaImage = document.querySelector('.nasaImage');
const nasaDescription = document.querySelector('#nasaDescription');
const nasaDate = document.querySelector('#nasaDate');
const nasaTitle = document.querySelector('#nasaTitle');

// link to the News API
let newsUrl = 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=Leo016bUCR4BFfIHi3uZedyq4yp4L8QT';
// grab the DOM elements that will be used for the News API data
const newsImage = document.querySelector('.newsImage');
const newsTitle = document.querySelector('#newsTitle');
const newsLink = document.querySelector('#newsLink');
const newsAuthor = document.querySelector('#newsAuthor');

const html = document.querySelector('html');
const heading = document.querySelector('.alt-bg');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const nasaLogo = document.querySelectorAll('.logo')[0];
const nasaSection = document.querySelector('.nasa-container');
const newsLogo = document.querySelectorAll('.logo')[1];
const newsSection = document.querySelector('.news-container');
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
        if (object.media_type !== 'image') {
            nasaImage.style.backgroundImage = `url(../img/file-not-found.png)`;
        } else {
            nasaImage.style.backgroundImage = `url(${object.hdurl})`;
        }
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
    .then(object2 => {
        let article;
        // only grab one article from the results only if the section type is not empty to ensure that the desired data can be retrieved. This will make a new top story from around the world on the same day as the nasa photo
        for (let i = 0; i < object2.results.length; i++) {
            if (object2.results[i].section != "") {
                article = object2.results[i];
            }
        }

        // selects the first image of the list of images since the first one is typically the main thumbnail of the article
        newsImage.style.backgroundImage = `url(${article.multimedia[0].url})`;

        newsTitle.textContent = article.title;
        newsAuthor.textContent = article.byline;
        newsLink.href = article.url;
    });

toNasa();
function toNasa() {
    html.style.backgroundImage = "url('img/stars.jpg')";
    header.style.color = 'var(--blue)';
    header.style.borderColor = 'var(--blue)';
    footer.style.color = 'var(--blue)';
    

    heading.style.color = 'var(--blue)';
    heading.style.boxShadow = '-5px 5px 0.75em 0 var(--blue)';


    nasaLogo.removeEventListener('mouseout', defaultNasaLogo);
    newsLogo.addEventListener('mouseout', defaultNewsLogo);

    nasaLogo.style.opacity = '1';
    nasaLogo.style.boxShadow = 'inset 0 0 1em 0 var(--blue), 0 0 1em 0 var(--blue)';

    newsLogo.style.opacity = '0.8';
    newsLogo.style.boxShadow = 'inset 0 0 0.75em 0 var(--blue), 0 0 0.5em 0 var(--blue)';

    nasaSection.style.opacity = "0.9";
    nasaSection.style.height = "auto";
    nasaSection.style.margin = "2em 5em";
    nasaSection.classList.add('background');
    nasaLogo.classList.remove("toNews");


    newsSection.style.opacity = "0";
    newsSection.style.height = "0";
    newsSection.style.margin = "0";
    newsSection.classList.remove('background');
    newsLogo.classList.remove("toNews");
}

function toNews() {
    html.style.backgroundImage = "url('img/paper.jpg')";
    header.style.color = 'var(--white)';
    header.style.borderColor = 'var(--white)';
    footer.style.color = 'var(--white)';
    
    heading.style.color = 'var(--white)';
    heading.style.boxShadow = '-5px 5px 0.75em 0 var(--white)';


    newsLogo.removeEventListener('mouseout', defaultNewsLogo);
    nasaLogo.addEventListener('mouseout', defaultNasaLogo);


    newsLogo.style.opacity = '1';
    newsLogo.style.boxShadow = 'inset 0 0 1em 0 var(--blue), 0 0 1em 0 var(--blue)';

    nasaLogo.style.opacity = '0.8';
    nasaLogo.style.boxShadow = 'inset 0 0 0.75em 0 var(--blue), 0 0 0.5em 0 var(--blue)';

    nasaSection.style.opacity = "0";
    nasaSection.style.height = "0";
    nasaSection.style.margin = "0";
    nasaSection.classList.remove('background');
    nasaLogo.classList.add('toNews');

    newsSection.style.margin = "2em 5em";
    newsSection.style.opacity = "0.9";
    newsSection.style.height = 'auto';
    newsSection.classList.add('background');
    newsLogo.classList.add('toNews');
}

//functions for hovering logos
function hoverNasaLogo() {
    nasaLogo.style.opacity = '1';
    nasaLogo.style.boxShadow = 'inset 0 0 1em 0 var(--blue), 0 0 1em 0 var(--blue)';
}
function defaultNasaLogo() {
    nasaLogo.style.opacity = '0.8';
    nasaLogo.style.boxShadow = 'inset 0 0 0.75em 0 var(--blue), 0 0 0.5em 0 var(--blue)';
}
function hoverNewsLogo() {
    newsLogo.style.opacity = '1';
    newsLogo.style.boxShadow = 'inset 0 0 1em 0 var(--blue), 0 0 1em 0 var(--blue)';
}
function defaultNewsLogo() {
    newsLogo.style.opacity = '0.8';
    newsLogo.style.boxShadow = 'inset 0 0 0.75em 0 var(--blue), 0 0 0.5em 0 var(--blue)';
}

nasaLogo.addEventListener('mouseover', hoverNasaLogo);

nasaLogo.addEventListener("click", toNasa);
    


newsLogo.addEventListener('mouseover', hoverNewsLogo);
newsLogo.addEventListener('mouseout', defaultNewsLogo);

newsLogo.addEventListener("click", toNews);
  

//https://api.nasa.gov/
//https://developer.nytimes.com/docs/top-stories-product/1/overview