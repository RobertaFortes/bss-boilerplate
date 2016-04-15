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
					'*.html',
					'source/images/*.png',
					'source/images/*.jpg'
				],

				tasks: [
					'sprite',
					'uglify',
					'sass',
					'jshint',
				],
			}
		}, //watch

		clean: {
			build: {
				src: [
					'assets/**/*',
					'assets/*'
				]
			}
		}, // clean

		jshint: {
			all: [
				'*.js', 
				'source/js/*.js',
				'source/**/*.js',
				'assets/js/*.js' 
			]
		}, // jshint

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

		sprite: {
			build: {
				src: 'source/images/*.png',
				dest: 'assets/images/spritesheet.png',
				destCss: 'source/sass/sprite.css'
			}
		}, //sprite 
	});



	// tarefas que serão executadas
	tasks = {
		build: ['sass' , 'uglify' , 'sprite' ,'watch'],
		test: ['jshint'],
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