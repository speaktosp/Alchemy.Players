myApp.controller('UsersController', ['$scope', '$http', '$location', '$routeParams', 'SessionService', function($scope, $http, $location, $routeParams, SessionService){
	console.debug('UsersController loaded...');
	let userURL = coreURL+ "/api/user";
	function redirectOnSessionValidation(){
		if(SessionService.isValidSession()){
		 window.location.href='#/players';
		}else{
			 window.location.href='#/login';
		}
	}
	$scope.addUser = function(){
		console.log($scope.user);
		$http.post(userURL,
			$scope.user,
			SessionService.createPOSTAuthHeader()
		)
		.success(function(response){
			 if(response.success){
 					window.alert("The user account has been created. Please validate your email to proceed.");
				  console.debug(`User with the name ${$scope.user.first_name} has been created`);
			 }
			 redirectOnSessionValidation();
		})
		.catch(function(e){
			window.alert("Unable to create the user. Please click 'Go back' to proceed.");

			return Observable.throw(
				new Error(`${ e.status } ${ e.statusText }`)
			);
			redirectOnSessionValidation();
		});

	}
}]);
