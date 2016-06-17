"use strict"

###
@ngdoc function
@name <%= scriptAppName %>.controller:LoginCtrl
@description
# LoginCtrl
Manages authentication to any active providers.
###
angular.module("<%= scriptAppName %>")
  .controller "LoginCtrl", ["$scope", "auth", "$location", "$firebaseArray", "currentAuth", "Ref", ($scope, auth, $location, $firebaseArray, currentAuth, Ref) ->

  auth.$onAuthStateChanged (authData) ->
    if (authData) {
      $scope.err = null
      console.log(" logged: " + authData.uid)
      redirect()
    }
    return


  redirect = ->
    $location.path "/account"
    return
  showError = (err) ->
    $scope.err = err
    console.log err
    return

  <% if( hasOauthProviders ) { %>

  $scope.oauthLogin = (provider) ->
    $scope.err = null
    auth.$signInWithPopup(provider).then (authData) ->
    console.log "logged #{authData.uid}", showError
    return

  $scope.anonymousLogin = ->
    auth.$signInAnonymously().then -> console.log "logged", showError
    return
  <% } %>

  <% if( hasPasswordProvider ) { %>

## Autenthication with password and email
  $scope.passwordLogin = (email, pass) ->
    $scope.err = null
    auth.$signInWithEmailAndPassword(
      email: email
      password: pass
    ,
      rememberMe: true
    ).then (authData) ->
      redirect()
      console.log "logged #{authData.uid}"
    .catch (error) -> showError error
    return

  firstPartOfEmail = (email) ->
    ucfirst email.substr(0, email.indexOf('@')) or ''

  ucfirst = (str) ->
    # inspired by: http://kevin.vanzonneveld.net
    str += ''
    f = str.charAt(0).toUpperCase()
    f + str.substr(1)

  $scope.createAccount = (email, pass, confirm) ->

    createProfile (uid, email) ->
      query = Ref.child('users');
      userObj = $firebaseArray(query);
      userObj.$add({
        email: email,
        name: firstPartOfEmail(email),
        id: uid
      }).then (ref) -> console.log "added user with id #{ref.key}"

    $scope.err = null
    if !pass
      $scope.err = 'Please enter a password'
    else if pass != confirm
      $scope.err = 'Passwords do not match'
    else
      auth.$createUserWithEmailAndPassword(email, pass).then ->
      (createProfile).then redirect, showError
    return
  <% } %>
  return
]
