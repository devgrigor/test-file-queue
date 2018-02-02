'use strict';

angular.module('fileProcessApp')
	.service('filesService',['$http', 'helperService',
		function ($http, helperService) {
			var service = {};

			service.create = function(data) {
				return $http.post(helperService.api_url + '/api/files-process', data);
			};

			return service;
		}]);