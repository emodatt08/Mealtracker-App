var app = angular.module('mealtrack.services.authentication', []);

app.service('AuthService', function ($q, $ionicPopup, $ionicLoading) {
	var self = {
		user: Parse.User.current(),
		login: function (email, password) {
			var d = $q.defer();
            Parse.User.logIn(email, password, {

				success: function(user){
					console.log("Login Successfully");
					self.user = user;
					d.resolve(self.user);

				},
				error: function(error){
					$ionicLoading.hide();
					$ionicPopup.alert({

						title:'Login Error',
						subTitle: error.message

					});
					d.reject(error);
				}

			});
			//TODO

			return d.promise;
		},
		signup: function (email, name, password) {
			//console.log(name, email, password);
			var d = $q.defer();
			var user = new Parse.User();
			user.set('username', email);
			user.set('name', name);
			user.set('password', password);
			user.set('email', email);
			user.signUp(null, {
			success: function(user){
				console.log("Account created");
				self.user = user;
				d.resolve(self.user);

			},
				error: function(user, error){
					console.log(error.message);
					$ionicPopup.alert({

					title:'Signup Error',
					subTitle: error.message

});
					d.reject(error);
				}

			});
			//TODO

			return d.promise;
		},
		'update': function (data)  {
			var d = $q.defer();

			//TODO
                        var user = self.user;
                        user.set("username", data.email);
                        user.set("name", data.name);
                        user.set("email", data.email);
                        
                        user.save(null, {
			success: function(user){
				console.log("Account updated");
				self.user = user;
				d.resolve(self.user);

			},
				error: function(user, error){
					console.log(error.message);
				$ionicPopup.alert({

					title:'Update Error',
					subTitle: error.message

			});
					d.reject(error);
                                        
                                }
                            });

			return d.promise;
		}

	};

	return self;
});

