'use strict';

angular.module('hackathonApp')
  .controller('BooksearchCtrl', function ($scope, $http, $timeout, $mdDialog) {
    $scope.showBookDetails = function($event, bookId){
        $mdDialog.show({
          targetEvent: $event,
          template:
            '<md-dialog>' +
            '  <md-content style="overflow: scroll;" class="book-detail">'+
            '<div class="md-title" layout="row" layout-align="center center">{{bookDetail.title[0]}}</div>' +
            '<img ng-src="{{bookDetail.image_url[0]}}" class="md-avatar"/>' +
            '  <div class="md-body-2">Author</div>' +
            '<div class="md-caption" ng-bind-html="bookDetail.authors[0].author[0].name[0]"></div>' +
            '  <div class="md-body-2">Description</div>' +
            '  <div class="md-caption" ng-bind-html="bookDetail.description[0]"></div>' +
            '  <div class="md-body-2">Similar Books</div>' +
            '<md-list class="fixedRows">' +
                '<md-list-item class="md-2-line contact-item selected" ng-repeat="book in bookDetail.similar_books[0].book" ng-click="showBookDetails($event, book.id[0])">' +
                  '<img ng-src="{{book.image_url[0]}}" class="md-avatar"/>' +
                  '<div class="md-list-item-text compact">' +
                    '<p class="small-book-title">{{book.title[0]}}</p>' +
                    '<p class="small-book-title">{{book.authors[0].author[0].name[0]}}</p>' +
                    '<p class="small-book-title">{{book.average_rating[0]}}/5 ({{book.ratings_count[0]._}} reviews)</p>' +
                  '</div>' +
                '</md-list-item>' +
            '</md-list>' +
            '</md-content>' +
            '  <div class="md-actions">' +
            '    <md-button ng-click="closeDialog()">' +
            '      Hold' +
            '    </md-button>' +
            '    <md-button ng-click="closeDialog()">' +
            '      Close' +
            '    </md-button>' +
            '  </div>' +
            '</md-dialog>',
          controller: GreetingController,
          clickOutsideToClose: true,
          locals: { bookId: bookId }
        });
    }

  	var timeoutPromise;
    var delayInMs = 500;
    $scope.$watch('query', function() {
      $timeout.cancel(timeoutPromise);
      timeoutPromise = $timeout(function(){
	      if($scope.query){
		      $http.get('/api/booksearch/' + $scope.query).success(function(books) {
		        $scope.books = books;
            console.log(books);
		      });
	      }
	   }, delayInMs);
    });
  });
  function GreetingController($scope, $http, $mdDialog, bookId) {
    $http.get('/api/booksearch/specific/' + bookId).success(function(bookDetail) {
      $scope.bookDetail = bookDetail;
      console.log(bookDetail);
    });
    $scope.closeDialog = function() {
      $mdDialog.hide();
    };
  }