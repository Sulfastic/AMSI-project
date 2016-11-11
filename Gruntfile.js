module.exports = function(grunt) {
    grunt.initConfig({
        run_executables: {
            dist: {
                cmd: 'cmd-build/dist.bat',
                args: [
                    'build/package.json',
                    'build/index.html'
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-run-executables');
};

// cmd: 'cmd-build/dist.bat'