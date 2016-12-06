'use strict';

angular.module('adf.widget.Visual_Recursos', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('Visual_Recursos', {
        title: 'Visual_Recursos',
        description: 'Indicadores de Productividad',
        templateUrl: '{widgetsPath}/Visual_Recursos/src/view.html',
        controller: 'ValorRecursosController',
        edit: {
          templateUrl: '{widgetsPath}/Visual_Recursos/src/edit.html'
        }
      });
  }).service('ValorRecursosService', function($q, $http, $rootScope){
    return {
      //service Example
      /*
      getData: function(){
        //TODO  obtener los parámetros del objeto de configuración global
        var filterParams = $rootScope.filterParams;
        var serviceUrl = $rootScope.options.serverUrl + "get_num_acc_grav"
        var deferred = $q.defer();
		    var fparams = JSON.stringify(filterParams);
        var requestConfig = {
            headers: {'Content-Type': "application/json"}
        };
        $http.post(serviceUrl, filterParams ,requestConfig  ).success(function(data){
            if (data  ){
              deferred.resolve(data);
            } else {
              deferred.resolve( [] );
            }
          })
          .error(function(){
            deferred.reject();
          });
        return deferred.promise;
      }*/
    };
  })
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  // Controlador asociado a la vista del widget
  .controller('ValorRecursosController', function($scope, $rootScope,  $sce, ValorRecursosService){
    $scope.chart = c3.generate({
            bindto: '#chart-Valor-Recursos',
            size: {
                height: 240
            },  
            data: {
            x: 'x',
            columns: [
                ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
                ['Planed', 300, 400, 450, 480, 500, 520],               
                ['Real', 305, 405, 400, 460, 510, 540]
            ],
            colors : {
              'Planed':'#4683C8',              
              'Real':'#A9A9A9',
            },
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
                }
            },
            zoom: {
              rescale: true,
              enabled: true
          },
          
        });

  });
