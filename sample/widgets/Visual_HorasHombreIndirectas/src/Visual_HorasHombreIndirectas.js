'use strict';

angular.module('adf.widget.Visual_HorasHombreIndirectas', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('Visual_HorasHombreIndirectas', {
        title: 'Horas Hombre Indirectas',
        description: 'Horas hombre de la tarea planteada que genera Horas indirectas',
        templateUrl: '{widgetsPath}/Visual_HorasHombreIndirectas/src/view.html',
        controller: 'HorasHombreIndirectasController',
        edit: {
          templateUrl: '{widgetsPath}/Visual_HorasHombreIndirectas/src/edit.html'
        }
      });
  }).service('HorasHombreIndirectasService', function($q, $http, $rootScope){
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
  .controller('HorasHombreIndirectasController', function($scope, $rootScope,  $sce, ValorGanadoService){
    $scope.chart = c3.generate({
            bindto: '#chart-horas-hombre-indirectas',
            size: {
                height: 240
            },  
            data: {
            x: 'x',
            type: 'bar',
            colors : {
              'Planed':'#4683C8', 
              'Actual':'#A9A9A9',
            },
            columns: [
                ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
                ['Planed', 30, 200, 100, 400, 150, 250],
                ['Actual', 130, 340, 200, 500, 250, 350]
            ]
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
          }
        }); 

  });
