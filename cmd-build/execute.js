/**
 * Created by Sulf on 11.11.2016.
 */
var spawn = require('child_process').spawn;
var bat = require.resolve('./web2exe-win.exe');
// const exec = require('child_process').exec;
// exec('./dist.bat', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`exec error: ${error}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
// });

var ls = spawn(bat, ['build', '--package-json', "r'build/package.json'", '--main', "r'build/index.html'", '--export-to', 'windows-x64']);

ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

ls.on('exit', function (code) {
    console.log('child process exited with code ' + code);
});
