// Startar aplicação com __ grunt __ 

module.exports = function(grunt) {

	require('time-grunt')(grunt); // log o tempo das tasks
	require('load-grunt-tasks')(grunt); // plugin load tasks on package.json


    var pkg, config, name, _results, tasks, taskName, taskArray, serverPort;


	grunt.initConfig({
		// Tasks que o grunt vai rodar.


		clean: {
			app: {
				src: [
					'build'
				]
			}
		}, // clean

		sass: {
			options: {
				style: 'compressed'
			},

			build: {
				files: [{
					expand: true,
                    cwd: 'assets/sass',
                    src: ['*.scss'],
                    dest: 'build/css',
                    ext: '.css'
				}]
			},
		}, // sass

		uglify: {
			options: {
				mangle: false
			},

			dev: {
				files: [{
		        	expand: true,
		        	cwd: 'assets/js',
		        	src: ['*.js'],
		        	dest: 'build/js'
		      	}]
			}
		}, // uglify

		jshint: {
			all: [
				'*.js', 
				'assets/js/*.js',
				'assets/**/*.js',
				'assets/js/*.js' 
			]
		}, // jshint

		imagemin: {
			main: {
				files: [{
					expand: true,
                    cwd: 'assets/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/images/'
				}]
			}
		}, // imagemin

		sprite: {
			dev: {
				src: 'assets/images/*.png',
				dest: 'build/images/spritesheet.png',
				destCss: 'build/css/sprite.css',
			},
		}, // sprite

		concat: {
			dist: {
				files: {
					'build/js/main.min.js': ['build/js/script.js'],
					'build/css/main.min.css': ['build/css/main.css', 'build/css/sprite.css'],
				}
			}
		}, // concat
		
		watch: {
			app: {
				files: [
					'assets/**/*'
				],

				tasks: [
					'test',
					'build',
				],
			}
		}, //watch
	});



	// tarefas que serão executadas
	tasks = {
		build: ['sprite','imagemin','sass', 'jshint', 'uglify', 'concat'],
		test: ['clean', 'sprite', 'sass'],
		"default": ['clean','imagemin','sprite','sass','jshint','uglify', 'concat']
	};

	// Registrando as tarefas customizadas
    _results = [];
    for (taskName in tasks) {
        taskArray = tasks[taskName];
        _results.push(grunt.registerTask(taskName, taskArray));
    }
    return _results;
};