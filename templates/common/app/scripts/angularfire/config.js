angular.module('firebase.config', [])
<% if( loginModule ) { %>
.constant('SIMPLE_LOGIN_PROVIDERS', ['<%= _.map(authProviders, function(p) {
  return p.value;
}).join("','") %>'])

  .constant('loginRedirectPath', '/login')
<% } %>
.run(function() {

  var config = {
    apiKey: '<%= apiKey %>',
    authDomain: '<%= authDomain %>',
    databaseURL: 'https://<%= databaseURL %>.firebaseio.com',
    storageBucket: '<%= storageBucket %>'
  };

  firebase.initializeApp(config);
});
