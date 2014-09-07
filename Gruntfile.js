module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
//        uglify: {
//            options: {
//                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//            },
//            build: {
//                src: 'src/<%= pkg.name %>.js',
//                dest: 'build/<%= pkg.name %>.min.js'
//            }
//        },
        less: {
            production: {
                options: {
                    paths: ["css"],
                    cleancss: true
//                    modifyVars: {
//                        imgPath: '"http://mycdn.com/path/to/images"'
//                    }
                },
                files: {
                    "dist/css/styles.css": "css/styles.less"
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        dest: './dist/',
                        src: './*.html',
                        expand: true
                    }
                ]
            }},
        cdnify: {
            options: {
                cdn: require('cdnjs-cdn-data')
            },
            dist: {
                html: ['./dist/*.html']
            }
        },
        'string-replace': {
            kit: {
                files: {
                    'dist/index.html': 'dist/index.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: '<script src="bower_components/less/dist/less-1.7.4.js" type="text/javascript"></script>',
                            replacement: ''
                        },
                        {
                            pattern: '<link rel="stylesheet/less" type="text/css" href="css/styles.less"/>',
                            replacement: '<link rel="stylesheet" href="css/styles.css"/>'
                        },
                        {
                            pattern: 'href="bower_components',
                            replacement: 'href="../bower_components'
                        }
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-google-cdn');
    grunt.loadNpmTasks('grunt-copy');
    grunt.loadNpmTasks('grunt-string-replace');

//    grunt.registerTask('cut-for-jbake', 'cut-for-jbake.', function () {
//        var done = this.async();
//
//        var lineReader = require('line-reader');
//        var fs = require('fs');
//        var buffer = '';
//        var file = '';
//
//        lineReader.eachLine('dist/index.html', function (line, last) {
//            //grunt.log.writeln(line);
//
//            if (String(line).indexOf("<!--jbake ") == 0) {
//                buffer = '';
//                file = line.substring(10, line.indexOf('-->'))
//            }
//
//            if (String(line).indexOf("<!--end  -->") == 0) {
//                grunt.file.write("dist/" + file, buffer);
//            }
//
//            buffer += line;
//
//            if (last) {
//                done();
//            }
//        });
//    });

    // Default task(s).
    grunt.registerTask('default', ['copy', 'less', 'cdnify', 'string-replace']);

};