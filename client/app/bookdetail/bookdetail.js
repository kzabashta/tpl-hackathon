'use strict';

angular.module('hackathonApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bookdetail', {
        url: '/bookdetail/:bookId',
        templateUrl: 'app/bookdetail/bookdetail.html',
        controller: 'BookdetailCtrl'
      });
  });