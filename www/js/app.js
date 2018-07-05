var app = angular.module('mealtrack', [
	'ionic',
	'ngMessages',
	
	'ngCordova',
	'ngAnimate',
	'parse-angular',
	'angularMoment',
	'mealtrack.controllers.authentication',
	'mealtrack.controllers.meals',
	'mealtrack.controllers.account',
	'mealtrack.services.authentication',
	'mealtrack.services.meals',
	'mealtrack.filters.mealtime'
]);

app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleBlackTranslucent();
		}
	});

		//Initialise Parse
		//console.log(new Parse());
		
		Parse.initialize("eiXG11S0yK94bF9v7vYyjfGcZLGdNDUKGQ4YdOpt" , "dvzFsQjZ8HoH9ZJnmflOu9kBGvIOzUmQc4JHgoPz");
        Parse.serverURL = 'https://parseapi.back4app.com/';

		
});

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('login', {
			url: "/login",
			cache: false,
			controller: 'LoginCtrl',
			templateUrl: "templates/login.html"
		})
		.state('signup', {
			url: "/signup",
			cache: false,
			controller: 'SignupCtrl',
			templateUrl: "templates/signup.html"
		})
		.state('tab', {
			url: "/tab",
			abstract: true,
			templateUrl: "templates/tabs.html"
		})
		.state('tab.meals', {
			url: "/meals",
			views: {
			'tab-meals':{
				templateUrl: 'templates/tabs/tab-meals.html',
				controller: "MealListCtrl"

			}
			}

		})
		.state('tab.track', {
			url: "/track",
			views: {
				'tab-track':{
					templateUrl: 'templates/tabs/tab-track.html',
					controller: "MealCreateCtrl"

				}
			}

		})

		.state('tab.account', {
			url: "/account",
			views: {
				'tab-account':{
					templateUrl: 'templates/tabs/tab-account.html',
					controller: "AccountCtrl"

				}
			}

		})
	;

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');

});
