const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');

const switchContainer = document.getElementById('theme-switch-container');
const sun = document.querySelector('.fa-sun');
const moon = document.querySelector('.fa-moon');
const themeText = document.getElementById('theme-select');
const body = document.body;


// Function To GET username and response with data

async function getUser(username){
  try{
    const { data } = await axios(APIURL + username);

    console.log(data);
    createUserCard(data);
    getRepos(username);
  }
  catch(err){
    if(err.response.status === 404){
     createErrorCard('No profile with that username');
    }
  }
}

// another call to get top 5 recent repos to add to card
async function getRepos(username){
  try{
    const { data } = await axios(APIURL + username + '/repos?sort=created');

    console.log(data);
    addReposToCard(data);
  }
  catch(err){
      createErrorCard('No repos');
  }
}

function createUserCard(user){
  // Date format
  const joinedAt = user.created_at.split('T')[0];
  const parsedJoined = joinedAt.split('-');
  const year = parsedJoined[0];
  const month = parsedJoined[1];

  const date = new Date(year, month);
  date.setMonth(month - 1);
  const monthTxt = date.toLocaleString('default', {month: 'short'});

  console.log(monthTxt, year);



  const cardHTML = ` 
  <div class="card">
    <div class="card-main">
      <img src="${user.avatar_url}" alt="Github user profile" class="avatar">

      <div class="user-following"> 
        <div class="user-name">
          <h2>${user.name}</h2>
          <p class="join-date">Joined ${monthTxt} ${year}</p>
      </div>

      <div class="user-info">
       <small class="handle">@${user.login}</small>
        <p class="bio">${user.bio}</p>
        
        <ul class="user-followers">
          <li><small>Repos</small><br> ${user.public_repos}</li>
          <li><small>Followers</small><br>${user.followers} </li>
          <li><small>Following</small><br>${user.following}</li>
        </ul>

        <div class="user-info-extra">
          <div class="row">
            <div id="location" class="location"><i class="fas fa-map-marker-alt"></i> ${user.location}</div>
            <div id="link"><i class="fas fa-link"></i>${user.html_url}</div>
        </div>

        <div class="row-2">
          <div id="twitter"> <i class="fab fa-twitter"></i> ${user.twitter_username}</div>
          <div id="work"><i class="fas fa-city"></i> @${user.company}</div>
        </div>  
      </div> 

        <div id="repos">
          
        </div>

      </div>
    </div>  
  </div>`

    main.innerHTML = cardHTML;
}

// Function to add repos to card

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');

  repos
  
  .slice(0, 10)
  .forEach(repo => {
    const repoLink = document.createElement('a');
    repoLink.classList.add('repo');
    repoLink.href = repo.html_url;
    repoLink.target = '_blank';
    repoLink.innerText = repo.name;

    reposEl.appendChild(repoLink);
  })
}

// Error Handling for No profile found

function createErrorCard(msg) {
  const cardHTML = `
   <div class="card error">
      <h1>${msg}</h1>
  </div>
  `
  main.innerHTML = cardHTML;
}


// Theme Switch/Storage Section

function switchTheme() {
  sun.classList.toggle('hidden');
  moon.classList.toggle('hidden');
  body.classList.toggle('dark');
}

function updateTheme() {
  if (body.classList.contains('dark')){
    themeText.innerHTML = 'Dark';
    moon.classList.add('hidden');
    localStorage.setItem('theme', 'dark'); 
  }else {
    sun.classList.add('hidden');
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
switchContainer.addEventListener('click', () => {
  updateTheme();
});

