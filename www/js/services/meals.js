var app = angular.module('mealtrack.services.meals', []);

app.service("MealService", function ($q, AuthService, $ionicPopup) {
	var self = {
		'page': 0,
		'page_size': 20,
		'isLoading': false,
		'isSaving': false,
		'hasMore': true,
		'results': [],
		'refresh': function () {
			self.page = 0;
			self.isLoading = false;
			self.isSaving = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var d = $q.defer();

			//TODO
                        //Initialize Query
                        var Meal = Parse.Object.extend("Meal");
                        var mealQuery = new Parse.Query(Meal);
                        //Query meal set in descending order using the field created
                        mealQuery.descending('created');
                        //Query meal set according to the user Authservice.user can also be used here
                        mealQuery.equalTo("owner", AuthService.user);
                        
                        //Paginate
                        mealQuery.skip(self.page * self.page_size);
                        mealQuery.limit(self.page_size); // 20 at a time
                        
                        //Perform the query
                        mealQuery.find({
                            // on success store the query results in results array
                            success: function (results){
                                   
                                //for each results store in results array
                               angular.forEach(results, function (item){
                                   
                                 //var meal = new Meal(item);
                                 console.log("item");
                                 //push to results array
                                 self.results.push(item)
                               });
                               console.debug(self.results);
                               
                               
                               //Are we at the end of the list?
                               if(results.length == 0){
                                   self.hasMore = false;
                               }
                               //Finished
                               d.resolve();
                            }
                            
                            
                        });
                        
			return d.promise;
		},
		'track': function (data) {

			self.isSaving = true;
			var d = $q.defer();
			//create a table in parse
			var Meal = Parse.Object.extend("Meal");
			//get current user
			var user = AuthService.user;
			//get picture of the food
			var file = data.picture ? new Parse.File("photo.jpg", {base64: data.picture }): null;
			// initiate a meal instance
			var meal = new Meal();
			

			//set current user as owner on parse
			meal.set("owner", user);
			//set file as picture parameter; on parse
			meal.set("picture", file);
			meal.set("title", data.title);
			meal.set("category", data.category);
			meal.set("calories",parseInt(data.calories));
			meal.set("created", new Date());

			meal.save(null,{
			success: function(meal){
				console.log("Meal Tracked");
				self.results.unshift(meal);
				d.resolve(meal);

			},
		    error: function(item, error){
				$ionicPopup.alert({
					title: 'Error Saving Meal',
					template: error.message
				});
			}


			});
			//TODO

			return d.promise;
		}

	};

	return self;
});