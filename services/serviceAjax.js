angular.module('App')
  .factory('serviceAjax', function serviceAjax($http, config, $httpParamSerializerJQLike) {
    return{
        load_evenements: function(cr){
		  console.log ("cr = "+JSON.stringify(cr));
		  return $http({
          method  : 'POST',
          url     : config.url_API+"evenements/liste",
          data    : $httpParamSerializerJQLike({cr: cr}),
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         });
        },
		load_evenement_detail: function(evenement_id){
		  return $http({
          method  : 'POST',
          url     : config.url_API+"evenements/lire/"+evenement_id,
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         });
        },
		load_categories: function(){
		  return $http({
          method  : 'POST',
          url     : config.url_API+"categories/liste",
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         });
        }
    }
  });