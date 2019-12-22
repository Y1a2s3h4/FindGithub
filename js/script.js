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
      let users = JSON.parse(this.responseText);

      for (const i in users) {
        if (user.value == users[i].login) {
          let Bio = users.bio;
          let users_bio = Bio == null ? "" : Bio;
          document.getElementById("cols").innerHTML = `
                             <div class="card" style="width: 850px;">
                
                        <div class="container">

                                <div class="mt-2">   
                                    <img src=${users.avatar_url}  class="avatar">
                                        <div class="card-body">
                                            <h5 class="card-title" id="heading">${users.name}</h5>
                                            <p class="card-text" id="bio">${users_bio}</p>
                                            <a href="${users.html_url}" target="_blank" class="btn btn-outline-dark">Check Profile</a>
                                        </div>
                                </div>
                                
                                <div class="pl-6">
                                    <span class="mb-2 text-lg badge badge-dark">Repos: ${users.public_repos}</span>
                                    <span class="mb-2 text-lg badge badge-dark">Following: ${users.following}</span>
                                    <span class="mb-2 text-lg badge badge-dark">Followers: ${users.followers}</span>
                                </div>
                            </div>
                    </div>
         <h2 class="repos-head">Repositories: </h2>
            <br>
         <table class="table  table-hover table-dark">
            <thead>
              <tr>
                <th class="sr_no" scope="col">#</th>
                <th class="repo_name" scope="col">Repo Name</th>
                <th class="visit_site" scope="col">Visit Site</th>
                <th class="download_zip" scope="col">Download</th>
              </tr>
            </thead>
            <tbody id="table-data">
              
            </tbody>
          </table>
            
                `;
        } else {
          alert("Invalid Username!");
        }
      }
    }
  };

  repos.onload = function() {
    if (this.status == 200) {
      let repos = JSON.parse(this.responseText);
      let i = 0;

      repos.forEach(e => {
        i += 1;
        document.getElementById("table-data").innerHTML += `
              <tr>
                <th scope="row">${i}</th>
                <td> <a target="_blank" class="text-gray text-center" href="https://github.com/${e.owner.login}/${e.name}">${e.name}</a> </td>
                <td> <a target="_blank" class="text-gray text-center"href="https://${e.owner.login}.github.io/${e.name}/"><u>Visit</u></a> </td>
                <td> <a target="_blank" class="text-gray text-center"href="https://github.com/${e.owner.login}/${e.name}/archive/master.zip"><u>Download Zip</u></a> </td>
              </tr>
          `;
      });
    }
  };

  users.send();
  repos.send();
}

const enterCode = event => {
  let x = event.keyCode;
  if (x == 13) {
    event.preventDefault();
    fetch_users_json();
  }
};
