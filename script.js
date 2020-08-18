const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authortext = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuotebtn = document.getElementById('new-quote');
const loader = document.getElementById('spinner');
const themeChangeBtn = document.getElementById('theme_type');
const darkStyleSheet = document.styleSheets[2];
const langChangeOpt = document.getElementById('lang');



/**
 * Global Variables
 */
// loading the default stylesheet only
darkStyleSheet.disabled = true;

// declaring the error counter
let i;

// declaring the default language
let lang = 'en';

/**
 * functions
 */

function changeThemeColor(){
    if(darkStyleSheet.disabled){
        darkStyleSheet.disabled = false;
    } else{
        darkStyleSheet.disabled = true;
    }
}

function showTheSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideTheSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }

}

function changeLanguage() {
    lang = langChangeOpt.value;
    getQuote();
}

function addQuoteText(quote) {
    // reducing font size if the quote is too long
    if(quote.length > 120){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = quote;
}

function addAuthor(author) {
    if(author === ''){
        authortext.innerText = 'Unknown';
    } else{
        authortext.innerText = author;
    } 
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authortext.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// get quote from api

async function getQuote(){    
    
    showTheSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=${lang}&format=json`;
    try {

        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();     

        addQuoteText(data.quoteText);
        addAuthor(data.quoteAuthor);    
       
        hideTheSpinner();
       
        i = 0;       
        
    } catch (error) {
        i++;
        if(i < 10){
            getQuote();
            
        } else{            
            quoteText.innerText = "Something went wrong, please try again.";
            authortext.innerText = "";
            hideTheSpinner();
            i = 0;
        }   
    }
    
}

/**
 * Event Listners
 */
newQuotebtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
themeChangeBtn.addEventListener('click', changeThemeColor);
langChangeOpt.addEventListener('change', changeLanguage);

/**
 * Start the application onload
 */
 getQuote();
