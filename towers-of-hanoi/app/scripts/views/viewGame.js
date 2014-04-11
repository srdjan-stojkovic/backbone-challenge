/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/viewGame.ejs'
], function ($, _, Backbone, gameTemplate) {
    'use strict';

    var ViewgameView = Backbone.View.extend({

        initialize: function(){
            this.pole1 = null;
            this.pole2 = null;
        },

        events:
        {
            "click .pole": "poleBeforeClicked",
            "click .lvl button": "lvlClicked"
        },

        // Handling level shift

        lvlClicked: function(e)
        {
            var l = $(e.currentTarget).attr("data-value");
            if(l==this.model.lvl) return false;
            if(this.model.moves>0)
            {
                var r=confirm("Restart game?");
            }
            if (r==true || this.model.moves==0)
            {
                this.model.lvl = l;
                this.model.setLevel();
                this.render();
            }
        },

        // Before processing click on pole

        poleBeforeClicked: function(e)
        {
            this.poleClicked(e);
            $('.pole').removeClass('active');
            if(this.pole1!==null)
            {
                $('.pole-' + this.pole1).addClass('active');
            }
            if(this.pole2!==null)
            {
                $('.pole-' + this.pole2).addClass('active');
            }
        },

        // Pole clicked

        poleClicked: function(e)
        {
            var p = $(e.currentTarget).attr("data-id");
            if(this.pole1 === null)
            {
                if(this.model.isEmpty(p))
                {
                    this.pole1 = this.pole2 = null;
                    return false;
                }
                // Can't be empty
                this.pole1 = p;
                return true;
            }
            if(this.pole1 !== null)
            {
                // Can't be same as first
                if(this.pole1 == p)
                {
                    this.pole1 = this.pole2 = null;
                    return false;
                }
                // Can't be full
                if(this.model.isFull(p))
                {
                    this.pole1 = this.pole2 = null;
                    return false;
                }
                this.pole2 = p;
                this.processMove();
                return true;
            }
        },

        // Process move with two valid entries

        processMove: function(e)
        {
            if(this.model.isValidMove(this.pole1, this.pole2))
            {
                this.render();
            }
            this.pole1 = this.pole2 = null;
        },

        // Render template

        render: function()
        {
            this.model.checkVictoryConditions();
            this.el.innerHTML =  _.template( gameTemplate, { data: this.model, pole1: this.pole1, pole2: this.pole2 } );
            return this;
        }

    });

    return ViewgameView;
});
