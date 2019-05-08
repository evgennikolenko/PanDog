﻿// (function(global) {

//     var paths = {
//         "rxjs/*": "./node_modules/rxjs/bundles/Rx.min.js",
//         "@angular/*": "./node_modules/@angular/*"
//     }

//     var packages = { "app": {} };

//     var angularModules = ["common", "compiler",
//         "core", "platform-browser", "platform-browser-dynamic"
//     ];

//     angularModules.forEach(function(pkg) {
//         packages["@angular/" + pkg] = {
//             main: "/bundles/" + pkg + ".umd.min.js"
//         };
//     });

//     System.config({ paths: paths, packages: packages });

// })(this);

/**
 * System configuration for Angular samples
 */
(function(global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: './src/app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
            'tslib': 'npm:tslib/tslib.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            'socket.io-client': 'npm:socket.io-client/dist/socket.io.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main',
                defaultExtension: 'js'
            },
            rxjs: {
                main: 'Rx.js',
                defaultExtension: 'js'
            },
            "rxjs/operators": {
                main: 'index.js',
                defaultExtension: 'js'
            },
            "rxjs/observable" : {
                "main": "of.js",
                "defaultExtension": "js"
            }
        }
    });
})(this);