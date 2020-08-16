const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authortext = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuotebtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function hideLoading(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }

}

// get quote from api
async function getQuote(){
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {

        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        

        // reducing font size if the quote is too long
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        } else{
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;


        //checking if author name is unknown
        if(data.quoteAuthor === ''){
            authortext.innerText = 'Unknown';
        } else{
            authortext.innerText = data.quoteAuthor;
        }
        
       hideLoading();
        
        
    } catch (error) {
        getQuote();
        console.log('Woops No Quotes', error);
    }

}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authortext.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// event listners
newQuotebtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// Onload
 getQuote();
