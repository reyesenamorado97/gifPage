// Confirm that page has loaded properly
console.log("Page Loaded")

// Constant Declarations
const apiKey ="z9qEJKCAcrrMCA7q77qHJXLDkv111Kra";
const limit = 9 // max number of objects to return

// Variable Declaration
var collections = 0; // Set of 9 gifs loaded for an instance

// DOM References
const form = document.getElementById("form");
const seachText = document.getElementById('gif-textbox');
const gifArea = document.getElementById('gif-area');
const moreButton = document.getElementById('more-button');


// Event Listeners
form.addEventListener('submit', handleFormSubmit);
moreButton.addEventListener('click', displayMoreResults);


// --------------------------- FUNCTIONS ---------------------------

// Use API to pull results from search
async function getResults(searchTerm) {

    const offset = collections * limit;

    const response = await fetch(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=${limit}&offset=${offset}&api_key=${apiKey}`);
    const responseData = await response.json();

    // Confirm that we have pulled some object from API
    console.log(`${responseData.data}`)

    return responseData.data;
}

function displayResults(gifs) {

    const gifURL = gifs.map(gif => 
        // Display title, username, and gif
        `
        <div class="returnResult">
        <p>${gif.title}</p>
        <p>${gif.username}</p>

            <img src="${gif.images.original.url}" />
            <br>
            <br>
            <br>

        </div>
    `).join(''); // Not sure of another way to bring gifs together on one line?

    console.log(gifURL) // Confirm we have a valid URL

    // Finally, update the page with results
    gifArea.innerHTML += gifURL;
}


async function handleFormSubmit(evt) {

    // Required to update the page with API results
    evt.preventDefault();

    console.log("Preparing handling...")

    // Catch invalid input
    if ( seachText.value == '') {
        alert("Invalid Request!")
    }
    else{

    const data = await getResults(seachText.value);
    displayResults(data);

    collections++;

    // Display the more button
    moreButton.classList.remove('hidden');
    }
}

async function displayMoreResults(evt) {

    evt.preventDefault();

    // Call getResults to pull more gifs
    const data = await getResults(seachText.value);

    // Display those new gifs
    displayResults(data);

    console.log(seachText.value)
    collections++;
}

// Executes when page is first loaded
 window.onload = async function () {

    // execute your functions here to make sure they run as soon as the page loads
    const offset = collections * limit;

    // Switch URL to pull trending results
    const response = await fetch(`http://api.giphy.com/v1/gifs/trending?limit=${limit}&offset=${offset}&api_key=${apiKey}`);
    const responseData = await response.json();

    // Confirm that we have pulled some object from API
    console.log(`${responseData.data}`)

    displayResults(responseData.data)

  }


