'use strict';

angular.module('hackathonApp')
  .controller('BooksearchCtrl', function ($scope, $http, $timeout) {
  	var timeoutPromise;
    var delayInMs = 500;
    $scope.$watch('query', function() {
      $timeout.cancel(timeoutPromise);
      timeoutPromise = $timeout(function(){
	      if($scope.query){
		      $http.get('/api/booksearch/' + $scope.query).success(function(books) {
		        $scope.books = books;
		        console.log($scope.books);
		      });
	      }
	   }, delayInMs);
    });
  });
