module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({

    pkg: pkg,
    banner: '// ==========================================================================\n' +
      '// Project:    <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
      '//             <%= pkg.description %>\n' +
      '// \n' +
      '// Copyright:  ©<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
      '// Repository: <%= pkg.repository %>\n' +
      '// Licensed:   <%= pkg.license %>\n' +
      '// ==========================================================================\n\n',

    clean: {
      files: ['dist', 'build']
    },

    emberTemplates: {
      options: {
        templateName: function(sourceFile) {
          return sourceFile.replace(/packages\/templates\//, '');
        }
      },
      'packages/lib/templates.js': ["packages/templates/**/*.hbs"]
    },

    neuter: {
      options: {
        filepathTransform: function(filepath) {
          filepath.replace('packages/lib');
          return 'packages/' + filepath.replace('packages/lib');
        }
      },
      'dist/<%=pkg.name%>.js': 'packages/lib/main.js'
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        compress: false
      },
      dist: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
    },

    qunit: {
      all: {
        options: {
          urls: ['http://localhost:8000/tests']
        }
      }
    },

    testrunner: {
      all: ['packages/tests/**/*-test.js']
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['packages/lib/**/*.js']
      },
      tests: {
        src: ['packages/tests/**/*.js']
      },
    },


    less: {
      development: {
        options: {
          yuicompress: true
        },
        files: {
          "./dist/<%=pkg.name%>.css": ["./packages/less/main.less"],
        }
      }
    },

    watch: {
      options: {
        nospawn: true,
      },
      code: {
        files: ['packages/lib/**/*.js'],
        tasks: ['jshint', 'neuter', 'qunit'],
      },
      test: {
        files: ['packages/tests/**/*.js'],
        tasks: ['jshint', 'emberTemplates', 'less', 'neuter', 'testrunner', 'qunit'],
      },
      templates: {
        files: ['packages/templates/**/*.js'],
        tasks: ['emberTemplates', 'neuter']
      },
      less: {
        files: ['packages/less/**/*.js'],
        tasks: ['less']
      }
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commitFiles: ['packages.json', 'bower.json', 'dist'],
        push: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('server', 'Start the test web server.', function() {
    grunt.log.writeln('Starting web server on port 8000.');
    require('./tests/server.js').listen(8000);
  });

  grunt.registerMultiTask('testrunner', 'Creates a test runner file.', function() {
    console.log(this.filesSrc);
    var tmpl = grunt.file.read('tests/runner.html.tmpl'),
        renderingContext = {
          data: {
            files: this.filesSrc,
            packageName: pkg.name
          }
        };

    grunt.file.write('tests/index.html', grunt.template.process(tmpl, renderingContext));
  });

  grunt.registerTask('test', ['jshint', 'emberTemplates', 'neuter', 'less', 'testrunner', 'server', 'qunit']);
  grunt.registerTask('build', ['clean', 'jshint', 'emberTemplates', 'neuter', 'less', 'uglify']);
  grunt.registerTask('release', ['build', 'bump']);
  grunt.registerTask('develop', ['jshint', 'emberTemplates', 'neuter', 'less', 'testrunner', 'server', 'watch']);
  grunt.registerTask('default', ['build']);

};