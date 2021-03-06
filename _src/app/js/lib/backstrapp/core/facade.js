/* 
	Backstrapp Facade.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is your sandbox. All modules will know about this module, so keep it clean, and secure.
*/

define(function () {

	var Facade = {
		mediator: {},
		permissions: {},
		subscribeMode: true,
		publishMode: true,

		subscribe: function(subscriber, channel, callback, context){
			if (!Facade.subscribeMode) { return {error: 'Subscribe Mode is off'} };
			if(this.permissions.validate('subscribe', subscriber, channel)){
				var sub = this.mediator.subscribe( channel, callback );
				sub.s = subscriber;
				return sub;
			} else {
				return {error: 'Permission Failed', s: subscriber, ch: channel};
			}
		},
	
		publish: function(subscriber, channel, params){
			if (!Facade.publishMode) { return {error: 'Publish Mode is Off!'} };
			if(this.permissions.validate('publish', subscriber, channel)){
				var pub = this.mediator.publish(channel, params);
				pub.s = subscriber;
				return pub;
			} else {
				return {error: 'Permission Failed', s: subscriber, ch: channel};
			}
		},

		get: function (str) {
			return this.mediator.get(str);
		},

		set: function (obj) {
			return this.mediator.set(obj);
		}
	};

	/*
		SINGLETON (so all instances in a build can be the same facade.)
		require the mediator and permissions to be passed in, 
		so backstrapp main can control the version of each,
		and users can replace with their own.
	*/
	var instance = {};
	return function (m, p) {
		if (!instance.loaded) {
			console.log('loading new facade instance!');
			if (m == undefined || p == undefined) {
				instance = {error: 'Missing Mediator / Permissions objects'};
			} else {
				Facade.mediator = m;
				Facade.permissions = p;
				instance = Facade;
				instance.loaded = true;
			}
		} else {
			console.log('returning old facade instance');
		}
		return instance;
	};

});