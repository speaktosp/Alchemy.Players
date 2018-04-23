let myApp = angular.module('myApp',['ngRoute']);
let coreURL = 'https://player-api.developer.alchemy.codes';

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'LoginController',
		templateUrl: 'views/login.html'
	})
	.when('/#', {
		controller:'LoginController',
		templateUrl: 'views/login.html'
	})
	.when('/login', {
		controller:'LoginController',
		templateUrl: 'views/login.html'
	})
	.when('/register', {
		controller:'UsersController',
		templateUrl: 'views/add_user.html'
	})
	.when('/players', {
		controller:'PlayersController',
		templateUrl: 'views/players.html',
		secure: true //This route requires an authenticated user
	})
	.when('/players/details/:id',{
		controller:'PlayersController',
		templateUrl: 'views/player_details.html',
		secure: true //This route requires an authenticated user
	})
	.when('/players/add',{
		controller:'PlayersController',
		templateUrl: 'views/add_player.html',
		secure: true //This route requires an authenticated user
	})
	.when('/players/edit/:id',{
		controller:'PlayersController',
		templateUrl: 'views/edit_player.html',
		secure: true //This route requires an authenticated user
	})
	.when('/users/add',{
		controller:'UsersController',
		templateUrl: 'views/add_user.html',
		secure: true //This route requires an authenticated user
	})
	.when('/about',{
		controller:'AboutController',
		templateUrl: 'views/about.html'
	})
	.otherwise({
		redirectTo: '/login'
	});

});

myApp.run(['$rootScope', '$location', 'SessionService',
    function ($rootScope, $location, SessionService) {
        //Client-side security.
				$rootScope.$on('$routeChangeStart', function(event, next, current){
						if (next && next.$$route && next.$$route.secure) {
								if (!SessionService.isValidSession()) {
				          	window.location.href='#/players';
								}
						}
		    });
}]);
