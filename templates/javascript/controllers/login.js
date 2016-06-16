'use strict';
/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('<%= scriptAppName %>')
  .controller('LoginCtrl', ["$scope", "auth", "$location", "$firebaseArray", "Ref", function ($scope, auth, $location, $firebaseArray, Ref) {

    auth.$onAuthStateChanged(function (authData) {
      if (authData) {
        $scope.err = null;
        console.log(" logged: " + authData.uid);
        redirect();
      }
    });

    <% if (hasOauthProviders) { %>

      // SignIn with a Provider
      $scope.oauthLogin = function (provider) {
        auth.$signInWithPopup(provider)
          .then(function (authData) {
            console.log("logged");
          })
          .catch(function (error) {
            showError(error);
          })
      };

      // Anonymous login method
      $scope.anonymousLogin = function () {
        auth.$signInAnonymously()
          .then(function (authData) {
            console.log("logged ", authData.uid);
          })
          .catch(function (error) {
            console.log("login error ", error);
          })
      };

    <% } %>

    <% if (hasPasswordProvider) { %>

      // Autenthication with password and email
      $scope.passwordLogin = function (email, pass) {

        auth.$signInWithEmailAndPassword(email, pass)
          .then(function (authData) {
            console.log("logged");
          })
          .catch(function (error) {
            showError(error);
          });
      };

      $scope.createAccount = function (email, pass, confirm) {
        $scope.err = null;

        if (!pass) {
          $scope.err = 'Please enter a password';
        } else if (pass !== confirm) {
          $scope.err = 'Passwords do not match';
        } else {
          auth.$createUserWithEmailAndPassword(email, pass)
            .then(function (userData) {
              console.log("User " + userData.uid + " created successfully");
              return userData;
            })
            .then(function (authData) {
            console.log("Logged user: ", authData.uid);
              createProfile(authData.uid, email);
            })
            .catch(function (error) {
              console.error("Error: ", error);
            });
          }
        };

      function createProfile(uid, email) {

        var query = Ref.child('users');
        var userObj = $firebaseArray(query);
        userObj.$add({
            email: email,
            name: firstPartOfEmail(email),
            id: uid
          })
          .then(function (ref) {
            console.log("added user with id " + ref.key);
          });

      };

      function firstPartOfEmail(email) {
        return ucfirst(email.substr(0, email.indexOf('@')) || '');
      }

      function ucfirst(str) {
        // inspired by: http://kevin.vanzonneveld.net
        str += '';
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
      }

    <% } %>

    function redirect() {
      $location.path('/account');
    }

    function showError(err) {
      console.log(err);
      $scope.err = err;
    }


  }]);
