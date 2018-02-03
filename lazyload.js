// Lazyloading of images with IntersectionObserver
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

// Get all the images that should be lazyloaded
const images = document.querySelectorAll('[data-src]');

// The lazyload config
const lazyLoadConfig = {
  rootMargin: '100px',
  threshold: 0
};

// Set the IntersectionObserver
let observer = new IntersectionObserver(function (entries, self) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage(entry.target);
      self.unobserve(entry.target);
    } 
  });
}, lazyLoadConfig);

//Loop throug all the images an add to observer
images.forEach(image => {
  observer.observe(image);
});

// Set the data-src as src attribute
function loadImage(img) {
  const src = img.getAttribute('data-src');
  
  if (!src) {
    return;
  }
  
  img.src = src;
}