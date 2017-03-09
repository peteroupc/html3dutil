<a id=Subclasses></a>
## Subclasses

Some classes in the HTML 3D Library inherit the methods of others.  These classes
are called subclasses.  To make a class a subclass of another, place the following code
after the subclass's constructor:

      SUBCLASS.prototype = Object.create(BASECLASS.prototype);
      SUBCLASS.prototype.constructor = SUBCLASS;

where `SUBCLASS` is the name of the subclass, and BASECLASS is the name
of the class whose methods the subclass will inherit.
