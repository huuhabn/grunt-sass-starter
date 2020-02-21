'use strict';
const sass = require('node-sass');
module.exports = function (grunt) {

    grunt.initConfig({
        notify: {
            sass: {
                options: {
                    title  : '<%= pkg.name %>',
                    message: 'Sass Compiler finished'
                }
            },
            js  : {
                options: {
                    title  : '<%= pkg.name %>',
                    message: 'JS Compiler finished'
                }
            },
            concat  : {
                options: {
                    title  : '<%= pkg.name %>',
                    message: 'CONCAT finished'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'assets/js/**/*.js',
                '!assets/build/app.min.js'
            ]
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    compass: false,
                    sourcemap: false
                },
                files: {
                    'assets/build/app.min.css': [
                        'assets/sass/app.scss'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'assets/build/app.min.js': [
                        'assets/js/app.js'
                    ]
                },
                options: {
                    sourceMap: 'assets/build/app.min.js.map',
                    sourceMappingURL: '/assets/build/app.min.js.map'
                }
            }
        },
        watch: {
            options: {
                livereload: true//Default port 35729
            },
            sass: {
                files: [
                    'assets/sass/**/*.scss'
                ],
                tasks: ['sass']
            },
            js: {
                files: [
                    'assets/js/**/*.js'
                ],
                tasks: ['jshint', 'uglify']
            },
            html: {
                files: [
                    '**/*.html'
                ]
            }
        },
        clean: {
            dist: [
                'assets/build/app.min.css',
                'assets/build/app.min.js'
            ]
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-notify');

    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'sass',
        'uglify'
    ]);
    grunt.registerTask('dev', [
        'watch'
    ]);

};