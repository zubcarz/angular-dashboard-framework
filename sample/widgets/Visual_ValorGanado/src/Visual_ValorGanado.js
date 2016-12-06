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
      }   };
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

      

      ValorGanadoService.getPathActivity().then(function(response){
          response.forEach(function(element) {
            console.log('asd');
            $scope.ActivityParent.options.push( element.WBSPath + " "+ element.WBSName)
          });      
      }); 

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

      $scope.chart = c3.generate({
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

  });
