'use strict';

angular.module('adf.widget.VISUAL_ValorGanadoDiscriminado', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('VISUAL_ValorGanadoDiscriminado', {
        title: 'Valor ganado Discriminado',
        description: 'valor ganado por tarea para cada grupo ',
        templateUrl: '{widgetsPath}/VISUAL_ValorGanadoDiscriminado/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/VISUAL_ValorGanadoDiscriminado/src/edit.html'
        }
      });
  });
