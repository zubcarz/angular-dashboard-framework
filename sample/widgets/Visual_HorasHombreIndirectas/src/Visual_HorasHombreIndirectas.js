'use strict';

angular.module('adf.widget.Visual_HorasHombreIndirectas', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('Visual_HorasHombreIndirectas', {
        title: 'Horas Hombre Indirectas',
        description: 'Horas hombre de la tarea planteada que genera Horas indirectas',
        templateUrl: '{widgetsPath}/Visual_HorasHombreIndirectas/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/Visual_HorasHombreIndirectas/src/edit.html'
        }
      });
  });
