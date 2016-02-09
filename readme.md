#Gulp Template for static sites

This template will help you build static sites for development and production. 

##To install:

Clone from BitBucket:
```git clone git@bitbucket.org:88brandpartners/gulp-template.git```

Install NPM modules:
```sudo npm install```

Install Bower Components
```bower install```

##Gulp plugins included:

* gulp-plumber
* gulp-rename
* gulp-autoprefixer 
* gulp-concat
* gulp-jshint
* gulp-uglify
* gulp-imagemin
* gulp-cache
* gulp-minify-css
* gulp-sass
* browser-sync
* gulp-html-replace
* gulp-if
* wiredep
* main-bower-files

##Working with the template
While developing navigate to where your gulpfile.js is located and run: ```gulp dev```
This will open up a new tab in your browser and activate browsersync. All sass changes, javascript and html changes will be 'watched' and updated for you automatically.


When you're done developing and want push changes to a production or testing environment run: ```gulp prod```
This will create a 'dist' folder with compressesd images, concatenated javascript and complied css.

##Notes
This template is already and wired up for bootstrap. All of the classes are imported through the main.scss file. All other bower libraries should be added between the ```<!-- build:js-footer -->``` and the ```<!-- endbuild -->``` tags.