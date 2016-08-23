var passwordcheckerApp = angular.module('passwordcheckerApp', []);

passwordcheckerApp.factory('dataFactory', ['$http', function($http) {
  var urlBase = 'https://password-checker-evandro.herokuapp.com/passwordchecker/v1/check';
  var dataFactory = {};

  dataFactory.checkPassword = function (password) {

    return $http({
      url: urlBase,
      dataType: 'text',
      method: 'POST',
      data: password,
      headers: {
          "Content-Type": "text/plain"
      }
    });
  }

  return dataFactory;

}]);

passwordcheckerApp.controller('PasswordCheckerController', ['$scope', 'dataFactory',
  function ($scope, dataFactory) {

  $scope.password;
  $scope.passwordStrength;
  $scope.inputType = 'password';
  $scope.labelType;
  $scope.hide = true;

  $scope.showOrHidePassword = function () {
    if ($scope.hide) {
      $scope.inputType = 'password';
    } else {
      $scope.inputType = 'text';
    }
  }

  $scope.checkPassword = function () {

    if ($scope.password && $scope.password.length >= 2) {
      dataFactory.checkPassword($scope.password)
        .then(function (response) {
          setPasswordStrength(response.data);
        }, function (error) {
          console.log('Error occurred');
        });
    } else {
      $scope.passwordStrength = null;
    }

  };

  var setPasswordStrength = function (passwordStrength) {
    $scope.passwordStrength = passwordStrength;

    switch (passwordStrength.complexity) {
      case 'Very Weak':
        $scope.labelType = 'label-danger';
        break;
      case 'Weak':
        $scope.labelType = 'label-warning';
        break;
      case 'Good':
        $scope.labelType = 'label-info';
        break;
      case 'Strong':
        $scope.labelType = 'label-success';
        break;
      default:
        $scope.labelType = 'label-primary';
    }

  }

}]);
