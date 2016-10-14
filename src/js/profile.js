var apiKey = require('./../../.env').apiKey;
// TODO: add logic for users when key is not available

function GitHubUser() {
}

GitHubUser.prototype.getUser = function(username, displayUser, displayUserNotFound) {
  $.get('https://api.github.com/users/'+ username +'?access_token=' + apiKey)
    .then(function(response){
      displayUser(response);
    })
    .fail(function(error){
      displayUserNotFound();
    });
  };

GitHubUser.prototype.getFavorites = function(username, displayFavorites) {
  $.get('https://api.github.com/users/'+ username +'/following?per_page=99&access_token=' + apiKey)
    .then(function(response){
      // TODO: add users to an array and run pagination until there are no more users
      // TODO: sort users by name (case insensitive)
      displayFavorites(response);
    })
    .fail(function(error){
    });
  };

GitHubUser.prototype.getRepos = function(username, displayRepos) {
  $.get('https://api.github.com/users/'+ username +'/repos?sort=pushed&per_page=100&access_token=' + apiKey)
    .then(function(response){
      // TODO: add repos to an array and run pagination until there are no more repos
      // TODO: sort repos by number of commits? size? Something that might indicate "best" repost at the top of the list better than just date order
      displayRepos(response);
    })
    .fail(function(error){
    });
  };

exports.getRepos = GitHubUser;
