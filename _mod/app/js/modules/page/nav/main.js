define(['underscore', 'lib/backstrapp/module', '../facade'], function (_, mod, facade) {
	var Module = new mod();

	Module.extend({
		init: function (item, params) {
			facade.subscribe('nav', 'renderDone', this.updateActive);
			var n = $(item).attr('id');
			Module.set({ name: n, el: item });
			Module.base(params);
			return Module.exports;
		},

		updateActive: function (page) {
			console.log('updateActive', page);
			$('.active', el).removeClass('active');
			$('#nav_' + page, el).addClass('active');
		},
	});
	
	return Module;
});

define(['../utils', '../facade'], function (utils, facade) {
	var el, html = '', template = 'html/test/content/nav.html';
	
	var nav = {

		render: function () {
			require(['text!' + navTemplate], function (response) {
				el.html(response);
			});
		}
	}

	return {
		init: function (item, params) {
			console.log('el', item);
			el = item;
			nav.init(params);
		}
	};
});