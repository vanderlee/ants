/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*globals jQuery */

/*!
 * Ants
 *
 * Copyright (c) 2015 Martijn W. van der Lee
 * Licensed under the MIT.
 */
/* Animated marching ants
 */

var Ants = function(_options) {
	'use strict';
    
    var options = $.extend({
                'thickness': 4,
                'class':     undefined
            }, _options),
        sides = {
            top: $('<div class="ants ants-horizontal ants-top"/>').hide().appendTo('body'),
            left: $('<div class="ants ants-vertical ants-left"/>').hide().appendTo('body'),
            bottom: $('<div class="ants ants-horizontal ants-bottom"/>').hide().appendTo('body'),
            right: $('<div class="ants ants-vertical ants-right"/>').hide().appendTo('body')
        },   
        methods = {
            attach: function(element) {                
                var $element = $(element),
                    width = $element.outerWidth(),
                    height = $element.outerHeight(),
                    p = $element.offset(),        
                    left = p.left,
                    top = p.top,
                    bottom = p.top + height,
                    right = p.left + width;
                
                sides.left.css({
                    'height': height + options.thickness,
                    'width': options.thickness,
                    'left': left - options.thickness,
                    'top': top
                }).show();
                
                sides.top.css({
                    'width': width + options.thickness,
                    'height': options.thickness,
                    'left': left - options.thickness,
                    'top': top - options.thickness
                }).show();
                
                sides.bottom.css({
                    'width': width + options.thickness,
                    'height': options.thickness,
                    'left': left,
                    'top': bottom
                }).show();
                
                sides.right.css({
                    'height': height + options.thickness,
                    'width': options.thickness,
                    'left': right,
                    'top': top - options.thickness
                }).show();
            },
            
            detach: function() {
                sides.left.hide();
                sides.right.hide();
                sides.top.hide();
                sides.bottom.hide();
            }            
        };


    
    if (options.class) {
        sides.left.addClass(options.class);
        sides.right.addClass(options.class);
        sides.top.addClass(options.class);
        sides.bottom.addClass(options.class);
    }
    
    return methods;
};