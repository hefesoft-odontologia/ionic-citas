angular.module('starter')
.controller('signInController', ['$scope','signFactoryService','$ionicLoading','$state', 'users', 'pushFactory', 'UniversalApps', 'validarNavegacionService',
	function ($scope, signFactoryService, $ionicLoading, $state, users, pushFactory, UniversalApps, validarNavegacionService) {
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	$scope.loginData= {};

	validarNavegacionService.validarCaptcha();
	var usuario = users.getCurrentUser();

	if(!angular.isUndefined(usuario) && usuario.email.length >0){
		$scope.loginData.username = usuario.email;
		$scope.loginData.password = usuario.password;
		//$state.go("app.citas");	
	}

	$scope.registrarse = function(){
		$state.go("signup");
	}

	$scope.doSign = function(){
		$ionicLoading.show();
		signFactoryService.sign($scope.loginData).then(success, error);
	}

	function success(data){
		UniversalApps.login($scope.loginData.username, $scope.loginData.password);
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