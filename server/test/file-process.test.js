var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('controllers : files-process', () => {
	var files = [
		'pdf #1', 
		'pdf #2', 
		'html #3', 
		'html #4', 
		'html #5', 
		'html #6',
		'html #7',
		'html #8',
		'pdf #9',
		'html #10'
	];


	after(function (done) {
		console.log('file process ended');
		this.timeout(0);
		// Not calling done function to see the results of tests in console
	});

	describe('file process', function() {
		// Disableing timeout to see all results
		beforeEach(function () {
 			this.timeout(0);
 		})

		// Sending files asynchronomusely
		for(let ind in files) {
			it('Sending all files', function(done) {
					chai.request(app)
						.post('/api/files-process')
						.send({
							fileName: files[ind]
						})
						.end(function (err, res) {
							expect(err).to.be.null;
							expect(res).to.have.status(200);

							done();
						});			
			});
		}
	});

});
