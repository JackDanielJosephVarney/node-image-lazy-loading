# Lazy loading images with node.js

You'll need to install [GraphicsMagick](http://www.graphicsmagick.org/) and [ImageMagick](http://www.imagemagick.org) to run this app - it'll run best on Chrome, it wont run properly on Safari, as it doesnt support the IntersectionObserver API.

The app scans and HTML file for img tags and replaces their src attributes with 3 x 3 base64 encoded images - So initially images are embedded into the HTML, resulting in far fewer requests to the server.

On the client it then uses the IntersectionObserver API to determine if the image is on screen. If it is it transitions the actual full size image onto the screen - else the image remains unrendered and you make one less request.

To run:

- npm install
- npm start
