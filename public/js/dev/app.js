'use strict';
var app = angular.module('moviesAppV2', ['ngRoute','ngMessages','ngMaterial',])

  .config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $routeProvider.
      when('/', {
        templateUrl: '/views/main.html',
        controller: 'mainController'
      }).
      otherwise({
        redirectTo: '/'
      });

  }]);
