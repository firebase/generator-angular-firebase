'use strict';
/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('<%= scriptAppName %>')
  .controller('LoginCtrl', ["$scope", "$firebaseAuth", function ($scope, $firebaseAuth, $location) {

    //<% if( hasPasswordProvider ) { %>, $q, Ref, $timeout<% } %>) {

    $scope.authObj = $firebaseAuth();

    <%
    if (hasOauthProviders) { %>

      // SignIn with a Provider
      $scope.oauthLogin = function (provider) {
        $scope.authObj.$signInWithPopup(provider)
          .then(function (authData) {
            console.log("logged");
            redirect();
          })
          .catch(function (error) {
            console.log("login error");
            showError();
          })
      };

      // Anonymous login method
      $scope.anonymousLogin = function () {
        $scope.authObj.$signInAnonymously()
          .then(function (authData) {
            console.log("logged");
            redirect();
          })
          .catch(function (error) {
            console.log("login error");
            showError();
          })
      };

    <%
    }
    %><%
    if (hasPasswordProvider) { %>

      // Autenthication with password and email
      $scope.passwordLogin = function (email, pass) {

        $scope.authObj.$signInWithEmailAndPassword(email, pass)
          .then(function (authData) {
            redirect();
            console.log("logged");
          })
          .catch(function (error) {
            showError(error);
            console.log("error: " + error);
          });
      };

      // Create user with email and password
      $scope.createAccount = function (email, pass, confirm) {
        $scope.err = null;

        if (!pass) {
          $scope.err = 'Please enter a password';

        }
        else if (pass !== confirm) {
          $scope.err = 'Passwords do not match';

        } else {

          // After creating the account, user will automatically login
          $scope.authObj.$createUserWithEmailAndPassword(email, pass)
            .then(function (userData) {
              console.log("User " + userData.uid + " created successfully!");
            })
            .then(function (authData) {
              console.log("Logged in as: " + authData.uid);
              redirect();
            })
            .catch(function (error) {
              console.log("Error: ", error);
              showError();
            })
        }

      };

      $scope.createAccount = function (email, pass, confirm) {
        $scope.err = null;
        if (!pass) {
          $scope.err = 'Please enter a password';
        }
        else if (pass !== confirm) {
          $scope.err = 'Passwords do not match';
        }
        else {
          Auth.$createUser({email: email, password: pass})
            .then(function () {
              // authenticate so we have permission to write to Firebase
              return Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
            })
            .then(createProfile)
            .then(redirect, showError);
        }

        //todo wait till SDK 3.x support comes up to test
        function createProfile(user) {
          var ref = Ref.child('users').child(user.uid), def = $q.defer();
          ref.set({email: email, name: firstPartOfEmail(email)}, function (err) {
            $timeout(function () {
              if (err) {
                def.reject(err);
              }
              else {
                def.resolve(ref);
              }
            });
          });
          return def.promise;
        }

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

    <%
    }
    %>

    function redirect() {
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }


  }]);
