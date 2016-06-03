'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('<%= scriptAppName %>')
  .controller('AccountCtrl', ["$scope", "auth", "$firebaseObject", "currentAuth", function (
    $scope,
    auth,
    currentAuth,
    $firebaseObject
  <% if( hasPasswordProvider ) { %>, $timeout <% } %>
  ) {

    $scope.messages = [];
    currentAuth.$bindTo($scope, 'currentAuth');

    <% if( hasPasswordProvider ) { %>

    $scope.changePassword = function(oldPass, newPass, confirm) {
      $scope.err = null;

      if( !oldPass || !newPass ) {
        error('Please enter all fields');

      } else if( newPass !== confirm ) {
        error('Passwords do not match');

      } else {
        // New Method
        auth.$updatePassword(newPass).then(function() {
          success('Password changed');
        }, error);

      }
    };

    $scope.changeEmail = function (newEmail) {
      console.log('changing');
      auth.$updateEmail(newEmail)
        .then(function () {
          console.log("changed");
        })
        .catch(function (error) {
          console.log("Error: ", error);
        })
    };

    $scope.logout = function() {
      auth.$signOut();
    };

    function error(err) {
      alert(err, 'danger');
    }

    function success(msg) {
      alert(msg, 'success');
    }

    function alert(msg, type) {
      var obj = {text: msg+'', type: type};
      $scope.messages.unshift(obj);
      $timeout(function() {
        $scope.messages.splice($scope.messages.indexOf(obj), 1);
      }, 10000);
    }<% } %>

  }]);
