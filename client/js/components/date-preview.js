'use strict';

// TODO: write test for this
angular.module('fileProcessApp')
	.component('datePreview', {
		templateUrl: 'views/date-preview.html',
		bindings: {
		  ngModel: '='
		},

		controller: [ 'filesService',
			function DatePreviewController(filesService) {
				this.months = [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sept",
					"Oct",
					"Nov",
					"Dec"
				];

				// Tracking all changes on ng-model
				this.$doCheck = function(obj) {
					this.ngModel = parseInt(this.ngModel);

					if(this.date == new Date(this.ngModel)) {
						return;
					};

					this.date = new Date(this.ngModel);
					this.initDate(this.date);
				}

				// Putting correct days in selector for month
				this.initDays = function (month, year) {
					// Months starting from 0  but should start from 1
					let daysCount = new Date(year, month + 1, 0).getDate();
					let i = 0;
					this.days = [];

					while(i < daysCount) {
						this.days.push(++i);
					}

					// This prevents user to select 31th of Feburary
					if(this.day > i) {
						this.day = i;
					}
				}

				// Changing the date
				this.updateDate = function() {
					let month = this.months.indexOf(this.month);
					let year  = this.year; 
					
					if(this.year < 1970 || this.year > 3000) {
						year = 1970;
					}
					this.initDays(month, year);

					let date = new Date(year, month, this.day);

					this.ngModel = date.getTime();
				}

				// Initialising the information based on ng-model
				this.initDate = function (date) {
					this.month = this.months[date.getMonth()];
					this.year  = date.getFullYear();
					this.initDays(date.getMonth(), this.year);
					this.day  = date.getDate();
				}
				
				// Init function when ngModel is available for controller
				this.$onInit = function() {
					
				}
			}]
	});