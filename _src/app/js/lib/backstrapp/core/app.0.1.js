define([
	'backstrapp/utils/module-activator', 
	'backstrapp/utils/content-builder', 
	'backstrapp/collections/modules.collection'
],

function (Activator, Builder, ModulesCollection) {

	var App = {
		_exports: {
			debugMode: 		false,
			activatorMode: 	true,
			builderMode: 	true
		},
		modules: new ModulesCollection(),
		
		results: {
			/*
				- success: the module was found or loaded, and may now be rendered
					- this should simply fire the RenderReady event for the module,
					and allow the module to 'do it's thang'
			*/
			success: function (result) {
				console.log('result', result);
				result.module.init(result.request);
			},

			/*
				- error: the module either doesn't exist, or can't be validated
					- this should check for a debug mode,
					and try to print a friendly error message in the module's div
			*/
			error: function (result) {
				if (App.debugMode) {
					$(result.request.el).html(App.buildResponseMessage('error', result));
				}
			},

			/*
				- promise: something was wrong, I'm trying to fix it, when I know, I'll get back
					- this should check for a debug mode,
					and try to print a friendly loading message in the module's div
			*/
			promise: function (result) {
				console.log('promise', arguments);
			},
		},
		
		/* 
			* @method buildResponseMessage 
		*/
		buildResponseMessage: function (type, result) {
			var ret = [];
			ret.push(result[type]);
			ret.push('Module: ' + result.module);
			return ret.join("<hr/>");
		},
		
		moduleLoader: function (request) {
			App.modules.getModule(request, App.processModule);
		},
		
		processModule: function (result) {
			console.log('processModule', result);
			for (var i in App.results) {
				if (result[i]) {
					App.results[i].call(App, result);
				}
			}
		},

		activator: function (el, callback) {
			Activator.execute(el, callback);
		},

		builder: function (el, callback) {
			Builder.execute(el, callback);
		},
		
		start: function (el) {
			var ret = {success: 'APP STARTED!'};

			if (App._exports.activatorMode) {
				App.activator(el, App.moduleLoader);
			}
			
			if (App._exports.builderMode) {
				App.builder(el, App.start);
			}

			if (!App._exports.started) {
				App._exports.started = true;
				App._exports.starts = 1;
			} else {
				var restarts = App._exports.starts;
				App._exports.starts = restarts + 1;
				ret.success = 'APP RE-STARTED!';
			}
			ret.app = App._exports;
			return ret;
		}		
	}

	return App
})