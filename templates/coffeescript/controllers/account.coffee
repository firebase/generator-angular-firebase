"use strict"

###
@ngdoc function
@name muck2App.controller:AccountCtrl
@description
# AccountCtrl
Provides rudimentary account management functions.
###
angular.module("<%= scriptAppName %>").controller "AccountCtrl", ["$scope", "auth", "$timeout", "currentAuth", ($scope, auth, currentAuth <% if(
 hasPasswordProvider ) {
 %>, $timeout<% } %>) ->
  <% if( hasPasswordProvider ) { %>

  error = (err) ->
    alert err, "danger"
    return

  success = (msg) ->
    alert msg, "success"
    return

  <% } %>

  $scope.user = currentAuth;
  $scope.messages = [];

  <% if( hasPasswordProvider ) { %>
  $scope.authInfo = currentAuth;
  $scope.changePassword = (oldPass, newPass, confirm) ->
    $scope.err = null

    if not oldPass or not newPass
      error "Please enter all fields"
    else if newPass isnt confirm
      error "Passwords do not match"
    else
      auth.$updatePassword(newPass).then (->
        success "Password changed"
        return
      ), error
    return

  $scope.changeEmail = (newEmail) ->
    $scope.err = null
    auth.$updateEmail(newEmail).then ( ->
      success "Email changed"
      return
    ), error
    return

  $scope.logout = -> 
    auth.$signOut()
    $location.path(loginRedirectPath);

  <% } %>
  return
]
