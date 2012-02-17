/**
	* The test view does nothing...
	* @module TestView
	* @requires $, _, Backbone, DataModel, Vent
*/
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/data.model',
  'events/vent'
], function($, _, Backbone, DataModel, Vent){
	
	/**
		* @class TestView
		* @extends Backbone.View
	*/
	var TestView = Backbone.View.extend({
		className: "hero-unit",
	
		pageData: {
			"url"		:	"test",
			"title"		:	"Test",
			"type"		:	"app",
			"name"		:	"test",
			"visible"	:	false
		},
		
		testHtml: "<div><h1>MY TEST APP</h1></div>",

		initialize: function () {
			Vent.bind('currentapp:test', this.render, this);
			DataModel.set({ newpage: this.pageData });
		}, 
		
		render: function () {
			$(this.el).html(this.testHtml);
			DataModel.set({ pageHtml:  this.el });
		}
	});
	
	return new TestView();
	
});