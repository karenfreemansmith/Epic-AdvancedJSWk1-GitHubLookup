// TODO: add logic for users when key is not available
var apiKey = require('./../../.env').apiKey;

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
  var favorites=[];
  $.get('https://api.github.com/users/'+ username +'/following?per_page=99&access_token=' + apiKey)
    .then(function(response){
      response.forEach(function(fav) {
        favorites.push(fav.login);
      });
      favorites.sort(function(a, b) {
        var nameA = a.toUpperCase();
        var nameB = b.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      displayFavorites(favorites);
    })
    .fail(function(error){
      console.log(error);
    });
  };

GitHubUser.prototype.getRepos = function(username, displayRepos) {
  var bigresponse=[];
  $.get('https://api.github.com/users/'+ username +'/repos?sort=pushed&per_page=100&access_token=' + apiKey)
    .then(function(response){
      response.forEach(function(repo) {
        bigresponse.push(repo);
      });
      $.get('https://api.github.com/users/'+ username +'/repos?sort=pushed&page=2&per_page=100&access_token=' + apiKey)
        .then(function(response){
          response.forEach(function(repo) {
            bigresponse.push(repo);
          });
        })
        .fail(function(error){
          console.log(error);
        });

      bigresponse.sort(function(a, b) {
        return b.size-a.size;
      });
      displayRepos(bigresponse);
    })
    .fail(function(error){
      console.log(error);
    });
  };

exports.getRepos = GitHubUser;
