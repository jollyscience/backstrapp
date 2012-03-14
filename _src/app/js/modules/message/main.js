define(['underscore', 'lib/backstrapp/module_new'], function (_, mod) {
	var Module = new mod();

	Module.extend({
		init: function (item, params) {
			var n = $(item).attr('id');
			Module.set({ name: n, el: item });
			Module.base(params);
			return Module.exports;
		}
	});
	return Module;
});