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

;
(function ($, undefined) {
	"use strict";

	var pluginName = 'ants',
			Plugin = function (element, options) {
				this.element = element;
				this.$element = $(element);
				this.options = $.extend({}, $.fn[pluginName].defaults, options);

				this.init();
			};

	$.fn[pluginName] = function (options) {
		var args = arguments;

		if (options === undefined || typeof options === 'object') {
			return this.each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
				}
			});
		} else if (typeof _options === 'string' && _options[0] !== '_' && options !== 'init') {
			if (Array.prototype.slice.call(args, 1).length == 0 && $.inArray(options, $.fn[pluginName].getters) != -1) {
				var instance = $.data(this[0], 'plugin_' + pluginName);
				return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
			} else {
				return this.each(function () {
					var instance = $.data(this, 'plugin_' + pluginName);
					if (instance instanceof Plugin && typeof instance[options] === 'function') {
						instance[options].apply(instance, Array.prototype.slice.call(args, 1));
					}
				});
			}
		}
	};

	$.fn[pluginName].defaults = {
		'select':		'>*',
		'thickness':	4,

		'appendTo':		'element',
		'offset':		0,
		'classname':	'',
		'reverse':		false,

		'enter':		undefined,
		'out':			undefined,
	};

	Plugin.prototype = {
		init: function () {
			var self = this;

			this.sides = {
				top: $('<div class="ants ants-horizontal ants-top"/>'),
				left: $('<div class="ants ants-vertical ants-left"/>'),
				bottom: $('<div class="ants ants-horizontal ants-bottom"/>'),
				right: $('<div class="ants ants-vertical ants-right"/>')
			};

			$.each(this.sides, function (s, side) {
				var target;
				
				if (self.options.appendTo === 'element') {
					target = self.$element;
				} else {
					target = self.options.appendTo;
				}

				side.hide().appendTo(target);

				if (self.options.classname) {
					side.addClass(self.options.classname);
				}
			});

			this.$element
					.on('mouseenter', this.options.select, function () {
						return self._attach(this);
					})
					.on('mouseout', this.options.select, function () {
						return self._detach(this);
					});
		},

		destroy: function () {
			$.each(this.sides, function (s, side) {
				side.remove();
			});

			this.$element.removeData('plugin_' + pluginName);
		},

		_attach: function (element) {
			var $element = $(element),
					width = $element.outerWidth(),
					height = $element.outerHeight(),
					offset = $element.offset(),
					left = offset.left,
					top = offset.top,
					bottom = offset.top + height,
					right = offset.left + width,
					double = this.options.offset * 2;

			this.sides.left.css({
				'height': height + this.options.thickness + double,
				'width': this.options.thickness,
				'left': left - this.options.thickness - this.options.offset,
				'top': top - this.options.offset
			}).show();

			this.sides.top.css({
				'width': width + this.options.thickness + double,
				'height': this.options.thickness,
				'left': left - this.options.thickness - this.options.offset,
				'top': top - this.options.thickness - this.options.offset
			}).show();

			this.sides.bottom.css({
				'width': width + this.options.thickness + double,
				'height': this.options.thickness,
				'left': left - this.options.offset,
				'top': bottom + this.options.offset
			}).show();

			this.sides.right.css({
				'height': height + this.options.thickness + double,
				'width': this.options.thickness,
				'left': right + this.options.offset,
				'top': top - this.options.thickness - this.options.offset
			}).show();
		},
		
		_detach: function () {
			this.sides.left.hide();
			this.sides.right.hide();
			this.sides.top.hide();
			this.sides.bottom.hide();
		}
	};
})(jQuery);