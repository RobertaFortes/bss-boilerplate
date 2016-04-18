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
			}
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
			}
		}, // sprite

		concat: {
			dist: {
				src: ['build/js/script.js'],
				dest: 'build/js/main.min.js'
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
		build: ['sprite','imagemin','sass','uglify', 'concat','autoprefixer'],
		test: ['jshint'],
		"default": ['clean','imagemin','sprite','sass','jshint','uglify', 'concat','autoprefixer']
	};

	// Registrando as tarefas customizadas
    _results = [];
    for (taskName in tasks) {
        taskArray = tasks[taskName];
        _results.push(grunt.registerTask(taskName, taskArray));
    }
    return _results;
};