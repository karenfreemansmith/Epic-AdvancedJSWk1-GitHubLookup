var GitHubUser = require('./../src/js/profile.js').getRepos;

var displayUser = function(response) {
  $(".showUser").text("");
  $(".showUser").append("<img src='"+ response.avatar_url+"' class='img-responsive img-thumbnail' alt='GitHub Avatar'>");
  $(".showUser").append("<h3>" + response.name + ":<br> "+ response.public_repos + " Repositories</h3>");
  $(".showUser").append("<p>" + response.bio + "</p>");
  console.log(response);
};

var displayFavorites = function(response) {
  $(".showUser").append("<ul class='favorites'>");
  response.forEach(function(fav) {
    $(".favorites").append("<li>"+fav.login+"</li>");
  });
  $(".showUser").append("</ul>");
  console.log(response);
};

var displayRepos = function(response) {
  $(".showRepos").text("");
  response.forEach(function(repo) {
    $(".showRepos").append("<h3><a href='"+repo.html_url+"' target='_blank'>"+repo.name+"</a></h3><p>"+repo.description+"</p>")
  });
  console.log(response);
};

$(document).ready(function() {
  var currentGitHubUser = new GitHubUser();


  $('#getUser').click(function() {
    var username = $('#username').val();
    $('#username').val("");

    currentGitHubUser.getUser(username, displayUser);
    currentGitHubUser.getFavorites(username, displayFavorites)
    currentGitHubUser.getRepos(username, displayRepos);
  });
});
