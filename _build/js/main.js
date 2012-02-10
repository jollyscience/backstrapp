// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    loader: 'libs/backbone/loader',
    jQuery: 'libs/jquery/jquery',
    Handlebars: 'libs/handlebars/handlebars',
    Underscore: 'libs/underscore/underscore',
    Backbone: 'libs/backbone/backbone',
    order: 'libs/require/order',
    text: 'libs/require/text',
    template: 'libs/require/template',
    templates: '../templates'
  }

});

require([

  // Load our app module and pass it to our definition function
  'views/app/view',
  'libs/debug',

  // Some plugins have to be loaded in order due to their non AMD compliance
  // Because these scripts are not "modules" they do not pass any values to the definition function below
  'order!libs/jquery/jquery-min',
  'order!libs/handlebars/handlebars-min',
  'order!libs/underscore/underscore-min',
  'order!libs/backbone/backbone-min',

], function(AppView){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  var app = new AppView();
});
