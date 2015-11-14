'use strict';

angular.module('hackathonApp')
  .controller('BookdetailCtrl', function ($scope, $http, $stateParams) {
  	$http.get('/api/booksearch/specific/' + $stateParams.bookId).success(function(bookDetail) {
		$scope.bookDetail = bookDetail;
		console.log($scope.bookDetail);
	});
  });
