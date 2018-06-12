'use strict';

angular.module('moviesAppV2')

  .factory('comments', ['$http', '$mdDialog', 'randomName', 'toast', 'movies',  function($http, $mdDialog, randomName, toast, movies) {

      var factory = {};

      factory.randomName = randomName;
      factory.toast = toast;
      factory.movies = movies;
      factory.showCommentsList = false;
      factory.toAdd = {};

      factory.add = function(ev, idOfMovie, titleOfMovie) {
        randomName.content = randomName.generate();
        factory.idOfMovie = idOfMovie;
        factory.titleOfMovie = titleOfMovie;
        factory.toAdd.vote = '';
        factory.toAdd.content = '';
        $mdDialog.show({
          controller: 'dialogController',
          templateUrl: '/comments_dialog',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        });
      };

      factory.save = function(user, content, vote) {
        $mdDialog.hide();
        var commentToSave = {
          user:randomName.content,
          content,
          vote,
          idOfMovie:factory.idOfMovie,
          titleOfMovie:factory.titleOfMovie
        };
        $http.post('/comments', commentToSave).then(function successCallback(response) {
          toast.commentSaved();
        });
      };

      factory.getAll = function() {
        $http.get('/comments').then(function successCallback(response) {
          factory.all = response.data;
          factory.showCommentsList = true;
        });
      };

      return factory;

  }]);
