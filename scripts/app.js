'use strict';

var app = angular
.module('SnapwichApp', [
  'ngAnimate',    
  'ngResource',
  'ngRoute',    
  'firebase'
  ])

  .constant('FURL', 'https://snapwich.firebaseio.com/')

  .config(function ($routeProvider) {
    $routeProvider      
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'AuthController'
    })
    .when('/entry', {
      templateUrl: 'views/entry.html'  
    })
    .when('/create', {
      templateUrl: 'views/create.html'  
    })
    .when('/admin', {
      templateUrl: 'views/admin.html'  
    })
    .otherwise({
      redirectTo: '/'
    });
  });