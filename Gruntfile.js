module.exports = function (grunt) {
// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["dist", '.tmp'],
        copy: {
            main: {
                expand: true,
                flatten: true,
                cwd: 'public_html/',
                src: ['!js/**/*.js'],
                dest: 'dist/'
            },
            templates: {
                expand: true,
                flatten: true,
                cwd: 'public_html/',
                src: ['js/**/*.html'],
                dest: 'dist/templates'
            }
//            css: {
//                expand: true,
//                flatten: true,
//                cwd: 'public_html/',
//                src: ['css/**/*.css', '!css/app.css', '!views/**/*.css'],
//                dest: 'dist/css'
//            }
        },
        useminPrepare: {
            html: 'public_html/index.html'
        },
        usemin: {
            html: ['dist/index.html']
        },
        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        },
        'string-replace': {
            dist: {
                files: [{
                        expand: true,
                        src: 'dist/**/*.js'
                    }],
                options: {
                    replacements: [{
                            pattern: /js\/controllers\//g,
                            replacement: 'lib/angular-file-service/templates/'
                        },
                        {
                            pattern: /js\/directives\//g,
                            replacement: 'lib/angular-file-service/templates/'
                        },
                        {
                            pattern: /js\/services\//g,
                            replacement: 'lib/angular-file-service/templates/'
                        }]
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                        expand: true,
                        cwd: 'dist/css',
                        src: ['*.css', '!*.min.css'],
                        dest: 'dist/css',
                        ext: '.min.css'
                    }]
            }
        },
        revPackage: {
            main: 'dist/js/*.*',
            style: 'dist/css/*.*'
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-rev-package');
    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('pack-project', [
        'copy', 'useminPrepare', 'concat', 'usemin', 'uglify', 'cssmin', 'string-replace', 'revPackage']);
    /*
     
     grunt.registerTask('pack-project', [
     'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin'
     ]);
     */
};
