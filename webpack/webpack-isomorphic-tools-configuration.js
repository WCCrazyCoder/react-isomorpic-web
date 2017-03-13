var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {
	assets: {
		images: {
			extensions: [
		    	'jpeg',
		        'jpg',
		        'png',
		        'gif'
		     ],
	        parser: WebpackIsomorphicToolsPlugin.url_loader_parser
		},
		 bootstrap: {
	      extension: 'js',
	      include: ['./src/theme/bootstrap.config.js'],
	      filter: function(module, regex, options, log) {
	        function is_bootstrap_style(name) {
	          return name.indexOf('./src/theme/bootstrap.config.js') >= 0;
	        }
	        if (options.development) {
	          return is_bootstrap_style(module.name) && WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
	        }
	        // no need for it in production mode
	      },
	      // in development mode there's webpack "style-loader",
	      // so the module.name is not equal to module.name
	      path: WebpackIsomorphicToolsPlugin.style_loader_path_extractor,
	      parser: WebpackIsomorphicToolsPlugin.css_loader_parser
	    },
	    style_modules: {
	    	extensions: ['less','scss','css'],
	      	filter: function(module, regex, options, log) {
	        	if (options.development) {
		         	// in development mode there's webpack "style-loader",
		            // so the module.name is not equal to module.name
		          	return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
	        	} else {
		        	// in production mode there's no webpack "style-loader",
		         	// so the module.name will be equal to the asset path
		          	return regex.test(module.name);
	        	}
	      },
	      path: function(module, options, log) {
	        if (options.development) {
	          // in development mode there's webpack "style-loader",
	          // so the module.name is not equal to module.name
	          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
	        } else {
	          // in production mode there's no webpack "style-loader",
	          // so the module.name will be equal to the asset path
	          return module.name;
	        }
	      },
	      parser: function(module, options, log) {
	        if (options.development) {
	          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
	        } else {
	          // in production mode there's Extract Text Loader which extracts CSS text away
	          return module.source;
	        }
	      }
	    }
	}
}
