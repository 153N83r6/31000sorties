angular.module('App')
  .controller('HomeCtrl', function ($scope, serviceAjax, cr, config, $location) {
	        cr.nom = "";
	        $scope.formData = {};
			$scope.recherche_simple = function() {
			cr.nom = $scope.formData.nom;
			$location.path('/evenements');
			}
		
		
			$scope.loading = true;
			$scope.url_site = config.url;
            serviceAjax.load_evenements(cr).success(function(data){
                $scope.evenements = data;
				$scope.loading = false;
            });
  });
  
angular.module('App')
  .controller('EvenementsCtrl', function ($scope, serviceAjax, cr, config) {
	    $scope.loading = true;
		$scope.url_site = config.url;
		$scope.formData = {};
		$scope.evenements = {};
		
        serviceAjax.load_evenements(cr).success(function(data){
                $scope.evenements = data;
				cr.start = $scope.evenements.length;
				$scope.loading = false;
		});
		
		serviceAjax.load_categories(cr).success(function(data){
                $scope.categories = data;
		});
		
		$scope.recherche_avancee = function() {
			cr.start=0;
			cr.nom = $scope.formData.nom;
			cr.categorie = $scope.formData.categorie;
			cr.quand = $scope.formData.quand;
			cr.gratuit = $scope.formData.gratuit;
			$scope.evenements = {};
			serviceAjax.load_evenements(cr).success(function(data){
                $scope.evenements = data;
				cr.start = $scope.evenements.length;
				$scope.loading = false;
			});
		}
		
		$scope.loadMore = function() {
		console.log("recherche en cours");
		$scope.loading = true;
        serviceAjax.load_evenements(cr).success(function(data){
			$scope.evenements = $scope.evenements.concat(data);
			cr.start = $scope.evenements.length;
			$scope.loading = false;
            });
		}
  });
  
angular.module('App')
  .controller('EvenementDetailCtrl', function ($scope, serviceAjax, $routeParams) {    
        serviceAjax.load_evenement_detail($routeParams.evenementId).success(function(data){
                $scope.evenement_detail = data;
		});
  });

angular.module('App')
.run(function($rootScope, $route, cr) {
    $rootScope.$on("$routeChangeSuccess", 
                 function (event, current, previous, rejection) {
                 	if (typeof previous !== 'undefined') {
                 		if(previous.$$route.controller == "EvenementsCtrl")
                 			cr.start = 0;
				}
    
})
});