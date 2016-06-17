'use strict';

angular.module('firebase.auth', [])
  
  .factory('auth', ["$firebaseAuth", function ($firebaseAuth) {
    return $firebaseAuth();
  }]);
