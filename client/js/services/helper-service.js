'use strict';

angular.module('fileProcessApp')
	.service('helperService',['$http',
		function ($http) {
			var service = {};

			service.api_url = 'http://localhost:9000';

			return service;
		}
	]);