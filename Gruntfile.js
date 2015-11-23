module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: true,
                compress: true
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'js',
                    src: ['*.src.js', '!*.min.js'],
                    dest: 'js',
                    ext: '.min.js'
                }],
            },
        },
        watch: {
            uglify: {
                files: ['js/*.src.js'],
                tasks: ['uglify'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'watch']);
};
