'use strict';

var app = angular
.module('SnapwichApp', [
  'ngAnimate',    
  'ngResource',
  'ngRoute',    
  'firebase',
  'toaster'
  ])

  .constant('FURL', 'https://snapwich.firebaseio.com/')

  .config(function ($routeProvider) {
    $routeProvider      
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'ChallengeController' 
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'ChallengeController'   
    })
    .when('/entry', {
      templateUrl: 'views/entry.html',
      controller: 'ChallengeController'  
    })
    .when('/create', {
      templateUrl: 'views/create.html',
      controller: 'ChallengeController' 
    })
    .when('/add', {
      templateUrl: 'views/add.html',
      controller: 'ItemController' 
    })
    .when('/admin', {
      templateUrl: 'views/admin.html',
      controller: 'ChallengeController'  
    })
    .otherwise({
      redirectTo: '/'
    });
  });