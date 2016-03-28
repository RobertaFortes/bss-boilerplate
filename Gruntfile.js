module.exports = function(grunt) {

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
		} // uglify

	});

		// plugins do grunt
	grunt.loadNpmTasks('grunt-contrib-uglify');

		// tarefas que serão executadas
	grunt.registerTask( 'default', [ 'uglify' ] );

};