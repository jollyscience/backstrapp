define([
  'jQuery',
  'Underscore',
  'Backbone',
  'router',
  'models/data',
  'models/template',
  'events/vent'
], function($, _, Backbone, Router, DataModel, TemplateModel, Vent){

	var AppView = Backbone.View.extend({
		el: $('#content'),

		initialize: function () {
			debug.time('dataLoad');
			debug.debug('AppView.init()');
			DataModel.bind('change:data', this.render, this);
			DataModel.bind('change:data', this.buildNav, this);

			Vent.bind('navigate:page', 	this.findPage, this);
			Vent.bind('pagetype:page', this.loadPage, this);
			Vent.bind('render:page', 	this.renderPage, this);			
			Vent.bind('render:page', 	this.updateNav, this);
			this.loadData();
		},
		
		render: function () {
			debug.debug('AppView.render()');
			this.router = new Router();
			debug.timeEnd('dataLoad');
			return this;
		},
		
		buildNav: function () {
			debug.debug('AppView.buildNav()');
			debug.debug(DataModel.get('data').pages);
			var i, pages;
			pages = DataModel.get('data').pages;
			for ( i in pages ) {
				debug.debug(pages[i].url);
				$("#nav").append('<li id="nav_' + pages[i].url + '"><a href="/#/' + pages[i].url + '">' + pages[i].title + '</a></li>');
			}
		},

		loadData: function () {
			debug.debug('AppView.loadData()');
			DataModel.loadData(DataModel.get('file'), function (json) {
				DataModel.set({data: json});
			})
		},

		findPage: function () {
			debug.debug('AppView.loadPage()');
			debug.debug('DataModel.pages', DataModel.get('data').pages);
			var page;
			if ( page = DataModel.itemExists(DataModel.get('requestedPage'), DataModel.get('data').pages) ) {
				debug.debug('PAGE FOUND', page);
				DataModel.set({ currentPage: page });
				Vent.trigger('pagetype:' + page.type);
			} else {
				debug.debug('PAGE NOT FOUND');
				this.router.navigate('/home', true);
				Vent.trigger('navigate:home');
			}
		},
		
		loadPage: function () {
			$.get(DataModel.get('currentPage').file, function (html) {
				debug.debug(html);
				DataModel.set({pageHtml: html});
				Vent.trigger('render:page');
			});
		},

		renderPage: function () {
			debug.debug('AppView.renderPage()');
			var me;
			me = this;
			this.el.parent().fadeOut(100, function () {
				debug.debug('animation over');
				me.el.html(DataModel.get('pageHtml'));
				me.el.parent().fadeIn(400);
			});
		},
		
		updateNav: function () {
			debug.debug('AppView.updateNav()');
			$('li.active', '#nav').removeClass('active');
			debug.debug('AppView.currentPage', DataModel.get('currentPage'));
			$("#nav_" + DataModel.get('currentPage').url).addClass('active');
		}
	});

	return AppView;

});