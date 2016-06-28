const glob = require('glob');
const path = require('path');

module.exports = {
  init: function(app) {
    glob("controller/*.js", function(er, files) {
    	console.log(files);
    	files.map(file => {
    		// var controller = require(path.join(__dirname, file));
    		var controller = require(path.join('..', file));
    		if(controller){
    			for(action in controller){
    				console.log(action);
    				const route = action.split(' ');
    				const ctrl = route[0].toLowerCase();
    				console.log(ctrl);
    				// const handler = controller[action];
    				// if(route){
    				// 	app[route[1].toLowerCase()]
    				// 	handler.call(controller, ...arguments)
    				// }
    			}
    		}
    	});
    });
  }
};



// const glob = require('glob');
// const path = require('path');

// module.exports = {
//   init: function(app) {
//     glob(controller, function(req, res) {
//     	files.map(file => {
//     		var controller = require(path.join(file));
//     		if(controller){
//     			for(action in controller){
//     				const route = app[route[1].toLowerCase()](controller(action))
//     				const handler = controller[action];
//     				if(route){
//     					handler.call(controller, ...arguments)
//     				}
//     			}
//     		}
//     	})
//     })
//   }
// };

