Ants
====
v0.0.5 - Early preview version

Copyright &copy; 2015 Martijn W. van der Lee.
Licensed under the MIT license.

jQuery marching ants outlines

Download
--------
jQuery v1.8.0 or higher required.

Current version: https://github.com/vanderlee/ants/archive/master.zip

Source code on Github: https://github.com/vanderlee/ants

Todo
----
*	Document all
*	Examples and presentation.
*	Options: ?delay=Int, zIndex=Int.
*	Methods: getAttached
*	Events: enter(element, index), out(element, index)
*	Handle thickness automatically.
*	Research how to handle gifs/classes.
*	Research reset HTML for ants
*	Research mouseout/enter with negative offset.
*	Register jquery plugins et al.
*	Figure out why jQ 1.8+ is required.

Documentation
=============
`.ants(options)`
--------------------
Attaches ants to the children of this element.

Options
-------
### `appendTo: "element"`
Append the marching ants DOM elements to the specified selector. Use 'element' to
append to the element used as a container.

Cannot be set using `option` method.

### `attachOn: 'hover'`
Change when to attach the ants to a DOM element.
Either `hover` to or `focus`.

### `classname: ''`
Add the specified classname(s) to the DOM elements making up the marching ants.
Use this classname to specify different animated GIF pictures in CSS.

### `offset: 0`
By default, the marching ants are an outline.
Set the offset positive to move the marching ants outwards away from the edges.
Set the offset negative to move the marching ants inwards.

### `reverse: false`
Reverse the direction of the marching ants.

### `select: null`
Specify which children of the container element may receive the marching ants.
If `null`, all direct descendants will be eligible.

### `thickness: 4`
Set the thickness of the marching ants. This should be half (or less) of the
width/height of the animated GIF pictures used.

Methods
-------
### `option (optionName)`
Get the value of the specified option.

### `option (optionName, optionValue)`
Set the value of the specified option and update the

### `optionObject`
Set the values of multiple options at once.