// TODO: write test for this
angular.module('fileProcessApp')
	.component('textEdit', {
		templateUrl: 'views/text-edit.html',

		controller: 
			function TextEditController() {
				this.editType = 'move';
				this.operation = {};
				this.edits = [];
				this.string = '';

				this.addEdit = function() {
					if(!this.operation[this.editType]) {
						return false;
					}

					this.edits.push(this.operation);

					this.operation = {};
				}

				this.makeEdits = function() {
					let op = new BonusOperation(this.edits);

					this.string = op.apply(this.string);

					this.edits = [];
				}
			}
		});