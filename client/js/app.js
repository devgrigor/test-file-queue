'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
	.module('fileProcessApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ui.bootstrap',
		'ui.router',
		'ui'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				template: '<home-component></home-component>',
			})
			.otherwise({
				redirectTo: '/'
			});
	});
