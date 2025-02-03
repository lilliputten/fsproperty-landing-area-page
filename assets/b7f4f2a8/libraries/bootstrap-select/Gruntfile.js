module.exports=function(s){var e;RegExp.quote=function(s){return s.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&")},s.initConfig({pkg:s.file.readJSON("package.json"),banner:"/*!\n * Bootstrap-select v<%= pkg.version %> (<%= pkg.homepage %>)\n *\n * Copyright 2013-<%= grunt.template.today('yyyy') %> bootstrap-select\n * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n */\n",clean:{css:"dist/css",js:"dist/js"},jshint:{options:{jshintrc:"js/.jshintrc"},gruntfile:{options:{node:!0},src:"Gruntfile.js"},main:{src:"js/*.js"},i18n:{src:"js/i18n/*.js"}},concat:{options:{banner:"<%= banner %>",stripBanners:!0},main:{src:"<%= jshint.main.src %>",dest:"dist/js/<%= pkg.name %>.js"},i18n:{expand:!0,src:"<%= jshint.i18n.src %>",dest:"dist/"}},uglify:{options:{preserveComments:"some"},main:{src:"<%= concat.main.dest %>",dest:"dist/js/<%= pkg.name %>.min.js",options:{sourceMap:!0,sourceMapName:"dist/js/<%= pkg.name %>.js.map"}},i18n:{expand:!0,src:"dist/<%= jshint.i18n.src %>",ext:".min.js"}},less:{options:{strictMath:!0,sourceMap:!0,outputSourceFiles:!0,sourceMapURL:"<%= pkg.name %>.css.map",sourceMapFilename:"<%= less.css.dest %>.map"},css:{src:"less/bootstrap-select.less",dest:"dist/css/<%= pkg.name %>.css"}},usebanner:{css:{options:{banner:"<%= banner %>"},src:"<%= less.css.dest %>"}},cssmin:{options:{compatibility:"ie8",keepSpecialComments:"*",advanced:!1},css:{src:"<%= less.css.dest %>",dest:"dist/css/<%= pkg.name %>.min.css"}},csslint:{options:{"adjoining-classes":!1,"box-sizing":!1,"box-model":!1,"compatible-vendor-prefixes":!1,floats:!1,"font-sizes":!1,gradients:!1,important:!1,"known-properties":!1,"outline-none":!1,"qualified-headings":!1,"regex-selectors":!1,shorthand:!1,"text-indent":!1,"unique-headings":!1,"universal-selector":!1,"unqualified-attributes":!1,"overqualified-elements":!1},css:{src:"<%= less.css.dest %>"}},sed:{versionNumber:{path:["js/<%= pkg.name %>.js","bower.json","composer.json","package.json"],pattern:(e=s.option("old"),e?RegExp.quote(e):e),replacement:s.option("new"),recursive:!0}},autoprefixer:{options:{browsers:["Android 2.3","Android >= 4","Chrome >= 20","Firefox >= 24","Explorer >= 8","iOS >= 6","Opera >= 12","Safari >= 6"]},css:{options:{map:!0},src:"<%= less.css.dest %>"}},compress:{zip:{options:{archive:"bootstrap-select-<%= pkg.version %>.zip",mode:"zip"},files:[{expand:!0,cwd:"dist/",src:"**",dest:"bootstrap-select-<%= pkg.version %>/"},{src:["bower.json","composer.json","package.json"],dest:"bootstrap-select-<%= pkg.version %>/"}]}},watch:{gruntfile:{files:"<%= jshint.gruntfile.src %>",tasks:"jshint:gruntfile"},js:{files:["<%= jshint.main.src %>","<%= jshint.i18n.src %>"],tasks:"build-js"},less:{files:"less/*.less",tasks:"build-css"}}}),require("load-grunt-tasks")(s,{scope:"devDependencies"}),s.registerTask("change-version-number","sed"),s.registerTask("build-css",["clean:css","less","autoprefixer","usebanner","cssmin"]),s.registerTask("build-js",["clean:js","concat","uglify"]),s.registerTask("dev-watch",["build-css","build-js","watch"]),s.registerTask("dist",["build-css","build-js","compress"]),s.registerTask("default",["build-css","build-js"])};