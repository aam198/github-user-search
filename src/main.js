const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');

const sun = document.querySelector('.fa-sun');
const moon = document.querySelector('.fa-moon');


// Function To GET username

async function getUser(username){
  try{
    const { data } = await axios(APIURL + username);

    console.log(data)
  }
  catch(err){
    console.log(err);
  }
}



// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = search.value;
  if(username){
    getUser(username)
    //clear search value
    search.value ='';
  }
})

// find browser specific color theme
sun.addEventListener('click', () => {
  document.body.classList.remove('dark');
})

moon.addEventListener('click', () => {
  document.body.classList.add('dark');
})
