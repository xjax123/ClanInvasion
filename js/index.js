//require.config({
//	urlArgs: "v=" + window.BTPLANETS_VERSION
//});

require(['js/btplanets', 'js/btplanets_keys', 'js/btplanets_routes', 'js/btplanets_ui','js/btplanets_generateborders'/* 'js/btplanets_userdata'*/], function (main, keys, routes, ui, borders/*, userdata*/) {
	'use strict';

	var initialized = false;

	var loadCss = function (url) {
		var link = document.createElement("link");
	    link.type = "text/css";
	    link.rel = "stylesheet";
	    link.href = url;
	    document.getElementsByTagName("head")[0].appendChild(link);
	};

	var init = function () {
		main.init();
		keys.init();
		routes.init();
		ui.init();
		borders.init();
		initialized = true;
	};

	window.addEventListener('load', function () {
		!initialized &&	init();
	});

	init();
});
