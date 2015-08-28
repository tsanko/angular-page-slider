// Generated on 2015-08-17 using generator-angular-component 0.2.3
'use strict';

module.exports = function (grunt) {

	// Configurable paths
	var yoConfig = {
		livereload: 35729,
		app       : require('./bower.json').name,
		src       : 'src',
		dist      : 'dist',
		tmp       : '.tmp'
	};

	// Livereload setup
	var lrSnippet = require('connect-livereload')({port: yoConfig.livereload});
	var mountFolder = function (connect, dir) {
		return connect.static(require('path').resolve(dir));
	};

	// Load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration
	grunt.initConfig({
		pkg       : grunt.file.readJSON('package.json'),
		yo        : yoConfig,
		meta      : {
			banner: '/**\n' +
			' * <%= pkg.name %>\n' +
			' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * @link <%= pkg.homepage %>\n' +
			' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
			' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
			' */\n'
		},
		open      : {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			}
		},
		clean     : {
			dist  : {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yo.dist %>/*',
						'!<%= yo.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},
		watch     : {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			//less     : {
			//	files: ['<%= yo.src %>/{,*/}*.less'],
			//	tasks: ['less:dist']
			//},
			app      : {
				files  : [
					'<%= yo.src %>/{,*/}*.html',
					'{.tmp,<%= yo.src %>}/{,*/}*.css',
					'{.tmp,<%= yo.src %>}/{,*/}*.js'
				],
				options: {
					livereload: yoConfig.livereload
				}
			},
			test     : {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'qunit']
			}
		},
		connect   : {
			options   : {
				port    : 9000,
				hostname: '0.0.0.0' // Change this to '0.0.0.0' to access the server from outside.
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, yoConfig.src)
						];
					}
				}
			}
		},
		sass      : {
			options: {
				//debugInfo   : true
				style    : 'expanded',
				sourcemap: 'none'   // 'auto'
			},
			dist   : {
				files: [
					{
						expand: true,
						cwd   : '<%= yo.src %>/styles',
						src   : ['<%= yo.app %>.scss'],
						dest  : '<%= yo.dist %>',
						ext   : '.css'
					}
				]
			},
			server : {
				files: [
					{
						expand: true,
						cwd   : '<%= yo.src %>',
						src   : ['styles/<%= yo.app %>.scss'],
						dest  : '.tmp/styles',
						ext   : '.css'
					}
				]
			}
		},
		cssmin    : {
			generated: {
				files: [{
					expand: true,
					cwd   : '<%= yo.dist %>',
					src   : ['*.css', '!*.min.css'],
					dest  : '<%= yo.dist %>',
					ext   : '.min.css'
				}]
			}
		},
		jshint    : {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src    : 'Gruntfile.js'
			},
			src      : {
				options: {
					jshintrc: '.jshintrc'
				},
				src    : ['<%= yo.src %>/{,*/}*.js']
			},
			test     : {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src    : ['test/**/*.js']
			}
		},
		jscs      : {
			src    : '<%= yo.src %>/{,*/}*.js',
			options: {
				config            : '.jscsrc',
				esnext            : true, // If you use ES6 http://jscs.info/overview.html#esnext
				verbose           : true, // If you need output with rule names http://jscs.info/overview.html#verbose
				requireCurlyBraces: ['if']
			}
		},
		karma     : {
			options: {
				configFile: 'test/karma.conf.js',
				browsers  : ['PhantomJS']
			},
			unit   : {
				configFile: 'test/karma.conf.js',
				singleRun : true
			},
			server : {
				autoWatch: true
			}
		},

		concat    : {
			options: {
				banner      : '<%= meta.banner %>',
				stripBanners: true
			},
			dist   : {
				src : ['<%= yo.src %>/*.js'],
				dest: '<%= yo.dist %>/<%= pkg.name %>.js'
			}
		},

		uglify    : {
			options: {
				banner: '<%= meta.banner %>'
			},
			dist   : {
				src : '<%= yo.dist %>/<%= pkg.name %>.js',
				dest: '<%= yo.dist %>/<%= pkg.name %>.min.js'
			}
		},
		// ng-annotate tries to make the code safe for minification automatically
		// by using the Angular long form for dependency injection.
		ngAnnotate: {
			dist: {
				files: [
					{
						expand: true,
						cwd   : '<%= yo.dist %>',
						src   : ['*.js'],
						dest  : '<%= yo.dist %>'
					}
				]
			}
		},
		// Copies remaining files to places other tasks can use
		copy      : {
			dist  : {
				files: [{
					expand: true,
					dot   : true,
					cwd   : '<%= yo.src %>',
					dest  : '<%= yo.dist %>',
					src   : [
						'*.{ico,png,txt}',
						'.htaccess',
						'*.html',
						'images/{,*/}*.{webp}',
						'styles/fonts/{,*/}*.*'
					]
				}, {
					expand: true,
					cwd   : '<%= yo.tmp %>/images',
					dest  : '<%= yo.dist %>/images',
					src   : ['generated/*']
				}, {
					expand: true,
					cwd   : '.',
					src   : [
						'bower_components/font-awesome/fonts/*'
					],
					dest  : '<%= yo.dist %>'
				}]
			},
			styles: {
				expand: true,
				cwd   : '<%= yo.src %>/styles',
				dest  : '<%= yo.tmp %>/styles/',
				src   : '{,*/}*.css'
			},
			fonts : {
				expand: true,
				cwd   : 'bower_components/font-awesome/fonts',
				dest  : '.tmp/fonts/',
				src   : '*'
			}
		}

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		//useminPrepare: {
		//	//html   : '<%= yo.app %>/index.html',
		//	options: {
		//		dest: '<%= yo.dist %>',
		//		flow: {
		//			html: {
		//				steps: {
		//					js : ['concat', 'uglifyjs'],
		//					css: ['cssmin']
		//				},
		//				post : {}
		//			}
		//		}
		//	}
		//},

		// Performs rewrites based on filerev and the useminPrepare configuration
		//usemin: {
		//	html   : ['<%= yo.dist %>/{,*/}*.html'],
		//	css    : ['<%= yo.dist %>/{,*/}*.css'],
		//	js     : ['<%= yo.dist %>/{,*/}*.js'],
		//	options: {
		//		assetsDirs: [
		//			'<%= yo.dist %>',
		//			'<%= yo.dist %>/images'
		//		],
		//		patterns  : {
		//			js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
		//		}
		//	}
		//},

		//htmlmin: {
		//	options: {
		//		collapseWhitespace       : true,
		//		conservativeCollapse     : true,
		//		collapseBooleanAttributes: true,
		//		removeCommentsFromCDATA  : true
		//	},
		//	server : {
		//		files: [{
		//			expand: true,
		//			cwd   : '<%= yo.src %>',
		//			src   : ['*.html', 'views/{,*/}*.html', 'scripts/**/.*.html'],
		//			dest  : '.tmp'
		//		}]
		//	},
		//	dist: {
		//		files  : [{
		//			expand: true,
		//			cwd   : '<%= yo.dist %>',
		//			src   : ['*.html'],
		//			dest  : '<%= yo.dist %>'
		//		}]
		//	}
		//}
	});

	grunt.registerTask('test', [
		'jshint',
		'jscs',
		'karma:unit'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		//'useminPrepare',
		'sass:dist',
		'concat',
		'cssmin',
		'ngAnnotate',
		'copy:dist',
		'uglify:dist'
		//'usemin'
	]);

	grunt.registerTask('release', [
		'test',
		'bump-only',
		'dist',
		'bump-commit'
	]);

	grunt.registerTask('default', [
		'test',
		'build'
	]);
};
