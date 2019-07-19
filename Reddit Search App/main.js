// alert(123);
import reddit from './redditapi';
const searchForm=document.getElementById('search-form');
const searchInput=document.getElementById('search-input');
//Form event Listener
searchForm.addEventListener('submit',e=>{
    // console.log('Hello world');
    //Get SearchTerm
    const searchTerm=searchInput.value;
    // console.log(searchTerm);
    //Get sort
    const sortBy=document.querySelector('input[name="sortby"]:checked').value;
    // console.log(sortBy);
    //Get Limit
    const searchLimit=document.getElementById('limit').value;
    // console.log(searchLimit);
e.preventDefault();
//Check input
if(searchTerm == ''){
    showMessage('Please add a search term','alert-danger');
}
searchInput.value='';
//Search reddit
reddit.search(searchTerm,searchLimit,sortBy)
.then(results=>{
    // console.log(results);
let output='<div class="card-columns"></div>'
//Loop through posts
results.forEach(
   //Check for image 
   
    post =>{
        let image = post.preview
        ? post.preview.images[0].source.url
        : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
        output +=
        `<div class="card mb-2" style="">
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncatetext(post.selftext,100)}</p>
          <a href="${post.url}"target="_blank" class="btn btn-primary">Read More</a>
          <hr>
          <span class="badge badge-secondary">Subreddit${post.subreddit}</span>
          <span  class="badge badge-secondary">Score${post.score}</span>
        </div>
      </div> `; 
        
    
    });
output +='</div>';
document.getElementById('results').innerHTML=output;
});
e.preventDefault();
});
//Show Message
function showMessage(message,className){
const div=document.createElement('div');
div.className=`alert ${className}`;
//Add text
div.appendChild(document.createTextNode(message));
//Get parent
const searchContainer=document.getElementById('search-container');
//Get Search
const search=document.getElementById('search');
//Insert message
searchContainer.insertBefore(div,search);
//Timeout alert
setTimeout(()=>document.querySelector('.alert').remove(),3000);
}
function truncatetext(text,limit){
const shortened=text.indexOf('',limit);
if(shortened==-1) return text;
return text.substring(0,shortened);
}