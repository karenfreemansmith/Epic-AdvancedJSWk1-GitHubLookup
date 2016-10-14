var GitHubUser = require('./../src/js/profile.js').getRepos;

var displayUser = function(response) {
  $(".showUser").text("");
  $(".showUser").append("<img src='"+ response.avatar_url+"' class='img-responsive img-thumbnail' alt='GitHub Avatar'>");
  $(".showUser").append("<h3>" + response.name + ":<br> "+ response.public_repos + " Repositories</h3>");
  $(".showUser").append("<p>" + response.bio + " (" + response.email + ")</p>");
  console.log(response);
};

var displayFavorites = function(response) {
  $(".showUser").append("<div class='favorites row'>");
  response.forEach(function(fav) {
    $(".favorites").append("<div class='col-sm-4'>"+fav.login+"</div>");
  });
  $(".showUser").append("</div");
  console.log(response);
};

var displayRepos = function(response) {
  $(".showRepos").text("");
  response.forEach(function(repo) {
    $(".showRepos").append("<div class='col-sm-6'><h3><a href='"+repo.html_url+"' target='_blank'>"+repo.name.substring(0,24)+"</a></h3><p>"+repo.description+"</p></div>")
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
