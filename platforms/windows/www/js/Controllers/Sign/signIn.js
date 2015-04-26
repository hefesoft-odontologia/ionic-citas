angular.module('starter')
.controller('signInController', ['$scope','signFactoryService','$ionicLoading','$state', 'users', 'pushFactory',
	function ($scope, signFactoryService, $ionicLoading, $state, users, pushFactory) {
	
	$scope.loginData= {};
	var usuario = users.getCurrentUser();

	if(!angular.isUndefined(usuario) && usuario.email.length >0){
		$scope.loginData.username = usuario.email;
		$scope.loginData.password = usuario.password;
		//$state.go("app.citas");	
	}

	$scope.registrarse = function(){
		$state.go("app.signup");
	}

	$scope.doSign = function(){
		$ionicLoading.show();
		signFactoryService.sign($scope.loginData).then(success, error);
	}

	function success(data){
		console.log(data);
		$ionicLoading.hide();
		$state.go("app.citas");
		pushFactory.registerAndroid();
	}

	function error(data){
		console.log(data);
		$ionicLoading.hide();
	}

}])