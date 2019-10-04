


function fetch_users_json() {
    const client_id = "7f112f1db17e88a803c8";
    const client_secret = "68b286538923934ec6b3433441475fe1280372c0";
    const user = document.getElementById("username").value;

    const users = new XMLHttpRequest();
    users.open(
      "GET",
      `https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`,
      true
    );

    const repos = new XMLHttpRequest();
    repos.open(
      "GET",
      `https://api.github.com/users/${user}/repos?client_id=${client_id}&client_secret=${client_secret}`,
      true
    );

    users.onload = function() {
      if (this.status == 200) {
        // console.log(this.responseText);
        let users = JSON.parse(this.responseText);

        console.log(users);
        for (const i in users) {
          if (user.value == users[i].login) {
            document.getElementById("cols").innerHTML = `
                             <div class="card" style="width: 1000px;">
                
                        <div class="row">

                                <div class=" col-md-6 mt-2 seprator">   
                                    <img src=${users.avatar_url}  class="img-fluid ml-2 avatar">
                                        <div class="card-body">
                                            <h5 class="card-title" id="heading">${users.name}</h5>
                                            <p class="card-text" id="bio">${users.bio}</p>
                                            <a href="${users.html_url}" target="_blank" class="btn btn-outline-dark">Check Profile</a>
                                        </div>
                                </div>
                                
                                <div class="col-md-6 pl-6">
                                    <span class="d-block  mb-2 text-lg badge badge-dark">Repos: ${users.public_repos}</span>
                                    <span class="d-block  mb-2 text-lg badge badge-dark">Following: ${users.following}</span>
                                    <span class="d-block  mb-2 text-lg badge badge-dark">Followers: ${users.followers}</span>
                                </div>
                            </div>
                    </div>
         <h2 class="repos-head">Repositories: </h2>
            
         <table class="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Repo Name</th>
                <th scope="col">Visit Site</th>
                <th scope="col">Download</th>
              </tr>
            </thead>
            <tbody id="table-data">
              
            </tbody>
          </table>
         
         

                
                `;

            //  document.getElementById('img').src = `${users.avatar_url}`;
          }
        }

      }

    }

    repos.onload = function() {
      if (this.status == 200) {
        // console.log(this.responseText);
        let repos = JSON.parse(this.responseText);
        let i=0;
        console.log(repos);
      console.log("repos");

        repos.forEach(e => {
          i+=1;
          document.getElementById("table-data").innerHTML += `
              <tr>
                <th scope="row">${i}</th>
                <td>${e.name}</td>
                <td><a target="_blank" class="text-gray text-center
                " href="https://${e.owner.login}.github.io/${e.name}/"><u>Visit</u></a></td>
                <td><a target="_blank" class="text-gray text-center
                " href="https://api.github.com/repos/${e.owner.login}/${e.name}/{archive_format}{/ref}"><u>Download Zip</u></a></td>
              </tr>
          `;});
      }
    }

    users.send();
    repos.send();

  };

const enterCode = (event) => {
  let x = event.keyCode;
  if (x == 13) {
    event.preventDefault();
    fetch_users_json(); 
  }
};
enterCode();