'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('<%= scriptAppName %>')
  .controller('AccountCtrl', ["$scope", "auth", "currentAuth", "$location", "loginRedirectPath" <% if( hasPasswordProvider ) { %>, "$timeout" <% } %>, function ( $scope, auth, currentAuth,  $location, loginRedirectPath
  <% if( hasPasswordProvider ) { %>, $timeout <% } %>
  ) {

    $scope.user = currentAuth;
    $scope.messages = [];

    <% if( hasPasswordProvider ) { %>

    $scope.authInfo = currentAuth;
    $scope.changePassword = function(oldPass, newPass, confirm) {
      $scope.err = null;

      if( !oldPass || !newPass ) {
        error('Please enter all fields');

      } else if( newPass !== confirm ) {
        error('Passwords do not match');

      } else {
        // New Method
        auth.$updatePassword(newPass).then(function() {
          console.log('Password changed');
          success('Password changed');
        }, error);

      }
    };

    $scope.changeEmail = function (newEmail) {
      auth.$updateEmail(newEmail)
        .then(function () {
          console.log("email changed successfully");
          success("Email changed ");
        })
        .catch(error)
    };

    $scope.logout = function() {
      auth.$signOut();
      $location.path(loginRedirectPath);
    };

    function error(err) {
      $scope.err = err;
      console.log("Error: ", err);
    }

    function success(msg) {
      $scope.msg = msg;
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
