"use strict"

###
@ngdoc function
@name <%= scriptAppName %>.controller:ChatCtrl
@description
# ChatCtrl
A demo of using AngularFire to manage a synchronized list.
###
angular.module("<%= scriptAppName %>").controller "ChatCtrl", ["$scope", "$firebaseArray", "$timeout", <% if(loginModule) { %> "currentAuth", <% } %> ($scope, $firebaseArray, $timeout, <% if(loginModule) { %> currentAuth <% } %>) ->
  alert = (msg) ->
    $scope.err = msg
    $timeout (->
      $scope.err = null
    ), 5000

  # synchronize a read-only, synchronized array of messages, limit to most recent 10
  query = rootRef.child('messages').limitToLast(10)
  messages = $firebaseArray(query)

  messages.$loaded().then ->
    $scope.messages = messages
  .catch alert

  # provide a method for adding a message
  $scope.addMessage = (newMessage) ->
    if newMessage

      # push a message to the end of the array
      $scope.messages.$add({
        text: newMessage
        <% if(loginModule) { %>
        ,user: currentAuth.displayName,
        userId: currentAuth.uid
        <% } %>
      }).then null, alert

      return
]
