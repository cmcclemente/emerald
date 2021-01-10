// getQuote().catch(err => console.error(err));

// async function getQuote() {
//     const response = await fetch('http://quotes.stormconsultancy.co.uk/random.json');
//     const data = await response.json();
//     document.getElementById('quote').innerText = data.quote;
// }

getQuote();

function getQuote(){
    fetch('http://quotes.stormconsultancy.co.uk/random.json')
    .then((response)=> {
        return response.json()
    }).then((data)=>{
        document.getElementById('quote').innerText = data.quote;
    })
    .catch(err => console.error(err));
}
