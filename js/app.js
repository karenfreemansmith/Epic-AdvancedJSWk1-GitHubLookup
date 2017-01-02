(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// TODO: add logic for users when key is not available
//var apiKey = require('./../../.env').apiKey;

function GitHubUser() {
}

GitHubUser.prototype.getUser = function(username, displayUser, displayUserNotFound) {
  $.get('https://api.github.com/users/'+ username)
    .then(function(response){
      displayUser(response);
    })
    .fail(function(error){
      displayUserNotFound();
    });
  };

GitHubUser.prototype.getFavorites = function(username, displayFavorites) {
  var favorites=[];
  $.get('https://api.github.com/users/'+ username +'/following?per_page=99')
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
  $.get('https://api.github.com/users/'+ username +'/repos?sort=pushed&per_page=100')
    .then(function(response){
      response.forEach(function(repo) {
        bigresponse.push(repo);
      });
      $.get('https://api.github.com/users/'+ username +'/repos?sort=pushed&page=2&per_page=100')
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

},{}],2:[function(require,module,exports){
var GitHubUser = require('./../src/js/profile.js').getRepos;

var displayUser = function(response) {
  $(".showUser").text("");
  $(".showUser").append("<h3>" + response.name + "</h3>");
  $(".showUser").append("<p>Joined " + moment(response.created_at).startOf('day').fromNow() + "</p>");
  $(".showUser").append("<img src='"+ response.avatar_url+"' class='img-responsive img-thumbnail' alt='GitHub Avatar'>");
  $(".showUser").append("<h4>"+ response.public_repos + " Repositories, "+ response.followers +" Followers</h4>");
  $(".showUser").append("<p>" + response.bio + " (" + response.email + ")</p>");
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

  $('#getUser').click(function() {
    event.preventDefault();
    var username = $('#username').val();
    $('#username').val("");

    currentGitHubUser.getUser(username, displayUser, displayUserNotFound);
    currentGitHubUser.getFavorites(username, displayFavorites);
    currentGitHubUser.getRepos(username, displayRepos);
  });
});

},{"./../src/js/profile.js":1}]},{},[2]);
