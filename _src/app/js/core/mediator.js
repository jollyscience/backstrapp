/*
	Backstrapp Mediator.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is the application core. It's private, and should drive the application-wide functionality.

	TODO: refactor the Mediator object with pub/priv in mind. THINK TDD!!!
*/

define(['jsonLoad!json/config.json', 'jquery', 'util', 'template'], function (config, $, _, template) {


	var _private = {
		util: _,

		modules: {},
		channels: {},

		subscribeMode: true,
		publishMode: true,

		config: function () {
			return config || {};
		},

		getConfigObj: function (obj, key, val, callback) {
			var ret = false, haystack = _private.config[obj];
			_.each(haystack, function (i) {
				if (i[key] == val) {
					ret = i;
				}
			});
			callback(ret);
		},

		// TODO: Maybe this is where I can catch errors?
		// if all modules use facade.require, then all errors will be caught in the same place...?
		require: function (source, callback, plugin) {
			var p = '';
			if (plugin) { p = plugin + '!' }
			require([p + source], callback);
		},
		
		restoreModule: function (request, callback) {
			console.log('--- Returning ' + request.name + ' Instance', _private.modules[request.name]);
			if (typeof _private.modules[request.name].restore == 'function') {
				_private.modules[request.name].restore(request);
			} else {
				_private.modules[request.name].init(request);
			}
			if (typeof callback == 'function') {
				callback(_private.modules[request.name]);
			}
		},
	
		loadModule: function (request, callback) {
			console.log('--- Loading New ' + request.name, _private.modules);
			var mod = require([request.mod], function (m) {
				_private.modules[request.name] = m;
				_private.modules[request.name].init(request);
				if (typeof callback == 'function') {
					callback(_private.modules[request.name]);
				}
			})
		}
	};

	var Mediator = {
		subscribe: function (channel, callback, context) {
			/* console.log('Mediator.subscribe', channel, context); */
	        _private.channels[channel] = (!_private.channels[channel]) ? [] : _private.channels[channel];
	        _private.channels[channel].push(this.util.method(callback, context));
		},

		publish: function (channel) {
			/*	console.log('Mediator.publish', arguments); */
			if (!_private.channels[channel]) return;
			var args = [].slice.call(arguments, 1);
			for (var i = 0, l = _private.channels[channel].length; i < l; i++) {
				_private.channels[channel][i].apply(this, args);
			}
		},

		/* TODO: maybe this should just be a facade method to the module factory? */
		getModule: function (request, callback) {
			if (_private.modules[request.name]) {
				_private.restoreModule(request, callback);
			} else {
				_private.loadModule(request, callback);
			}
		},

		processTemplate: template.process,

		get: function (str) {
			return (_private[str] != undefined) ? _private[str] : false;
		},

		set: function (obj) {
			_private.util.extend(_private, obj);
			return obj;
		}
	}

	return Mediator;

});