angular.module('starter')
.controller('misCitasCtrl', ['$scope', 'dataTableStorageFactory', '$q', 'validarNavegacionService', 'users', '$ionicLoading', 'pushFactory', 'conexionSignalR', 'messageService',
	function ($scope, dataTableStorageFactory, $q, validarNavegacionService, users, $ionicLoading, pushFactory, conexionSignalR, messageService) {
	
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;  
	var valido = validarNavegacionService.validarUsuarioSeleccionado();
   
    if(valido){
        loadData();       
    }


    function loadData(){
    	var usuario = users.getCurrentUser();
    	$ionicLoading.show();
    	dataTableStorageFactory.getTableByRowKey('TmCitas', usuario.username) 
    	.success(function (data) {
            $ionicLoading.hide();           
            $scope.listado = data;
        })
        .error(function (error) {
            console.log(error);
            $ionicLoading.hide();            
        });
    }

    $scope.cancelar = function(item){
        var usuario = users.getCurrentUser();
        item.aceptadaUsuario = "3";
        dataTableStorageFactory.saveStorage(item).then(success, error);        
        pushFactory.enviarMensajeUsername(item.prestadorEmail, "Ha cancelado la cita del dia: " +  item.fecha); 
        
        //para, de, tipo, mensaje, accion
        conexionSignalR.procesarMensaje(item.prestadorEmail, usuario.email, "ejecutar accion", item.RowKey, "cita cancelada");
    }

    $scope.$on('cita cancelada', function(event, args) {
       try{
           var RowKey = args.mensaje;
           var cita = _.find($scope.listado, { 'RowKey': RowKey })
           cita.aceptadaUsuario = "3";        
           messageService.showMessage("Cita cancelada por " + cita.RowKey + " " + cita.fecha);        
       }
       catch(ex){
            messageService.showMessage("Una cita a sido cancelada"); 
       }
       
    })

    function success(data){
        console.log(data);
    }

    function error(error){
        console.log(error);
    }

	
}])