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
var supports = window.IntersectionObserver;
var config;

// The lazyload config
var defaults = {
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
  
  var images = document.querySelectorAll('.lazyload');
  
  if (!supports) {
    place(images);
    return;
  }
  
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
  var observer = new IntersectionObserver(function (entries, self) {
    entries.forEach(function(entry) {

      // isIntersecting property of IntersectionObserverEntry was not implemented, returning undefined
      if (entry.isIntersecting === undefined) {
        place(images);
        return;
      }
      
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
 * Fallback for older browsers, just place the images.
 * @private
 * @param images
 */
var place = function(images) {
  images.forEach(function(image) {
    loadImage(image);
  });
}

/**
 * Load the images by placing the dat-src to the src
 * @private
 * @param elem
 */
var loadImage = function(elem) {
  var dataSrc = elem.getAttribute('data-src'),
      dataSrcset = elem.getAttribute('data-srcset'),
      dataSizes = elem.getAttribute('data-sizes'),
      tagName = elem.tagName;

  if (!dataSrc && !dataSrcset && !tagName == 'PICTURE') {
    return;
  }
  
  if (dataSrc) {
    if (tagName == 'IMG') {
      elem.src = dataSrc;
    } else {
      elem.style.backgroundImage = 'url('+dataSrc+')';
    }
  }
  
  if (dataSrcset) {
    if (tagName == 'IMG') {
      elem.srcset = dataSrcset;
      elem.sizes = dataSizes;
    }
  }
  
  if (tagName == 'PICTURE') {
    var sourceElements = elem.getElementsByTagName('source'),
        imgElement = elem.getElementsByTagName('img')[0];
    
    for (var i = 0; i < sourceElements.length; i++) {
      sourceElements[i].srcset = sourceElements[i].getAttribute('data-srcset');
    }
    
    imgElement.src = imgElement.getAttribute('data-src');
  }
  
  elem.classList.add('is-lazyloaded');
}

return lazyLoad;
});