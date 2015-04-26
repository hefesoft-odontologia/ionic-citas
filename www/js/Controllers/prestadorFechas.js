angular.module('starter')
.controller('prestadorFechasCtrl', 
    ['$scope', 'dataTableStorageFactory', '$ionicLoading', 'users', '$state','varsFactoryService', '$stateParams', 'pushFactory', 'emailFactory',
	function ($scope, dataTableStorageFactory, $ionicLoading, users, $state, varsFactoryService, $stateParams,  pushFactory, emailFactory) {
	$scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
    var prestador = $stateParams.prestadorId;
	
    //Hay que validar si es Internet explorer para mostrar el datapicker adecuado
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    $scope.listado =[];
    $scope.datosCita = {};
    var anioActual = new Date().getFullYear();
    var mesActual = new Date().getMonth();
    var diaActual = new Date().getDay();
    var ieHora;
    var ieMinuto;

    $scope.esIE = false;
    var ieDatePicker;
    var ieTimePicker;
    
    if(isIE){
        $scope.esIE = true;
    }

    $scope.datePicker = function(ctrl){
        ieDatePicker = ctrl;
        ieDatePicker.minYear = anioActual;
        ieDatePicker.minMonth = mesActual;
        ieDatePicker.minDay = diaActual;
        
    }

    $scope.timerPicker = function(ctrl){
        ieTimePicker = ctrl;
    }

    $scope.dateChanged = function(e){
        var fecha = ieDatePicker.current;
        anioActual = fecha.getFullYear();
        mesActual =  fecha.getMonth();
        diaActual =  fecha.getDay();
    }

    $scope.timeChanged = function(e){
        var hora = ieTimePicker.current;
        ieHora = hora.getHours(); // => 9
        ieMinuto = hora.getMinutes(); // =>  30
        //hora.getSeconds(); // => 51
    }

    

    $scope.solicitarCita = function(){
        var usuario = users.getCurrentUser();
        var item = varsFactoryService.prestadorSeleccionado();
        var platformPush = pushFactory.getPlatform();

        if(!isIE){
            $scope.datosCita.fecha = new Date(anioActual, mesActual, diaActual, ieHora, ieMinuto, 0, 0);
        }

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