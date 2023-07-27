
class GitHub {
  constructor(userId) {
    this.userId = userId;
  }

  createUserCard(user) {
    const {
      avatar_url,
      name,
      location,
      following,
      followers,
      twitter_username,
      public_repos,
      bio,
      login
    } = user;
    const userCard = document.querySelector(".user-card");


    userCard.innerHTML = `
    <div class="avatar">
      <img
        src=${avatar_url}
        class="avatar"
      />
    </div>
    <div class="user-details">
      <h2>${name ? name : login}</h2>

      <p>
       ${bio ? bio : ""}
      </p>

      <div class="stats">
        <div>
          <p><b>Followers: </b> <span>${followers}</span></p>
          <p><b>Following: </b> <span>${following}</span></p>
          <p><b>Repos: </b> <span>${public_repos}</span></p>
        </div>
        <div>
          <p><b>Twitter: </b> <span>${twitter_username ? twitter_username : ""}</span></p>
          <p><b>Location: </b> <span>${location ? location : ""}</span></p>
        </div>
      </div>
    </div>
    `;
  }

  async getUserDetails() {
    const errorDisplay = document.querySelector('#error-display');
    const form = document.querySelector("#form");

    try {
      const response = await fetch(
        `https://api.github.com/users/${this.userId}`
      );
      if(!response.ok){
          throw "Invalid user id";
      }
      else{
        form.elements.searchUser.value = "";
        errorDisplay.textContent = "";
        const user = await response.json();
        this.createUserCard(user);
      }
    } catch (error) {
       if(error === "Invalid user id"){
        errorDisplay.textContent = "Please enter a valid user id!"
       }
       else{
        errorDisplay.textContent = "Could not get user!"
       }
    }
  }
}

const arpit = new GitHub("arpit-s02");
arpit.getUserDetails();

const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userId = form.elements.searchUser.value;

  if (userId) {
    const user = new GitHub(userId);
    user.getUserDetails();
  }

});
