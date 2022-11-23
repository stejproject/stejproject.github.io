var acc = document.getElementsByClassName("icon-taskbar");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "contents") {
      panel.style.display = "none";
    } else {
      panel.style.display = "contents";
    }
  });
}