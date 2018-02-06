// Lazyloading of images with IntersectionObserver
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

(function(root, lazyload) {
  if (typeof define === 'function' && define.amd) {
      // AMD. Register lazyload as an anonymous module
      define(lazyload);
  } else if (typeof exports === 'object') {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = lazyload();
  } else {
      // Browser globals. Register lazyload on window
      root.lazyLoad = lazyload();
  }
})(this, function() {
  'use strict'

var lazyLoad = {};
var config;

// The lazyload config
const defaults = {
  rootMargin: '100px 0px 0px 0px',
  threshold: 0
};

/**
 * Destroy the current initialization.
 * @public
 */
lazyLoad.destroy = function() {
  // @todo destory all the things
};

/**
 * Initialize Lazyload Plugin
 * @public
 * @param {Object} options User settings
 */
lazyLoad.init = function(options) {
  lazyLoad.destroy();
  
  // @todo use extend instead of a foreach
  Object.keys(defaults).forEach(function(key) { 
    defaults[key] = options[key];
  });
  
  var images = document.querySelectorAll('[data-src]');
  observe(defaults, images);
}; 

/**
 * Observe the the images that should be lazyloaded
 * @private
 * @param {Object} defaults Default options
 * @param {Object} images The images that should be lazyloaded
 */
var observe = function(defaults, images) {
  // Set the IntersectionObserver
  let observer = new IntersectionObserver(function (entries, self) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        self.unobserve(entry.target);
      } 
    });
  }, defaults); //@todo use different config for IntersectionObserver
  
  //Loop throug all the images an add to observer
  images.forEach(function(image) {
    observer.observe(image);
  });
};

/**
 * Load the images by placing the dat-src to the src
 * @private
 * @param images
 */
var loadImage = function(img) {
  var src = img.getAttribute('data-src');

  if (!src) { return; }

  img.src = src;
}

return lazyLoad;
});