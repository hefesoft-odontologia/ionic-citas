angular.module('starter')
.service('platformService', [function () {

	var isWebView = ionic.Platform.isWebView();
    var isIPad = ionic.Platform.isIPad();
    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
    var isWindowsPhone = ionic.Platform.isWindowsPhone();

    var currentPlatform = ionic.Platform.platform();
    var currentPlatformVersion = ionic.Platform.version();

    var dataFactory = {};

    dataFactory.esMobile = function(){
    	return (isIPad || isIOS || isAndroid || isWindowsPhone);
    }


    return dataFactory;
	
}])