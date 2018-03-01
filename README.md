# Laziness - A lazyload javascript plugin
![Lazines - Lazyload of images](https://www.edwinbos.nl/laziness/assets/img/laziness.png)

## Lazyload images with Laziness
Lazy loading of images using the Interaction Observer API that is providing observing changes asynchronously.

### Example
See the [Laziness demo](https://www.edwinbos.nl/laziness/).

### How to use Laziness
#### Default images
Use *data-src* instead of *src*:
```html
<img alt="Loch Ness"
     class="lazyload"
     data-src="https://www.example.com/image.jpg"
/>
```

For valid HTML use a transparent pixel:
```html
<img alt="Loch Ness"
     class="lazyload"
     data-src="https://www.example.com/image.jpg"
     src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
/>
```

> Images that are in the viewport but not visible are not loaded. When the image becomes visible the image is loaded.

Use lazyload on <picture>-element:
```html
<picture class="lazyload">
    <source media="(max-width: 799px)" data-srcset="https://www.example.com/image-1.jpg">
    <source media="(min-width: 800px)" data-srcset="https://www.example.com/image-2.jpg">
    <img data-src="https://www.example.com/image-1.jpg" alt="Loch Ness">
</picture>
```

Use lazyload on src-set. Use *data-srcset* instead of *srcset*:
```html
<img data-srcset="https://www.example.com/550.jpg 550w,
                  https://www.example.com/980.jpg 980w,
                  https://www.example.com/1141.jpg 1141w,
                  https://www.example.com/1509.jpg 1509w"
     data-sizes="(max-width: 550px) 550px,
                 (max-width: 980px) 980px,
                 (max-width: 1141px) 1141px,
                 1509px"
     data-src="https://www.example.com/550.jpg" alt="Loch Ness" class="lazyload"
/>
```

#### Background images
Background images works the same as default images, if set on a non img-element.
```html
<div data-src="https://www.example.com/image.jpg"></div>
```

### Browser support for Laziness
If the browser supports the InteractionObserver the API is used, but if the browser not supports the InteractionObserver all the images are placed on load.

|Browser|Using InteractionObserver|Just place the images|
|---|---|---|
|Chrome|51+|-|
|Firefox|55+|-|
|Edge|16+|15+|
|Safari|Not supported|9,10,11?|
|Opera|38+|-|

More about the browser support of IntersectionObserver: https://caniuse.com/#search=IntersectionObserver