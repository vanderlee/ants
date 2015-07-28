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
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
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
		'select':		null,
		'thickness':	4,

		'appendTo':		'element',
		'offset':		0,
		'classname':	'',
		'reverse':		false,

		'enter':		null,
		'out':			null,
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
			});

			this._handler.mouseenter = function (event) {
				if (!$(this).hasClass('ants') && self.attached !== this) {
					self.attached = this;
					self._attach();
				}
			};
			this._handler.mouseleave = function () {
				if (!$(this).hasClass('ants') && typeof self.attached !== 'undefined') {
					self.attached = undefined;
					return self._detach();
				}
			};

			this._option.reverse.call(this, this.options.reverse);
			this._option.classname.call(this, this.options.classname);
			this._option.select.call(this, this.options.select);
		},

		_handler: {
			mouseenter:	undefined,
			mouseleave:	undefined,
		},

		destroy: function () {
			$.each(this.sides, function (s, side) {
				side.remove();
			});

			this.$element.off(this._handler.mouseenter);
			this.$element.off(this._handler.mouseleave);
			this.$element.removeData('plugin_' + pluginName);
		},

		option: function(option, value) {
			var self = this;

			if (typeof option === 'object') {
				$.each(option, function(key, value) {
					self.option.call(self, key, value);
				});
			} else {
				option = option.toLowerCase();
				if (typeof this.options[option] !== 'undefined') {
					if (typeof value === 'undefined') {
						return this.options[option] || undefined;
					} else {
						switch (option) {
							case 'thickness':
							case 'offset':
								value = parseInt(value);
								break;

							case 'reverse':
								value = !!value;
								break;
						}

						this._option[option] ? this._option[option].call(this, value) : null;
						this.options[option] = value;
					}
				}
			}
		},

		_option: {
			select: function(value) {
				this.$element.off()
					.on('mouseenter', value || '> *:not(.ants)', this._handler.mouseenter)
					.on('mouseleave', value || '> *:not(.ants)', this._handler.mouseleave);
			},
			
			reverse: function(value) {
				var self = this;
				$.each(self.sides, function (s, side) {
					side.toggleClass('ants-reverse', value);
				});
			},

			classname: function(value) {
				var self = this;
				$.each(self.sides, function (s, side) {
					if (self.options.classname) {
						side.removeClass(self.options.classname);
					}
					if (value) {
						side.addClass(value);
					}
				});
			},

			offset: function(value) {
				if (this.attached) {
					this.options.offset = value;
					this._attach();
				}
			},

			thickness: function(value) {
				if (this.attached) {
					this.options.thickness = value;
					this._attach();
				}
			}
		},

		_attach: function () {
			var $element = $(this.attached),
				width = $element.outerWidth(),
				height = $element.outerHeight(),
				offset = $element.offset(),
				left = offset.left,
				top = offset.top,
				bottom = offset.top + height,
				right = offset.left + width,
				double = this.options.offset + this.options.offset;

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
			$.each(this.sides, function (s, side) {
				side.hide();
			});
		}
	};
})(jQuery);