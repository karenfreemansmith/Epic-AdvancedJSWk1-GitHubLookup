var apiKey = require('./../../.env').apiKey;

function GitHubUser() {
}

GitHubUser.prototype.getRepos = function(username, displayUser){
  $.get('https://api.github.com/users/'+ username +'?access_token=' + apiKey)
    .then(function(response){
      displayUser(response);
    })
    .fail(function(error){
    });
  };

exports.getRepos = GitHubUser;
