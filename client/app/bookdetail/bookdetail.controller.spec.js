'use strict';

describe('Controller: BookdetailCtrl', function () {

  // load the controller's module
  beforeEach(module('hackathonApp'));

  var BookdetailCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookdetailCtrl = $controller('BookdetailCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
