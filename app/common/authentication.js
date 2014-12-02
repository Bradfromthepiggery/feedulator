angular.module('app.common-auth', [
    'auth0'
])
.controller('AuthCtrl', AuthController)

AuthController.$inject = ['$scope', 'auth'];

function AuthController($scope, auth) {
  auth.profilePromise.then(function() {
     $scope.profile = auth.profile;
  });
}
