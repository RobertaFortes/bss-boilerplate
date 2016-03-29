module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt); // plugin load tasks on package.json

	grunt.initConfig({
		// Tasks que o grunt vai rodar.

		uglify: {
			options: {
				mangle: false
			},

			task: {
				files: {
					'assets/js/main.js' : ['source/js/script.js'] 
				}
			}
		}, // uglify

		sass: {
			options: {
				style: 'compressed'
			},

			task: {
				files: {
					'assets/css/main.css' : 'source/sass/style.scss'
				}
			}
		}, // sass 
	});

		// tarefas que serão executadas
	grunt.registerTask( 'default', [ 'uglify' , 'sass'] );
};