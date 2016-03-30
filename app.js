var App = angular.module('App', ['ngRoute', 'ui.bootstrap']);

App.constant("config", {
        url_API : "http://31000sorties.fr/api/",
		url : "http://localhost/31000sorties"
		
    });
	
App.value("cr", {
    nom : "",
	start : 0,
	nb : 12,
	categorie : "",
	quand : 0,
	gratuit : false,
	from_recherche_simple : 0
});
	
App.config(['$routeProvider', '$locationProvider', '$httpProvider',
  function($routeProvider, $locationProvider,$httpProvider) {
    $routeProvider.
	when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }).
      when('/evenements', {
        templateUrl: 'views/evenements.html',
        controller: 'EvenementsCtrl'
      }).
	  when('/evenements/detail/:evenementId', {
        templateUrl: 'views/evenement-detail.html',
        controller: 'EvenementDetailCtrl'
      }).
      when('/contact', {
        templateUrl: 'contact.html',
        controller: 'ContactCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
	  
	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
});

  }]);
  
  
