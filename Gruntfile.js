module.exports = function(grunt) {

  // CONFIGURE GRUNT ===========================================================
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: ['Grunfile.js', 'src/**/*.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/js/script.min.js': 'src/js/script.js'
          // 'dist/js/script.min.js': ['src/js/script.js', 'src/js/script2.js']   // min multiple files
        }
      }
      
      // Different Tasks for Different Environments
      // ,dev: { 
      //   files: { 'dist/js/script.min.js': ['src/js/script.js', 'src/js/script2.js'] } 
      // }, 
      // production: { 
      //   files: { 'dist/js/script.min.js': 'src/**/*.js' } 
      // } 
    },
    
    // compile less stylesheets to css -----------------------------------------
    less: {
      build: {
        files: {
          'dist/css/style.css': 'src/less/all.less'
        }
      }
    },

    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/style.min.css': 'dist/css/style.css'
        }
      }
    },

    // configure watch to auto update ------------------------------------------
    watch: {
      stylesheets: {
        files: ['src/**/*.css', 'src/**/*.less'],
        tasks: ['less', 'cssmin']
      },
      scripts: {
        files: 'src/**/*.js',
        tasks: ['jshint', 'uglify']
      }
    }
  });

  // LOAD GRUNT PLUGINS ========================================================
  grunt.loadNpmTasks('grunt-contrib-jshint');	      // Validate files using jshint
  grunt.loadNpmTasks('grunt-contrib-uglify');	      // Minify JS files using UglifyJS
  grunt.loadNpmTasks('grunt-contrib-less');	        // Compile LESS files to CSS
  grunt.loadNpmTasks('grunt-contrib-cssmin');	      // Compress CSS files
  grunt.loadNpmTasks('grunt-contrib-watch');	      // Run tasks whenever watched files are changed
  
  // grunt.loadNpmTasks('grunt-contrib-clean');	      // Clean up files and folders
  // grunt.loadNpmTasks('grunt-contrib-copy');	      // Copy files and folders
  // grunt.loadNpmTasks('grunt-contrib-concat');	    // Combine files into a single file
  // grunt.loadNpmTasks('grunt-contrib-imagemin');	  // Minify PNG, JPG, and GIFs
  // grunt.loadNpmTasks('grunt-contrib-compass');	    // Compile SASS to CSS using Compass
  // grunt.loadNpmTasks('grunt-contrib-htmlmin');	    // Minify HTML files

  // CREATE TASKS ==============================================================  
  // this default task will go through all configuration (dev and production) in each task 
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'less']);

  // // this task will only run the dev configuration 
  // grunt.registerTask('dev', ['jshint:dev', 'uglify:dev', 'cssmin:dev', 'less:dev']);
  // // only run production configuration 
  // grunt.registerTask('production', ['jshint:production', 'uglify:production', 'cssmin:production', 'less:production']);
};
