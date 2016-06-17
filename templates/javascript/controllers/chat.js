'use strict';
/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('<%= scriptAppName %>')
  .controller('ChatCtrl', ["$scope", "$firebaseArray", "$timeout", "Ref", function ($scope, $firebaseArray, $timeout, Ref) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    var query = Ref.child('messages').limitToLast(10);
    var messages = $firebaseArray(query);

    messages.$loaded()
      .then(function () {
        $scope.messages = messages;
      })
      .catch(alert);

    // provide a method for adding a message
    $scope.addMessage = function (newMessage) {
      if (newMessage) {
        // push messages to the end of the array
        $scope.messages.$add({
          text: newMessage
        })
          .catch(alert);
      }
    };

    function alert(msg) {
      $scope.err = msg;
      console.log(msg);
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }
  }]);
