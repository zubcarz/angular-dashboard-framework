'use strict';

angular.module('adf.widget.Visual_HorasHombre', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('Visual_HorasHombre', {
        title: 'Visual_HorasHombre',
        description: 'Horas hombre de la tarea planeada ',
        templateUrl: '{widgetsPath}/Visual_HorasHombre/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/Visual_HorasHombre/src/edit.html'
        }
      });
  });
