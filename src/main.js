const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');


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


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = search.value;
  if(username){
    getUser(username)
    //clear search value
    search.value ='';
  }
})