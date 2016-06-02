// Startar aplicação com __ grunt __ 

module.exports = function(grunt) {

	require('time-grunt')(grunt); // log o tempo das tasks
	require('load-grunt-tasks')(grunt); // plugin load tasks on package.json


    var pkg, config, name, _results, tasks, taskName, taskArray, serverPort;


	grunt.initConfig({
		// Tasks que o grunt vai rodar.


		clean: [
			'build',
			'dist',
			'.sass-cache',
            '.tmp'
		], // clean

		//_____________ IMGS _____________ //

		imagemin: {
			png: {
				options: {
					optimizationLevel: 7
				},

				files: [{
					expand: true,                  
					cwd: 'assets/images/',                   
					src: ['**/*.png'],   
					dest: 'dist/images/'
				}]
			},

			jpg: {
				options: {
					progressive: true,
					optimizationLevel: 1
				},

				files: [{
					expand: true,                  
        			cwd: 'assets/images/',                   
        			src: ['**/*.jpg'],   
        			dest: 'build/images/'
				}]
			}
		}, // imagemin

		sprite: {
			dev: {
				src: 'dist/images/*.png',
				dest: 'build/images/spritesheet.png',
				destCss: 'assets/sass/extends/_sprite.scss',
			},
		}, // sprite
	
	//_____________ CSS _____________//	


		sass: {
			dist: {
				options: {
					sourcemap: 'none',
					style: 'compressed'
				},

				files: {
	                'build/css/main.min.css': 'assets/sass/main.scss'
				}
			},

			dev: {
				options: {
					style: 'expanded',
					debugInfo: true,
                    lineNumbers: true
				},

				files: {
					'dist/css/main.css': 'assets/sass/main.scss'
				}
			}
		}, // sass


		//_____________ JS _____________//

		jshint: {
			all: ['Gruntfile.js', 'assets/scripts/*.js']
		}, // jshint



		concat: {
			dist: {
				files: {
					'dist/scripts/main.min.js': ['assets/scripts/*.js', 'assets/scripts/vendor/**.js'],
				}
			}
		}, // concat

		uglify: {
			options: {
				mangle: false
			},

			app: {
				files: [{
		        	'build/js/main.min.js': 'dist/scripts/*.js'
		      	}]
			}
		}, // uglify


		
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
		"default": ['clean','imagemin','sprite','sass','jshint','concat','uglify']
	};

	// Registrando as tarefas customizadas
    _results = [];
    for (taskName in tasks) {
        taskArray = tasks[taskName];
        _results.push(grunt.registerTask(taskName, taskArray));
    }
    return _results;
};