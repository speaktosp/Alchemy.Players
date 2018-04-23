let PlayerURL = coreURL+ "/api/players";

myApp.controller('PlayersController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'SessionService',
															 function($scope,   $rootScope,   $http,   $location,   $routeParams, SessionService){
	console.log('PlayersController loaded...');

	$scope.getPlayers = function(){
		$http.get(PlayerURL, SessionService.createAuthHeader()).success(function(response){
			$scope.players = _.map(response.players,function(player){
				player.isLeft = false;
				if(player.handedness == 'left'){
					player.isLeft = true;
				}
				return player;
			});;
		}).catch(function(e){
			$scope.logout();
			window.location.href='#/login';
			return Observable.throw(
				new Error(`${ e.status } ${ e.statusText }`)
			);
		});
	}

	$scope.getPlayer = function(){
		let id = $routeParams.id;

		$http.get(PlayerURL, SessionService.createAuthHeader()/*here*/).success(function(response){
				let filteredResult = _.filter(response.players,function(player){
				player.isLeft = false;
				if(player.id == id){
					player.handedness = _.upperFirst(_.toLower(player.handedness))
					return true;
				}
				});
				$scope.player = filteredResult ? filteredResult[0]: {};
			}).catch(function(e){
				window.alert("Unable to fetch the player information.");
				return Observable.throw(
					new Error(`${ e.status } ${ e.statusText }`)
				);
			});
	}

	$scope.addPlayer = function(){
		console.log($scope.player);
		$http.post(PlayerURL,
			$scope.player,
			SessionService.createPOSTAuthHeader()
		)
		.success(function(response){
			 if(response.success){
				 console.log(`${$scope.player.first_name} Player has been created`);
			 }
			 window.location.href='#/players';
		})
		.catch(function(e){
			window.alert("Unable to add the player information. Please click 'Go back' to proceed.");

			return Observable.throw(
				new Error(`${ e.status } ${ e.statusText }`)
			);
		});
	}

	$scope.updatePlayer = function(id){
		console.log($scope.player);
		console.log(`About to update the user with ID = ${id}`);
		$scope.removePlayer(id).then(function(){
			$scope.addPlayer();
		});
	}

	$scope.logout = function() {
			SessionService.destroy('token');
	};

	$scope.removePlayer = function(id){
		console.log(`About to delete the user with ID = ${id}`);
		return $http.delete(PlayerURL+"/"+id, SessionService.createAuthHeader()).success(function(response){
			window.location.href='#/players';
		});
	}
}]);
