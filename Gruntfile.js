module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt); // plugin load tasks on package.json

    var pkg, config, name, _results, tasks, taskName, taskArray, serverPort;


	grunt.initConfig({
		// Tasks que o grunt vai rodar.

		watch: {
			build: {
				files: [
					'Gruntfile.js',
					'source/sass/**/*.scss',
					'source/js/*.js',
					'*.html'
				],

				tasks: [
					'clean',
					'uglify',
					'sass',
				],
			}
		},

		clean: {
			build: {
				src: [
					'assets/**/*',
					'assets/*'
				]
			}
		},

		uglify: {
			options: {
				mangle: false
			},

			build: {
				files: {
					'assets/js/main.js' : ['source/js/script.js'] 
				}
			}
		}, // uglify

		sass: {
			options: {
				style: 'compressed'
			},

			build: {
				files: {
					'assets/css/main.css' : 'source/sass/style.scss'
				}
			}
		}, // sass 

	});



	// tarefas que serão executadas
	tasks = {
		build: ['uglify' , 'sass' , 'watch'],
		"default": ['build']
	};

	// Registrando as tarefas customizadas
    _results = [];
    for (taskName in tasks) {
        taskArray = tasks[taskName];
        _results.push(grunt.registerTask(taskName, taskArray));
    }
    return _results;
};