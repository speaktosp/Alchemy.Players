const loginURL = coreURL+'/api/login';
myApp.controller('LoginController', function($scope, $location, $rootScope, $http, SessionService) {
    $rootScope.title = "User Login Page";
    $scope.formSubmit = function() {
        $http.post(loginURL, {"email": $scope.username, "password": $scope.password}).success(function(response){
          $rootScope.userName = response.user.email;

          SessionService.set('token','Bearer '+response.token);
          $scope.error = '';
          $scope.username = '';
          $scope.password = '';
          window.location.href='#/players';
    		}).catch(function(e){
          $scope.error = "Incorrect username/password!";
          return Observable.throw(
            new Error(`${ e.status } ${ e.statusText }`)
          );
      });
    };

    $scope.register = function() {
        $rootScope.userName = $scope.username;
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        window.location.href='#/register';
    };
});
