### Stuff that's great:

- `emissive-intensity` maps to `emissiveIntensity`, and we can use `rotation.x` attributes, wow!

### Stuff that needs to be better:

- three-game needs to emit a "created" event
- we need a way to squeeze early/late ticks in, eg. physics calculations
- the only way to hook into scene rendering (and maybe do post processing) is to create your own scene element class and overload its `render` function.
