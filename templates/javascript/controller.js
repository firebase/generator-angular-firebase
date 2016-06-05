'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= classedName %>Ctrl
 * @description
 * # <%= classedName %>Ctrl
 * Controller of the <%= scriptAppName %>
 */
angular.module('<%= scriptAppName %>')
  .controller('<%= classedName %>Ctrl', "auth", "$scope", "$location", function (auth, $scope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.loginBtn = true;
    $scope.logoutBtn = false;

    auth.$onAuthStateChanged(function (authData) {
      if (authData) {
        console.log(" logged dude: " + authData.uid);
        $scope.logoutBtn = true;
        $scope.loginBtn = false;
        $location.path('/home');
      } else {
        console.log("damn logged out");
        $scope.logoutBtn = false;
        $scope.loginBtn = true;
        $location.path('/login');
      }
    });

    $scope.logout = function () {
      auth.$signOut();
      $scope.authData = null;
    };

  });
