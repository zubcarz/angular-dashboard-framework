'use strict';

angular.module('adf.widget.Visual_ValorGanado', ['adf.provider'])
  .config(function(dashboardProvider){
    console.log(dashboardProvider);
    dashboardProvider
      .widget('Visual_ValorGanado', {
        title: 'Visual_ValorGanado',
        description: 'Valor ganado por cada agrupacion ',
        templateUrl: '{widgetsPath}/Visual_ValorGanado/src/view.html',
        controller: 'ValorGanadoController',
        edit: {
          templateUrl: '{widgetsPath}/Visual_ValorGanado/src/edit.html'
        }
      });
  }).service('ValorGanadoService', function($q, $http, $rootScope){
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
  .controller('ValorGanadoController', function($scope, $rootScope,  $sce, ValorGanadoService){
    $scope.chart = c3.generate({
            bindto: '#chart-Valor-Ganado',
            size: {
                height: 240
            },  
            data: {
            x: 'x',
            columns: [
                ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
                ['Planed Value', 30, 200, 100, 400, 150, 250],
                ['Earned Value', 130, 340, 200, 500, 250, 350],
                ['Actual Cost', 30, 40, 200, 420, 440, 500]
            ],
            colors : {
              'Planed Value':'#4683C8', 
              'Earned Value':'#E56424', 
              'Actual Cost':'#A9A9A9',
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
          tooltip: {
                    show: true,
                    grouped: false,
                    contents: 
                    function (d, defaultTitleFormat, defaultValueFormat, color) {
                    console.log(d);
                     var table = "<div id='tooltip' class='d3-tip'>";
                      table +=  "<table class=\"c3-tooltip\"><tbody><tr><th colspan=\"3\">"+"Valor Ganado"+"</th></tr><tr class=\"c3-tooltip-name--day\"><td class=\"name\"><span style=\"background-color:#4683C8\"></span>"+"PV"+"</td><td class=\"value\">"+"Value"+"</td></tr><tr class=\"c3-tooltip-name--day\"><td class=\"name\"><span style=\"background-color:#EC8A3A\"></span>"+"EV"+"</td><td class=\"value\">"+"Value"+"</td></tr><tr class=\"c3-tooltip-name--day\"><td class=\"name\"><span style=\"background-color:#7F7F7F\"></span>"+"AC"+"</td><td class=\"value\">"+"Value"+"</td></tr><tr class=\"c3-tooltip-name--day\"><td class=\"name\">"+"SCI"+"</td><td class=\"value\">"+"Value"+"</td></tr><tr class=\"c3-tooltip-name--day\"><td class=\"name\">"+"SPI"+"</td><td class=\"value\">"+"Value"+"</td></tr></tbody></table>";
                      table += "</div>";
                      return table; 
                    }
           }
        });

  });
