# Laziness
![Lazines - Lazyload of images](https://www.edwinbos.nl/laziness/assets/img/laziness.png)

## Lazyload images
Lazy loading of images using the Interaction Observer API that is providing observing changes asynchronously.

### Example
See the [Laziness demo](https://www.edwinbos.nl/laziness/).

### How to use
#### Default images
Use *data-src* instead of *src*:
```html
<img alt="Loch Ness" 
     data-src="https://www.example.com/image.jpg"
/>
```

For valid HTML use a transparent pixel:
```html
<img alt="Loch Ness" 
     data-src="https://www.example.com/image.jpg"
     src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
/>
```

> Images that are in the viewport but not visible are not loaded. When the image becomes visible the image is loaded.

#### Background images
Background images works the same as default images, if set on a non img-element.
```html
<div data-src="https://www.example.com/image.jpg"></div>
```

### Browser support
If the browser supports the InteractionObserver the API is used, but if the browser not supports the InteractionObserver all the images are placed on load.
|Browser|Using InteractionObserver|Just place the images|
|---|---|---|
|Chrome|51+|-
|Firefox|55+|-
|Edge|16+|15+|
|Safari|Not supported|9,10,11?|
|Opera|38+|-|

More about the browser support of IntersectionObserver: https://caniuse.com/#search=IntersectionObserver

### To-do
* Support for data-src