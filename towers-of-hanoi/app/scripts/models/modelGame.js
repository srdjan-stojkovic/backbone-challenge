/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ModelgameModel = Backbone.Model.extend({

        initialize: function(){
            this.lvl = 2;
            this.setLevel();
        },

        // Setting game level

        setLevel: function(){
            this.poles = 3;
            if(this.lvl==1)
            {
                this.rings = 3;
            }
            if(this.lvl==2)
            {
                this.rings = 4;
            }
            if(this.lvl==3)
            {
                this.rings = 5;
            }
            if(this.lvl==4)
            {
                this.rings = 6;
            }
            if(this.lvl==5)
            {
                this.rings = 7;
            }
            if(this.lvl==6)
            {
                this.rings = 8;
            }
            if(this.lvl==7)
            {
                this.rings = 10;
            }
            if(this.lvl==8)
            {
                this.rings = 12;
            }
            this.gamestate = [];
            this.moves = 0;
            this.status = 0;
            this.minMoves = Math.pow(2, this.rings) - 1;

            for(var i=0; i<this.poles; i++)
            {
                this.gamestate[i] = [];
                for(var j=0; j<this.rings; j++)
                {
                    this.gamestate[i][j] = 0;
                }
            }
            for(var i=0; i<this.rings; i++)
            {
                this.gamestate[0][i] = (i+1);
            }
        },

        // Check if subarray is empty

        isEmpty: function(pole) {
            var sum = 0;
            for(var i=0; i<this.rings; i++)
            {
                sum += this.gamestate[pole][i];

            }
            return (sum==0) ? true : false;
        },

        // Check if subarray is full

        isFull: function(pole) {
            for(var i=0; i<this.rings; i++)
            {
                if (this.gamestate[pole][i]===0) return false;
            }
            return true;
        },

        // Check if move is valid

        isValidMove: function(pole1, pole2)
        {
            var p1 = this.findTopElement(pole1);
            var p2 = this.findTopElement(pole2);
            if(p1.value < p2.value)
            {
                // Valid move
                if(p2.value!=99) p2.index--;
                this.gamestate[pole2][p2.index] = this.gamestate[pole1][p1.index];
                this.gamestate[pole1][p1.index] = 0;
                this.moves++;
                return true;
            } else
            {
                return false;
            }
        },

        // Check for victory conditions

        checkVictoryConditions:function()
        {
            for(var i=1; i<this.poles; i++)
            {
                if(this.isFull(i))
                {
                    this.status = 1;
                    return true;
                }
            }
            return false;
        },

        // Find top element in subarray

        findTopElement: function(pole)
        {
            for(var i=0; i<this.rings; i++)
            {
                if (this.gamestate[pole][i] > 0) return { "value": this.gamestate[pole][i], "index": i } ;
            }
            return { "value": 99, "index": (this.rings-1)};
        },

        defaults: {
        }
    });

    return ModelgameModel;
});
