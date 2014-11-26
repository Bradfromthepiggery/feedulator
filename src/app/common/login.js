angular.module('app.common-login', [
        'ui.router'
    ])
    .controller('LoginCtrl', LoginController);

LoginController.$inject = ['$scope', 'auth'];

function LoginController($scope, auth) {
    $scope.signIn = function() {
        auth.signin({
            authParams: {
                scope: 'openid profile'
            }
        }, function() {
            // Successful login
        }, function(err) {
            console.error("Error logging in");
        });
    }
}
