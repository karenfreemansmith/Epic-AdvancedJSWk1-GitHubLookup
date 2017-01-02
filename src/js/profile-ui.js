var GitHubUser = require('./../src/js/profile.js').getRepos;

var displayUser = function(response) {
  $(".showUser").text("");
  if(response.name) {
    $(".showUser").append("<h3>" + response.name + "</h3>");
  }
  $(".showUser").append("<p>Joined " + moment(response.created_at).startOf('day').fromNow() + "</p>");
  $(".showUser").append("<img src='"+ response.avatar_url+"' class='img-responsive img-thumbnail' alt='GitHub Avatar'>");
  $(".showUser").append("<h4>"+ response.public_repos + " Repositories, "+ response.followers +" Followers</h4>");

  $(".showUser").append("<p>");
  if(response.bio) {
    $(".showUser").append(response.bio);
  }
  if(response.email) {
    $(".showUser").append(" (" + response.email + ")");
  }
  $(".showUser").append("</p>");
};

var displayUserNotFound = function() {
  $(".showRepos").text("");
  $(".showUser").text("");
  $(".showUser").append("<h3>Username Not Found</h3>");
};

var displayFavorites = function(response) {
  $(".showUser").append("<div class='favorites row'>");
  response.forEach(function(fav) {
    $(".favorites").append("<div class='col-sm-4'>"+fav+"</div>");
  });
  $(".showUser").append("</div");
};

var displayRepos = function(response) {
  $(".showRepos").text("");
  response.forEach(function(repo) {
    $(".showRepos").append("<div class='col-sm-6'><h3><a href='" + repo.html_url + "' target='_blank'>" + repo.name.substring(0,20) + "</a></h3><p>(" + moment(repo.pushed_at).startOf('day').fromNow() + ")</p><p>" + repo.description + "</p></div>");
  });
};

$(document).ready(function() {
  var currentGitHubUser = new GitHubUser();

  $('#getUser').click(function(event) {
    event.preventDefault();
    var username = $('#username').val();
    $('#username').val("");

    currentGitHubUser.getUser(username, displayUser, displayUserNotFound);
    currentGitHubUser.getFavorites(username, displayFavorites);
    currentGitHubUser.getRepos(username, displayRepos);
  });
});
