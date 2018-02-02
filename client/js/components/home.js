'use strict';

angular.module('fileProcessApp')
	.component('homeComponent', {
		templateUrl: 'views/home.html',

		controller: [ 'filesService',
			function HomeController(filesService) {
				this.files = [];
				this.date  = Date.now();

				this.createFilesRequest = function(type) {
					filesService.create({
						fileName: Date.now()+type
					}).then((res) => {
						console.log('Request sent');
					});
				};
			}]
	});