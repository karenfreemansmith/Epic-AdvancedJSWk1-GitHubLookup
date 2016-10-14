var GitHubUser = require('./../src/js/profile.js').getRepos;

var displayUser = function(response) {
  $("#avatar").append("<img src='"+ response.avatar_url+"' class='img-responsive img-thumbnail' alt='GitHub Avatar'>");
  $(".showUser").append("<h3>" + response.name + ":<br> "+ response.public_repos + " Repositories</h3>");
  $(".showUser").append("<p>" + response.bio + "</p>");
  console.log(response);
};

var displayRepos = function(response) {
  response.forEach(function(repo) {
    $("#repolist").append("<h3><a href='"+repo.html_url+"' target='_blank'>"+repo.name+"</a></h3><p>"+repo.description+"</p>")
  });
};

$(document).ready(function() {
  var currentGitHubUser = new GitHubUser();

  $('#getUser').click(function() {
    var username = $('#username').val();
    $('#username').val("");
    currentGitHubUser.getUser(username, displayUser);
    currentGitHubUser.getRepos(username, displayRepos);
  });
});
