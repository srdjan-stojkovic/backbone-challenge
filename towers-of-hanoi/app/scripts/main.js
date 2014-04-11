/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        text: '../bower_components/text/text'
    }
});

require([
    'backbone',
    'models/modelGame',
    'views/viewGame'
], function (Backbone, modelGame, viewGame) {
    Backbone.history.start();

    var m = new modelGame();
    var view = new viewGame({"el": "#gameboard", "model": m });
    view.render();

});
