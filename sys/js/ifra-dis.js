const iframe = document.querySelector('[name="lmp"]');

iframe.onhover = function() {
  style.pointerEvents = "none";
}
iframe.onclick = function() {
  style.pointerEvents = "auto";
}
iframe.onmouseup = function() {
  style.pointerEvents = "none";
}

//const iframe = document.querySelector('[name="ifr"]');
//
//iframe.onhover = function() {
//  style.pointerEvents = "none";
//}
//iframe.onclick = function() {
//  style.pointerEvents = "auto";
//}
//iframe.onmouseup = function() {
//  style.pointerEvents = "none";
//}
