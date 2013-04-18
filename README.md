This is a fork of odyniec's [imgAreaSelect]i(http://odyniec.net/projects/imgareaselect/) that allows for multiple selections to be made on the same document.

Jeremy B. Merrill made these modifications for use in [Tabula](http://github.com/jazzido/tabula), a tool for liberating tabular data from PDFs.

Pull requests are happily accepted; this project is under development as of April 2013.

TODO for API near-compatibility:
(Why "near-compatibility"? Some functions, like cancelSelection() are semantically undefined with an arbitrary number of selections, as opposed to just one.)

better overlap prevention
  apparently, the term of art for this is "collision detection" and the best implementation (for small number of rectangles in 2-space) is a quadtree. Collision solver?

keypress support.
testing everything.
force aspect ratio (broken wrt to overlap prevention on resize.)
fading
multipleSelections option (when `false`, behave as close as possible to original imgAreaSelect)

TODO: move rectangles stuff into another library.