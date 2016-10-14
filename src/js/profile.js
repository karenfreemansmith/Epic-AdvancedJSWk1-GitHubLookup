var apiKey = require('./../../.env').apiKey;

function GitHubUser() {
}

GitHubUser.prototype.getUser = function(username, displayUser){
  $.get('https://api.github.com/users/'+ username +'?access_token=' + apiKey)
    .then(function(response){
      displayUser(response);
    })
    .fail(function(error){
    });
  };

GitHubUser.prototype.getRepos = function(username, displayRepos){
  $.get('https://api.github.com/users/'+ username +'/repos?access_token=' + apiKey)
    .then(function(response){
      displayRepos(response);
    })
    .fail(function(error){
    });
  };

exports.getRepos = GitHubUser;
