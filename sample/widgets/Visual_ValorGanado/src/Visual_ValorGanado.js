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
      
      getPathActivity: function(){
        
        //var linkUrl = "localhost:8080/visual";
        var linkUrl = "http://Default-Environment.znqi4sqsbu.us-west-2.elasticbeanstalk.com/visual"
        var serviceUrl = linkUrl+ "/path-activity"
        var deferred = $q.defer();
        $http.get(serviceUrl).success(function(data){
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
      },
      getEarnedValue: function(){
        
        //var linkUrl = "localhost:8080/visual";
        var linkUrl = "http://Default-Environment.znqi4sqsbu.us-west-2.elasticbeanstalk.com/visual"
        var serviceUrl = linkUrl+ "/earned-value"
        var deferred = $q.defer();

        var config = {
          params: {
            wsPath: "All",
            type: "All", 
            start : "2016-08-01", 
            end:"2017-01-15"
          }
        }

        $http.get(serviceUrl,config).success(function(data){
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
      },
    
    };
  })
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  // Controlador asociado a la vista del widget
  .controller('ValorGanadoController', function($scope, $rootScope,  $sce, ValorGanadoService){


        //config toogle
     $scope.TypeActivity = {
        options: [
          'All',
          'Filtros',
          'Molinos',
          'Otros',
        ],
        selected: 'All'
      };

      $scope.ActivityParent = {
        options: [
          'All',
        ],
        selected: 'All'
      };

      function start (){
        
          ValorGanadoService.getPathActivity().then(function(response){
                response.forEach(function(element) {
                  $scope.ActivityParent.options.push( element.WBSPath + " "+ element.WBSName)
                });      
            }); 

          $scope.loadData();
      }


    $scope.loadData = function (){
        ValorGanadoService.getEarnedValue().then(function(result){
          
                $scope.PV = ['Planed Value'];
                $scope.EV = ['Earned Value'];
                $scope.AC = ['Actual Cost'];
                $scope.timeSerie = ['x'];
                $scope.CPI = [];
                $scope.SPI = [];
                    
                result.forEach(function(element) {
                    $scope.PV.push(element.PV);
                    $scope.EV.push(element.EV);
                    $scope.AC.push(element.AC);
                    $scope.timeSerie.push(element.fecha);
                    $scope.CPI.push(element.CPI);
                    $scope.SPI.push(element.SPI);
                }); 

                $scope.chartEarnedValue.unload({
                  done: function() {
                      $scope.chartEarnedValue.load({
                        columns: [
                          $scope.timeSerie,
                          $scope.PV,
                          $scope.EV,
                          $scope.AC
                        ]                          
                    });
                  }
                });
            });
      }
     

    var dates = 
    [
      new Date(2016, 7, 8),
      new Date(2016, 7, 15),
      new Date(2016, 7, 22),
      new Date(2016, 7, 29),
      new Date(2016, 8, 5),
      new Date(2016, 8, 12),
      new Date(2016, 8, 19),
      new Date(2016, 8, 26),
      new Date(2016, 9, 3),
      new Date(2016, 9, 10),
      new Date(2016, 9, 17),
      new Date(2016, 9, 24),
      new Date(2016, 9, 31),
      new Date(2016, 10, 7),
      new Date(2016, 10, 14),
      new Date(2016, 10, 21),
      new Date(2016, 10, 28),
      new Date(2016, 11, 5),
      new Date(2016, 11, 12),
      new Date(2016, 11, 19),
      new Date(2016, 11, 26),
      new Date(2017, 0, 2),
      new Date(2017, 0, 9),
      new Date(2017, 0, 16),
      new Date(2017, 0, 23),
      new Date(2017, 0, 30)
    ]

    $scope.slider = {
    minValue: dates[0],
    maxValue: dates[25], 
    options: {
      stepsArray: dates,
      translate: function(date) {
        if (date != null)
          return date.toDateString();
        return '';
      }
    }
  };


    $scope.chartEarnedValue = c3.generate({
            bindto: '#chart-Valor-Ganado',
            size: {
                height: 240
            },  
            data: {
            x: 'x',
            columns: [
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
                        format: '%Y-%m-%d',
                        rotate: 60
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
                      table +=  "<table class=\"c3-tooltip\"><tbody><tr><th colspan=\"3\">"+"Valor Ganado"+"</th></tr><tr class=\"c3-tooltip-name--day\"><td class=\"name\"><span style=\"background-color:#4683C8\"></span>"+"PV"+"</td><td class=\"value\">"+$scope.PV[d[0].index+1]+"</td></tr><tr class=\"c3-tooltip-name--day\"><td class=\"name\"><span style=\"background-color:#EC8A3A\"></span>"+"EV"+"</td><td class=\"value\">"+$scope.EV[d[0].index+1]+"</td></tr><tr class=\"c3-tooltip-name--day\"><td class=\"name\"><span style=\"background-color:#7F7F7F\"></span>"+"AC"+"</td><td class=\"value\">"+$scope.AC[d[0].index+1]+"</td></tr><tr class=\"c3-tooltip-name--day\"><td class=\"name\">"+"SPI"+"</td><td class=\"value\">"+$scope.SPI[d[0].index+1]+"</td></tr><tr class=\"c3-tooltip-name--day\"><td class=\"name\">"+"CPI"+"</td><td class=\"value\">"+$scope.CPI[d[0].index+1]+"</td></tr></tbody></table>";
                      table += "</div>";
                      return table; 
                    }
           }
        });
      

      $scope.chartDesviation  = c3.generate({
            bindto: '#chart-Valor-Top',
            size: {
                height: 240
            },  
            data: {
              x: 'Actividades',
              type: 'bar',
              columns: [
                  ['Actividades', 'Actividad1', 'Actividad2', 'Actividad3'],
                  ['Desviations',30, 70, 45],
              ],
              colors : {
                'Actividades': '#8a89a6'
              },
            },
            axis: {
                  x: {
                      type: 'category', 
                      tick: {
                          outer: false
                      }
                  },
                  y: {
                      tick: {
                          outer: false
                      }
                  }
            },
            bar: {
              width: {  
                  ratio: 0.8
              }
           }
        });  

        start();

  });
