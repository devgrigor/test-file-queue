function BonusOperation(data) {
	this.edits = data ? data : [];
}

BonusOperation.prototype.compose = function(operation) {
	if(!operation.edits) {
		return ;
	}

	this.edits = this.edits.concat(operation.edits);
};


BonusOperation.prototype.apply = function(string) {
	let caret = 0;
	let res = string;

	for(let i in this.edits) {
		console.log(this.edits[i]);
		switch(true) {
			case !!this.edits[i].move:

				caret += parseInt(this.edits[i].move);
				break;

			case !!this.edits[i].insert:

				res = [res.slice(0, caret), this.edits[i].insert, res.slice(caret)].join('');
				break;

			case !!this.edits[i].delete:
				
				res = res.slice(0, caret) + res.slice(caret + parseInt(this.edits[i].delete));
				break;
		}
	}
	
	return res;
};

BonusOperation.compose = function(op1, op2 ) {
	return new BonusOperation(op1.edits.concat(op2.edits));
}

var a = new BonusOperation([{ move: 1 }, { insert: 'foo' }])
var b = new BonusOperation([{ move: 6 }, { insert: 'bar' }])
a.compose(b);

console.log(BonusOperation.compose(a,b));

console.log(a);