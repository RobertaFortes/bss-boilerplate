// Startar aplicação com __ grunt __ 

module.exports = function(grunt) {

	require('time-grunt')(grunt); // log o tempo das tasks
	require('load-grunt-tasks')(grunt); // plugin load tasks on package.json


    var pkg, config, name, _results, tasks, taskName, taskArray, serverPort;


	grunt.initConfig({
		// Tasks que o grunt vai rodar.


		clean: [
			'dist/*',
			'.sass-cache',
            '.tmp'
		], // clean

	
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
			}
		}, // sass


		//_____________ JS _____________//

		jshint: {
			all: ['Gruntfile.js', 'assets/scripts/*.js']
		}, // jshint

		uglify: {
			options: {
				mangle: false
			},

			app: {
				files: [{
		        	'build/js': '*.js'
		      	}]
			}
		}, // uglify


		concat: {
			dist: {
				files: {
					'build/js/main.min.js': ['assets/scripts/script.js'],
				}
			}
		}, // concat


		//_____________ IMGS _____________ //

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