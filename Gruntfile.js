    module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'www/style/app.css': ['src/scss/app.scss']
                }
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: ['babelify'],
                    watch: true
                },
                files: {
                    "www/js/app.js": ["src/app/app.js"]
                }
            }
        },
        uglify: {
            app: {
                files: {
                    'www/js/app.min.js': ['www/js/app.js']
                }
            }
        },
        watch: {
            options: {
                event: ['changed', 'added', 'deleted'],
                livereload: {
                    host: 'localhost',
                    port: 8284
                }
            },
            scripts: {
                files: ["src/app/**/*.js"],
                tasks: ["browserify"]
            },
            styles: {
                files: ["src/scss/**/*.scss"],
                tasks: ["sass"]
            },
            config: {
                files: ['src/config.json'],
                tasks: ['copy:config']
            },
            assets: {
                files: [
                    "res/common/**/*",
                    "src/app/**/*.html"
                ],
                tasks: ["copy"]
            }
        },
        copy: {
            assets: {
                files: [
                    /* fonts */
                    {
                        cwd: 'res/common/fonts/', src: '**', dest: 'www/fonts/', expand: true
                    }]
            },
            views: {
                files: [
                    {
                        cwd: 'src/app/', src: 'index.html', dest: 'www/', expand: true
                    }
                ]
            },
            config: {
                files: [
                    {
                        cwd: 'src/app/', src: 'config.json', dest: 'www/', expand: true
                    }
                ]
            }
        },
        clean: {
            all: [
                'www/*'
            ],
            dev: [
                'www/js/app.js'
            ]
        },
        'http-server': {
            dev: {
                root: 'www/',
                port: 8282,
                showDir: true,
                autoIndex: true,
                ext: "html",
                runInBackground: true
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask("build", ["browserify", "sass"]);

    grunt.registerTask("development", ["build", "copy", "http-server","watch"]);
    grunt.registerTask("dev-cordova", ["build", "copy","watch"]);
    grunt.registerTask("release", ["clean:all", "build", "copy", "uglify", "clean:dev"]);

    grunt.registerTask("default", ["development"]);
};