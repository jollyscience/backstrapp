define(['jquery', 'backstrapp/modules/template.module.0.1'], function ($, Module) {

	var Accordion = Module.extend({
		render: function () {
			Module.prototype.render.call(this);
		    $('#' + this.model.get('id')).accordion(this.model.toJSON());
		}
	});

	return Accordion;
});