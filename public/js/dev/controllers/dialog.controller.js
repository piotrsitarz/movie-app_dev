'use strict';
angular.module('moviesAppV2')

    .controller('dialogController', ['$scope', 'comments', 'randomName', function($scope, comments, randomName) {

      $scope.comments = comments;
      $scope.randomName = randomName;

    }]);
