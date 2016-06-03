'use strict';

angular.module('firebase.auth', [])

  <%  if( loginModule ) { %>

    .constant('SIMPLE_LOGIN_PROVIDERS', ['<%= _.map(authProviders, function(p) {

  return p.value;

}).join("','") %>'])

  .constant('loginRedirectPath', '/login')
<% } %>

  .factory('auth', ["$firebaseAuth", function ($firebaseAuth) {
      return $firebaseAuth();
    }]);
