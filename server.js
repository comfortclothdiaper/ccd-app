var app = angular.module('myApp', [])
	.controller('myctrl', function ($scope, $http) {
		$scope.toastMessage = "";
		$scope.submit = function () {
			var saveDetail = {
				'name': $scope.name,
				'email': $scope.email,
				'contactNum': $scope.contactNumber,
				'message': $scope.message
			};
			$http.post("https://ccd190415.herokuapp.com/api/saveRetailerDetails", saveDetail).success(function (response) {
				if (response.status === 201) {
					$scope.toastMessage = "Details successfully saved,We will get back to you soon.";
					angular.element('#successMsg').stop().slideDown(1000).delay(1500).fadeOut(1000);
					contactForm.reset();
					$scope.contactForm.$pristine = true;
					$scope.contactForm.$submitted = false;
				}
			});
		};
	});

