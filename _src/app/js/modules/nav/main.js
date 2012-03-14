/**
	* Nav Module
*/
define(['lib/backstrapp/module_new', 'core/facade'], function (mod, f) {
	var Module = new mod();

	Module.extend({
		/*
			* @property autoload
			* this tells the Module super class to call 'start()' on 'initComplete'
		*/
		autoload: true,

		/*
			* @property view
			* this is used by Module.load(), which calls 'process()' as a callback
		*/
		view: 'html/app/parts/nav.html',
		
		/*
			* @method start
			* this is either called by the super class (autoload),
			* or, you may call it yourself (from the exports object below),
			* or, you can leave it uncalled, and let the facade start / stop it, 
			* based on some outside event
		*/
		start: function () {
			this.subscribe('startComplete', this.loadView);
			this.subscribe('loadViewComplete', this.process);
			this.subscribe('setHtmlComplete', this.activate);
			this.subscribe('activateComplete', this.render);
			this.subscribe('renderComplete', this.updateActive, 'pageModule');
			this.base();
		},
		
		/*
			* @method process
			* called by load() with the loaded html from this.template
			* the super version of this method just runs the following:
				* this.processTemplate(html, this.exports, this.activate)
		*/
		process: function (html) {
			var obj = {
				meta: f.getMeta(),
				pages: f.getPages()
			}
			this.processTemplate(html, obj, this.setHtml);
		},

		/*
			* @method updateActive
			* 
		*/
		updateActive: function (page) {
			console.log('updateActive', arguments);
			$('.active', this.el).removeClass('active');
			$('#nav_' + page, this.el).addClass('active');
		}

	});

	return {
		init: function (item, params) {
			// bindAll here to allow the module to pass 'autoload:true' to the constructor,
			// and avoid the need for an extra init() call 
			f.util.bindAll(Module, 'start', 'process');
			var ret = Module._init(item, params);
			console.log('ret', ret);
			return ret;
		}
	};
});