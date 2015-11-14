'use strict';

describe('Controller: BooksearchCtrl', function () {

  // load the controller's module
  beforeEach(module('hackathonApp'));

  var BooksearchCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BooksearchCtrl = $controller('BooksearchCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
