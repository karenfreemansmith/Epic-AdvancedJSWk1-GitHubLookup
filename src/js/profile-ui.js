var repos = require('./../src/js/profile.js').getRepos;

$(document).ready(function() {
  $("#showRepos").text(repos);
});
