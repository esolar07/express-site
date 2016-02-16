// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all configuration will go here

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'public/**/*.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'public/javascripts/site.min.js': 'public/javascripts/site.js'
        }
      }
    }, 

    sass: {
      dist: {
        files: {
          'public/stylesheets/style.css': 'public/stylesheets/style.scss'
        }
      }
    },

    compass: {                  // Task 
      dist: {                   // Target 
        options: {              // Target options 
          sassDir: 'sass',
          cssDir: 'css',
          environment: 'production'
        }
      },
      dev: {                    // Another target 
        options: {
          sassDir: 'sass',
          cssDir: 'css'
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
          'public/stylesheets/style.min.css': 'public/stylesheets/style.css'
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

  watch: {
  
    // for stylesheets, watch css and sass files 
    // only run sass and cssmin 
    stylesheets: { 
      files: ['public/stylesheets/style.css', 'public/stylesheets/style.scss'], 
      tasks: ['sass', 'cssmin', 'autoprefixer', "compass"] 
    }
  }


  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');





// ===========================================================================
// REGISTER GRUNT PLUGINS ====================================================
// ===========================================================================

  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'sass', 'autoprefixer']); 


};