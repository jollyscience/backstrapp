define(['backstrapp/backstrapp'], function (Backstrapp) {
	return {

		RunTests: function () {
			var b$ = {};
			var isObject = function (i) {
				return (typeof i == 'object');
			}
			var isFunction = function (i) {
				return (typeof i == 'function');
			}

			module('Backstrapp: Main');
			
			test('Instantiation', function () {
				var b$ = Backstrapp;
				ok(b$, 'Backstrapp is Defined!');
				ok(b$.Util, 'Properly loads Util');
			});

			module('Backstrapp: Main: Functions', {
				setup: function () {
					b$ = Backstrapp;
				},
				teardown: function () {
					b$ = {};
				}
			});

			test('Properly returns functions', function () {				
				/* Facade */
				var fac = new b$.Facade();
				ok(fac, 'Properly instantiates new Facade');
				ok(isObject(fac), 'Facade returns object');
				
				/* Mediator */
				var med = new b$.Mediator();
				ok(med, 'Properly instantiates new Mediator');
				ok(isObject(med), 'Mediator returns object');

				/* Permissions */
				var per = new b$.Permissions();
				ok(per, 'Properly instantiates new Permissions');
				ok(isObject(per), 'Permissions returns object');

				/* Builder */
				var bui = new b$.Builder();
				ok(bui, 'Properly instantiates new Builder');
				ok(isObject(bui), 'Builder returns object');

				/* Activator */
				var act = new b$.Activator();
				ok(act, 'Properly instantiates new Activator');
				ok(isObject(act), 'Activator returns object');

				/* Error */
				var err = new b$.Error();
				ok(err, 'Properly instantiates new Error');
				ok(isFunction(err), 'Error returns function');

				/* Router */
				var rou = new b$.Router();
				ok(rou, 'Properly instantiates new Router');
				ok(isObject(rou), 'Router returns object');

				/* App */
				var app = new b$.App();
				ok(app, 'Properly instantiates new App');
				ok(isObject(app), 'App returns object');
			});
			
			module('Backstrapp: Main: Objects', {
				setup: function () {
					b$ = Backstrapp;
				},
				teardown: function () {
					b$ = {};
				}
			});
			
			test('Properly returns Objects', function () {
				/* Debug */
				var deb = b$.Debug;
				ok(deb, 'Properly instantiates new Debug');
				ok(isObject(deb), 'Debug returns object');

				/* Template */
				var tem = b$.Template;
				ok(tem, 'Properly instantiates new Template');
				ok(isObject(tem), 'Template returns object');

				/* Module */
				var mod = b$.Module;
				ok(mod, 'Properly instantiates new Module');
				ok(isFunction(mod), 'Module returns function');
			});
		}
	};
});