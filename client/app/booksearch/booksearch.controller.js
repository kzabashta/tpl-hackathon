'use strict';

angular.module('hackathonApp')
  .controller('BooksearchCtrl', function ($scope, $http, $timeout, $mdDialog) {
    $scope.showBookDetails = function($event, bookId){
        $mdDialog.show({
          targetEvent: $event,
          template:
            '<md-dialog>' +
            '<md-toolbar>' +
              '<div class="md-toolbar-tools"><span flex></span>' +
                '<md-button class="md-icon-button" ng-click="closeDialog()">' +
                  '<md-icon md-svg-icon="content:clear" aria-label="Close dialog"></md-icon>' +
                '</md-button>' +
              '</div>' +
            '</md-toolbar>' +
            '  <md-content style="overflow: scroll;" class="book-detail"><div class="md-caption" ng-bind-html="bookDetail.description[0]"></div></md-content>' +
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
    // Assigned from construction <code>locals</code> options...
    $http.get('/api/booksearch/specific/' + bookId).success(function(bookDetail) {
      $scope.bookDetail = bookDetail;
      console.log(bookDetail);
    });
    $scope.closeDialog = function() {
      // Easily hides most recent dialog shown...
      // no specific instance reference is needed.
      $mdDialog.hide();
    };
  }