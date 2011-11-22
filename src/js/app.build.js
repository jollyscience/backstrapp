({
    appDir: "../",
    baseUrl: "js",
    dir: "../../build",
	inlineText: true,
	paths: {
	    "loader": "libs/backbone/loader",
        "requireLib": "libs/require/require",
		"jQuery": "libs/jquery/jquery",
		"Underscore": "libs/underscore/underscore",
		"Backbone": "libs/backbone/backbone",
		"templates": "../templates"
    },
	modules: [
        {
            name: "pubMos",
            include: ["requireLib", "main"],
            //True tells the optimizer it is OK to create
            //a new file foo.js. Normally the optimizer
            //wants foo.js to exist in the source directory.
            create: true
        }
    ]
})