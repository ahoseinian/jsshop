'use strict';

module.exports = function (grunt) {
  // Project Configuration
  grunt.initConfig({
    assets: grunt.file.readJSON('./config/assets.json'),
    uglify: {
      main: {
        options: {
          mangle: true,
          compress: true
        },
        files: '<%= assets.main.js %>'
      },
      front: {
        options: {
          mangle: true,
          compress: true
        },
        files: '<%= assets.front.js %>'
      },
      panel: {
        options: {
          mangle: true,
          compress: true
        },
        files: '<%= assets.panel.js %>'
      },
      admin:{ 
        options: {
          mangle: true,
          compress: true
        },
        files: '<%= assets.admin.js %>'
      }
    },
    cssmin: {
      main: {
        files: '<%= assets.main.css %>'
      }
    },
    watch: {
      css: {
        files: ['public/**/*.js', 'public/**/*.css', 'public/**/*.html', 'views/**/*.jade'],
        options: {
          livereload: true
        }
      }
    }
  });

  //Load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  //Default task(s).
  grunt.registerTask('default', ['cssmin', 'uglify']);

};

