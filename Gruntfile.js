// Startar aplicação com __ grunt __ 

module.exports = function(grunt) {

	require('time-grunt')(grunt); // log o tempo das tasks
	require('load-grunt-tasks')(grunt); // plugin load tasks on package.json


    var pkg, config, name, _results, tasks, taskName, taskArray, serverPort;


	grunt.initConfig({
		// Tasks que o grunt vai rodar.


		clean:{
			build: {
				src:['dist','.sass-cache','.tmp']
			},

			release: {
				src:['build','dist','.sass-cache','.tmp']
			}
		},

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
        			src: ['**/*.{jpg,jpeg}'],   
        			dest: 'build/images/'
				}]
			},

			svg: {
				options:{ 
					optimizationLevel: 2
				},

				files: [{
					expand: true,
					cwd: 'assets/images',
					src: ['**/*.svg'],
					dest: 'dist/images/'
				}]
			}
		}, // imagemin

		sprite: {
			app: {
				src: 'dist/images/sprite/*.png',
				dest: 'build/images/spritesheet.png',
				destCss: 'assets/sass/extends/_sprite.scss',
				algorithm: 'top-down',
				padding: 3,
				cssFormat: 'scss'
			},
		}, // sprite

		webfont: {
			icons: {
				src: 'dist/images/svg/*.svg',
				dest: 'build/fonts',
				options: {
					fontFilename: 'icon-{hash}',
					destCss: 'assets/sass/extends/_icon-font.scss'
				}
			}
		},
	
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
					'dist/scripts/main.min.js': ['assets/scripts/*.js', 'assets/scripts/vendor/*.js'],
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
			options: {
				spawn: false
			},

			sprite: {
				files: ['assets/images/*.png'],
				tasks: ['imagemin', 'sprite', 'sass']
			},

			scripts: {
				files: ['assets/scripts/**/*.js'],
				tasks: ['jshint', 'concat', 'uglify']
			},

			sass: {
				files: ['assets/sass/**/*.scss'],
				tasks: ['sass']
			},

			fontes: {
				files: ['assets/fonts/*'],
				tasks: ['copy']
			}
		}, //watch

		copy: {
			files: {
				cwd:'assets/',
				src: 'fonts/*',
				dest: 'build/fonts/',
				expand: true,
				flatten: true
			}
		}, //copy

		

	});



	// tarefas que serão executadas
	tasks = {
		"default": ['clean:release','imagemin','sprite','webfont','sass','jshint','concat','uglify','copy','watch'],
		build: ['clean:build']
	};

	// Registrando as tarefas customizadas
    _results = [];
    for (taskName in tasks) {
        taskArray = tasks[taskName];
        _results.push(grunt.registerTask(taskName, taskArray));
    }
    return _results;
};