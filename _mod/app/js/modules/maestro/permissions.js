define([], function () {

	// Permissions

	// A permissions structure can check
	// against subscriptions prior to allowing
	// them to clear. This enforces a light 
	// security layer for your application.

	var permissions = {

		renderDone:{
			home:true,
			about:true,
			nav:true
		},

		renderMessageModule:{
			messageModule:true
		}
	};

	permissions.validate = function(subscriber, channel){
		console.log('checking', subscriber, channel);
		var test = permissions[channel][subscriber];
		return test===undefined? false: test;
	};

	return permissions;

});