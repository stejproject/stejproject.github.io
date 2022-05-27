var isNS = (navigator.appName == &quot;Netscape&quot;) ? 1 : 0;
if(navigator.appName == &quot;Netscape&quot;) document.captureEvents(Event.MOUSEDOWN||Event.MOUSEUP);
function mischandler(){
return false;
}
function mousehandler(e){
var myevent = (isNS) ? e : event;
var eventbutton = (isNS) ? myevent.which : myevent.button;
(eventbutton==2)||(eventbutton==3)) {
 alert("copyThieft");
 return false;
 }
}
document.oncontextmenu = mischandler;
document.onmousedown = mousehandler;
document.onmouseup = mousehandler;
