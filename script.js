// get quote from api
async function getQuote(){
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {

        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //const obj = JSON.parse(response);
        console.log(data);
        document.querySelector('#quote').innerHTML = data.quoteText;
        document.querySelector('#author').innerHTML = data.quoteAuthor;
        
    } catch (error) {
        getQuote();
        console.log('Woops No Quotes', error);
    }

}

// Onload
getQuote();