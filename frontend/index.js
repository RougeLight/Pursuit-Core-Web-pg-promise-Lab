document.addEventListener('DOMContentLoaded', () => {
   loadUsers();
   loadPosts();
   const form = document.querySelector('#addUserForm');
   form.addEventListener('submit', addUserFormSubmitted);
   const postForm = document.querySelector('#addPostForm');
   postForm.addEventListener('submit', addPostFormSubmitted);
});

async function loadUsers() {
   const usersList = document.querySelector('#usersList');
   usersList.innerHTML = "";
   const response = await axios.get(`http://localhost:3000/users/`);
   response.data.payload.forEach((user) => {
       let listItem = document.createElement("li");
       listItem.innerText = `${user.firstname} ${user.lastname}, age ${user.age}`;
       usersList.appendChild(listItem);
   });
}

async function addUserFormSubmitted(event) {
   event.preventDefault();    
   const firstname = document.querySelector('#firstNameInput').value;
   const lastname = document.querySelector('#lastNameInput').value;
   const age = document.querySelector('#ageInput').value;
   let response = await axios.post(`http://localhost:3000/users/register`, { firstname, lastname, age });
   loadUsers();
}

async function loadPosts() {
   const postsList = document.querySelector('#postsList');
   postsList.innerHTML = "";
   const response = await axios.get(`http://localhost:3000/posts/all`);
   response.data.payload.forEach((post) => {
       let listItem = document.createElement("li");
       listItem.innerText = `${post.id}: ${post.body}`;
       postsList.appendChild(listItem);
   });
}

async function addPostFormSubmitted(event) {
   event.preventDefault();  
   const userid = document.querySelector('#userid')  
   const body = document.querySelector('#postInput').value;
   let response = await axios.post(`http://localhost:3000/posts/register`, {poster_id,body});
   loadPosts();
}