'use strict';

angular.module('hackathonApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('booksearch', {
        url: '/booksearch',
        templateUrl: 'app/booksearch/booksearch.html',
        controller: 'BooksearchCtrl'
      });
  });