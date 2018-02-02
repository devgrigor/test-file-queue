'use strict';

// Global vars that will be for 
let queue = [];
let currentQueue = [];
let timeOut;

function putFileInQueue(fileType) {
	//console.log('Putting file in queue', fileType);
	// Considering there are only two types of files there will be checker for pdf only
	if(fileType.indexOf('pdf') === -1) {
		queue.push({
			fileType: fileType,
			processTime: 1
		});
	} else {
		queue.push({
			fileType: fileType,
			processTime: 5
		});
	}
	if(!timeOut) {
		// First one in queu that is only one in queue should start processing immediately
		currentQueue = queue.splice(0,1);
		startWorker();
	}
}

// Sorting queue correctly
function resortQueue() {
	if(currentQueue.length) {
		return ;
	}

	// Puts up to 5 htmls before current pdf
	let count = 5;

	for(let ind = 0; ind < queue.length; ind++) {
		let item = queue[ind];

		if( item.fileType.indexOf('html') !== -1 ) {
			
			currentQueue.push(queue.splice(ind--, 1)[0]);
			
			if(--count == 0) {
				break;
			}
		}
	}

	currentQueue.push(queue.splice(0, 1)[0]);
}

// Start worker 
function startWorker() {
	resortQueue();

	const obj = currentQueue.shift();
	// Sometimes obj can be undefigned because of array shift
	if(!obj) {
		timeOut = null;
		return;
	}

	timeOut = setTimeout(() => {
		console.log(obj.fileType);
		
		if(!currentQueue.length && !queue.length) {
			timeOut = null;
			return ;
		}	
				
		startWorker();
	}, obj.processTime*1000);

}


/**
 * @api {post} /files-process Post files for process with queue
 * @apiName postFiles
 * @apiGroup Enum
 *
 *
 * @apiPermission any
 */
export function create(req, res) {
	// TODO: implement putting files in queue correctly 
	putFileInQueue(req.body.fileName);
	res.status(200).json({});
}