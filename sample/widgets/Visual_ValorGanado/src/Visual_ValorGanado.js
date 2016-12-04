'use strict';

angular.module('adf.widget.Visual_ValorGanado', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('Visual_ValorGanado', {
        title: 'Visual_ValorGanado',
        description: 'Valor ganado por cada agrupacion ',
        templateUrl: '{widgetsPath}/Visual_ValorGanado/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/Visual_ValorGanado/src/edit.html'
        }
      });
  });
