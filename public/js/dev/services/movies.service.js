'use strict';

angular.module('moviesAppV2')

  .factory('movies', ['$http', '$mdDialog','$mdToast','toast', function($http, $mdDialog, $mdToast, toast) {

      var factory = {};

      factory.toast = toast;
      factory.sortProperties = ['Year','imdbRating'];
      factory.increasing = true;
      factory.intro = true;

      factory.search = function(title, year) {
        var movie = {};
        if (year) {
          movie = {
            title,
            year
          };
        } else {
          movie = {
            title
          };
        }
        $http.post('/moviesSearch', movie).then(function successCallback(response) {
          if (response.data.Response === 'False') {
              alert = $mdDialog.alert({
                title: 'Sorry!',
                textContent: 'Movie with that title does not exist in the datastore. Please type once again.',
                ok: 'Close'
              });
              $mdDialog
                .show(alert)
                .finally(function() {
                    alert = undefined;
              });
          } else {
            factory.found = response.data;
            factory.movieFound = true;
            factory.showMoviesList = false;
            factory.intro = false;
          }
          factory.title = '';
          factory.year = '';
        });
      };

      factory.save = function(movie) {
        $http.post('/movieSave', movie).then(function successCallback(response) {
          if (response.data === 'exist') {
            alert = $mdDialog.alert({
              title: 'Sorry!',
              textContent: 'Movie with that title already exist in the database. Failed to save.',
              ok: 'Close'
            });
            $mdDialog
              .show(alert)
              .finally(function() {
                  alert = undefined;
            });
          } else {
            toast.movieSaved();
          }
        });
      };

      factory.getAll = function() {
        $http.get('/movies').then(function successCallback(response) {
          factory.all = response.data;
          factory.showMoviesList = true;
          factory.movieFound = false;
          factory.intro = false;
        });
      };

      factory.show = function(_id) {
        $http.post('/movieShow', {_id}).then(function successCallback(response) {
          factory.found = response.data;
          factory.movieFound = true;
          factory.showMoviesList = false;
        });
      }

      factory.getGenres = function() {
        $http.get('/movies').then(function successCallback(response) {
          factory.genres = [];
          response.data.forEach(function(movie) {
            movie.Genre = movie.Genre.replace(/ /g,'');
            var genres = movie.Genre.split(',');
            genres.forEach(function(genre) {
              if (!factory.genres.includes(genre)) {
                factory.genres.push(genre);
              }
            });
          });
        });
      };

      factory.getGenres();

      return factory;

  }]);
