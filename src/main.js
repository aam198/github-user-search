const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');

const sun = document.querySelector('.fa-sun');
const moon = document.querySelector('.fa-moon');
const themeText = document.getElementById('theme-select');
const body = document.body;


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

function switchTheme() {
  sun.classList.toggle('hidden');
  moon.classList.toggle('hidden');
  body.classList.toggle('dark');
}

function updateTheme() {
  if (body.classList.contains('dark')){
    themeText.innerHTML = 'Dark';
    sun.classList.add('hidden');
    localStorage.setItem('theme', 'dark'); 
  }else {
    moon.classList.add('hidden');
    themeText.innerHTML = 'Light';
    localStorage.setItem('theme', 'light');
  }
  return switchTheme();
}

// Detecting the users preferred color scheme
function initTheme() {
  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = localStorage.getItem('theme');

  console.log(prefersDark)
  console.log(storedTheme);

  if (storedTheme === 'light'){
    body.classList.remove('dark');
    themeText.innerHTML = 'light';
    return updateTheme();
  }
  if(prefersDark.matches === true) {
    body.classList.add('dark');
    themeText.innerText = 'dark';
    return updateTheme();
  }

}
initTheme();


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
  updateTheme();
});

moon.addEventListener('click', () => {
  updateTheme();
});
