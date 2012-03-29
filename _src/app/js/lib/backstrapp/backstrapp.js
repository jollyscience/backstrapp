/*
	Backstrapp
	to allow for easy assembly of the best versions of each class or module we write,
	this file is run the compiler as well, so that Backstrapp can load with a single file.
*/

define([
	'core/facade',
	'core/mediator',
	'core/permissions',
	'core/handler.error',
	'core/debug.0.1',
	'core/router',
	'utils/content-builder',
	'utils/module-activator',
	'util',
	'modules/template.0.1',
	'modules/module.factory.0.1',
	'models/module.model.0.1',
	'core/app.0.1'
], 

function (
 _facade, _mediator, _permissions, _error, _debug, _router, _builder, _activator, _util, _template, _moduleFactory, _moduleModel, _app
) {

	var Backstrapp = {
		Util: _util,
		Module: _moduleFactory,
		ModuleModel: _moduleModel,
		Mediator: _mediator,
		Error: _error,
		Debug: _debug,
		Router: _router,
		Template: _template,

		Facade: function (m, p) {
			m = (!m) ? new Backstrapp.Mediator() : m;
			p = (!p) ? new Backstrapp.Permissions() : p;
			return _facade(m, p);
		},

		Permissions: function (rules) {
			if (rules != undefined) {
				util.extend(_permissions.rules, rules);
			}
			return _permissions;
		},

		Builder: function (el) {
			_builder.execute(el);
		},
		
		Activator: function (el, callback) {
			_activator.execute(el, callback);
		},

		App: function (config) {
			var a = _app;
			if (config != undefined) {
				_util.extend(a._exports, config);
			}
			return {
				get: function (str) {
					return a._exports[str];
				},
				set: function (obj) {
					return _util.extend(a._exports, obj);
				},
				start: function () {
					return a.start();
				}
			}
		}
	};

	return Backstrapp

})