var app = angular.module('mealtrack.controllers.authentication', []);

/*********************************************************************
 * LoginCtrl
 *********************************************************************/
app.controller('LoginCtrl', function ($scope, $ionicPopup, $ionicLoading, $state, AuthService) {

	$scope.formData = {
		"email": "",
		"password": ""
	};

	$scope.login = function (loginForm) {

		if(loginForm.$valid){
                    $ionicLoading.show();
			AuthService.login($scope.formData.email, $scope.formData.password).then(function(){
                            $ionicLoading.hide();
				$state.go('tab.meals')
			});




		} else {

			console.log("Invalid Form");
			 $ionicPopup.alert({
				title: 'Invalid form',
				template: 'Your email and password is empty'
			});

			
		}





	};

});

/*********************************************************************
 * SignupCtrl
 *********************************************************************/
app.controller('SignupCtrl', function ($scope, $state, AuthService, $ionicPopup) {

	$scope.formData = {
		"name": "",
		"email": "",
		"password": ""
	};

	$scope.signup = function (signupForm) {

		if(signupForm.$valid){
			console.log("SignupCtrl::signup");
			AuthService.signup($scope.formData.email, $scope.formData.name, $scope.formData.password).then(function(){
				$state.go('login')
			});

		}else{
			var confirmPopup = $ionicPopup.confirm({

				title: 'Error',

				template: 'You must feel all available text boxes!',

			});

		}
		//TODO
	};

});