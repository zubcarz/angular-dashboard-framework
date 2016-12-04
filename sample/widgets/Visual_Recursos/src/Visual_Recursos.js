'use strict';

angular.module('adf.widget.Visual_Recursos', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('Visual_Recursos', {
        title: 'Visual_Recursos',
        description: 'Recursos de cada tarea',
        templateUrl: '{widgetsPath}/Visual_Recursos/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/Visual_Recursos/src/edit.html'
        }
      });
  });
