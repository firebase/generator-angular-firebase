'use strict';

angular.module('firebase.ref', ['firebase', 'firebase.config'])
  .factory('Ref', function () {

    return firebase.database().ref();

  });
