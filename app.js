const APIURL = "https://api.github.com/users/";

const search = document.getElementById('search');
const main = document.getElementById('main');
const form = document.getElementById('form');

getUser('gorkemyagci')

async function getUser(user){
    const api = await fetch(APIURL + user);
    const userInfo = await api.json();

    createCard(userInfo);
}

function createCard(user){
    if(user.name!==null){
        const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2><a href="https://github.com/${user.login}">${user.name}</a></h2>
                <p>${user.bio}</p>
                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `;
    
    main.innerHTML = cardHTML;
    }else{
        main.innerHTML = `<span><strong>Kullanıcı Bulunamadı..</strong></span>`
    }
   
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }else{
    main.innerHTML = `<span><strong>Kullanıcı Bulunamadı..</strong></span>`
}
});