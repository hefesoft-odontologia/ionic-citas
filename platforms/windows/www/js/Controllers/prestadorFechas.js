angular.module('starter')
.controller('prestadorFechasCtrl', 
    ['$scope', 'dataTableStorageFactory', '$ionicLoading', 'users', '$state','varsFactoryService', '$stateParams', '$cordovaDatePicker', 'pushFactory', 'emailFactory',
	function ($scope, dataTableStorageFactory, $ionicLoading, users, $state, varsFactoryService, $stateParams, $cordovaDatePicker, pushFactory, emailFactory) {
	$scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
    var prestador = $stateParams.prestadorId;
	
    $scope.listado =[];
    $scope.datosCita = {};

    var options = {
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: new Date(),
        allowOldDates: true,
        allowFutureDates: false,
        doneButtonLabel: 'Aceptar',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCELAR',
        cancelButtonColor: '#000000'
      };

    $scope.$on('$ionicView.afterEnter', function(){
        
        var deviceInformation = ionic.Platform.device();
        var isWebView = ionic.Platform.isWebView();
        var isIPad = ionic.Platform.isIPad();
        var isIOS = ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isAndroid();
        var isWindowsPhone = ionic.Platform.isWindowsPhone();

        var currentPlatform = ionic.Platform.platform();
        var currentPlatformVersion = ionic.Platform.version();

        if(isAndroid || isIOS || isIPad){
             $cordovaDatePicker.show(options).then(function(date){
                $scope.datosCita.fecha = date;
                console.log(date);
            });
        }

    });
    

    $scope.solicitarCita = function(){
        var usuario = users.getCurrentUser();
        var item = varsFactoryService.prestadorSeleccionado();
        var platformPush = pushFactory.getPlatform();

        var data = {
            prestador : item.username,
            platform : platformPush,
            PartitionKey : item.username,
            RowKey: usuario.username,
            solicitadaPor : usuario.username,
            nombreTabla: 'TmCitas',
            fecha : $scope.datosCita.fecha
        }

        var textoCita = 'Nueva cita solicitada';
        pushFactory.enviarMensajePlatform(item.email,textoCita, item.platform);
        emailFactory.enviarEmail(usuario.email, item.email, 'Cita solicitada', textoCita, textoCita);
        dataTableStorageFactory.saveStorage(data);
    }
}])