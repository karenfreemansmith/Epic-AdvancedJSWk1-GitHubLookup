var GitHubUser = require('./../src/js/profile.js').getRepos;

var displayUser = function(userdata) {
  console.log(response);
  $("#showRepos").text(userdata);
}

$(document).ready(function() {
  var currentGitHubUser = new GitHubUser();

  $('#getUser').click(function() {
    var username = $('#username').val();
    $('#username').val("");
    currentGitHubUser.getRepos(username, displayUser);
  });
});
