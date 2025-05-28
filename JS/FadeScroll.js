const scrollLimit = 750;

var scrollElements = document.querySelectorAll('.scroll');
 
document.onscroll = function() { 
  scrollElements.forEach(scrollElement => { 
  var elementPosition = scrollElement.getBoundingClientRect();
  var yPos = elementPosition.top;
  console.log(yPos);
  if(yPos < scrollLimit) { 
    scrollElement.classList.add('scroll--show');
  }
  else if (yPos > scrollLimit) {
    scrollElement.classList.remove('scroll--show');
  }
 });
}