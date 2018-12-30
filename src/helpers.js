const lib = {};
lib.ip = 'http://localhost:3001';
// lib.ip = 'http://46.41.150.120:5101';

lib.changeElementSize = (elem, size) => {
  let count = 0;
  let elementHeight = 0;
  const id = setInterval(() => {
    count += 20;
    elementHeight += 2;
    elem.style.display = 'block';
    elem.style.left = window.innerWidth/2 - count/2 + 'px';
    elem.style.top = window.innerHeight/2 - count/2 + 'px';
    elem.style.height = count + elementHeight + 'px'
    elem.style.width = count + 'px'
    elem.style.opacity = size/(2 * size - count)
    if(count >= size || count >= window.innerWidth/1.2){
        clearInterval(id);
        elem.style.opacity = 1;
    }
  }, 10);
};

//Export module
module.exports = lib