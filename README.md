Ants
====
v0.0.3 - Early preview version

Copyright &copy; 2015 Martijn W. van der Lee.
Licensed under the MIT license.

jQuery marching ants outlines

Current version of code I made previously.
The interface will very likely change.

Options
-------
### `select: null`
Specify which children of the container element may receive the marching ants.
If `null`, all direct descendants will be eligible.

### `thickness: 4`
Set the thickness of the marching ants. This should be half (or less) of the
width/height of the animated GIF pictures used.

### `appendTo: "element"`
Append the marching ants DOM elements to the specified selector. Use 'element' to
append to the element used as a container.

Cannot be set using `option` method.

### `offset: 0`
By default, the marching ants are an outline.
Set the offset positive to move the marching ants outwards away from the edges.
Set the offset negative to move the marching ants inwards.

### `reverse: false`
Reverse the direction of the marching ants.

### `classname: ''`
Add the specified classname(s) to the DOM elements making up the marching ants.
Use this classname to specify different animated GIF pictures in CSS.

Todo
----
Document all
Examples and presentation.
Options: ?delay=Int, zIndex=Int, select=Function
Methods: getAttached
Events: enter(element, index), out(element, index)
Handle thickness automatically.
Research how to handle gifs/classes.
Research reset HTML
Research mouseout/enter with negative offset.
Sort options
Register jquery plugins et al.