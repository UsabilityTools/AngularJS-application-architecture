module.exports = function (grunt) {

    grunt.registerTask('default', [ 'dev' ]);

    grunt.registerTask('dev', [
        'clean',
        'autoprefixer',
        'copy',
        'http-server',
        'watch'
    ]);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            dist: {
                dir: 'dist',
                js: {
                    dir: 'dist/js'
                },
                styles: {
                    dir: 'dist/css'
                },
                images: {
                    dir: 'dist/images'
                },
                html: {
                    dir: 'dist'
                }
            },
            src: {
                js: {
                    dir: 'js',
                    files: 'js/**/*.js'
                },
                styles: {
                    dir: 'css',
                    files: 'css/**/*.css'
                },
                images: {
                    dir: 'images'
                },
                html: {
                    dir: '.',
                    files: 'index.html'  
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: [ 'last 2 version' ]
            },
            dev: {
                options: {
                    cascade: true,
                    map: 'inline'
                },
                expand: true,
                flatten: true,
                src: '<%= config.src.styles.dir %>/**/*.css',
                dest: '<%= config.dist.styles.dir %>'
            }  
        },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: [
                    '<%= config.src.styles.files %>'
                ],
                tasks: [ 'autoprefixer' ]
            },
            html: {
                files: [
                    '<%= config.src.html.files %>'
                ],
                tasks: [ 'copy:html' ]
            },
            js: {
                files: [
                    '<%= config.src.js.files %>'
                ],
                tasks: [ 'copy:js' ]
            }
        },
        clean: {
            dist: '<%= config.dist.dir %>'
        },
        copy: {
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src.js.dir %>',
                    src: '**/*.js',
                    dest: '<%= config.dist.js.dir %>/'
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src.html.dir %>',
                    src: 'index.html',
                    dest: '<%= config.dist.html.dir %>'
                }]
            },
            images: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src.images.dir %>',
                    src: '**',
                    dest: '<%= config.dist.images.dir %>'
                }]
            }
        },
        'http-server': {
            dev: {
                root: '.',
                port: 8080,
                host: '127.0.0.1',
                cache: -1,
                showDir : true,
                autoIndex: true,
                defaultExt: 'html',
                runInBackground: true
            }
        }
        });

    require('load-grunt-tasks')(grunt);

 };