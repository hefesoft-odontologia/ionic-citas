angular.module('starter')
.factory('varsFactoryService', [function () {
	
	var vars = {};
	var prestadorSeleccionado;
	var captcha;
	var captchaFijado = false;

	vars.fijarPrestador = function(prestador){
		prestadorSeleccionado = prestador;
	}

	vars.prestadorSeleccionado = function(){
		return prestadorSeleccionado;
	}

	vars.captchaSet = function(response){
		captcha = response;
		captchaFijado = true;
	}

	vars.captchaFijado = function(){
		return captchaFijado;
	}

	return vars;
	
}])