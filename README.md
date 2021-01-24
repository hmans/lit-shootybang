# lit-shootybang

This is a new demo for [three-elements] that I'm working on. It serves the following two purposes:

- to show off that kind of stuff you can do with three-elements.
- to help me identify where three-elements still needs improvement.

The second point is super critical right now, because three-elements is still extremely rough around the edges. Building a demo like this helps me find out what's working, and what's not.

For this reason, the code in this project is often a bit of a mess. There are many things that I needed to work around limitations in three-elements for. The ultimate goal is to funnel these insights into improvements in the library that will in turn help me clean up this project. :-)

BTW, it's called "lit-shootybang" because it's a shootybang, and I'm using [lit-html] for turning application state into DOM. lit-html is awesome!

## My notes on three-elements

...written by someone who didn't just build the library, but is also now building this here demo project for it:

### Stuff that's great:

- Oh come on, it's just an overall lovely library ❤️
- `emissive-intensity` maps to `emissiveIntensity`, and we can use `rotation.x` attributes, yay!

### Stuff that needs to be better:

- three-game needs to emit a "created" event that we can hook in to.
- we need a way to squeeze early/late ticks in, eg. physics calculations
- the only way to hook into scene rendering (and maybe do post processing) is to create your own scene element class and overload its `render` function.
- Very hard to reuse materials right now unless you get a ref to a mesh and assign them directly

[lit-html]: https://lit-html.polymer-project.org/
[three-elements]: https://github.com/hmans/three-elements
