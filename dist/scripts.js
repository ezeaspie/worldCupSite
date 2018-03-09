const modules = document.querySelectorAll(".innerModule");
const showSwitch = document.querySelector(".hideInner");
let status = 0;

showSwitch.addEventListener("click", (e) => {
  e.preventDefault();
  if(status == 0) {
    for (i=0 ; i<modules.length ; i++) {
      modules[i].style.display = "inline-block";
      status++;
    }
  } else {
    for (i=0 ; i<modules.length ; i++) {
      modules[i].style.display = "none";
      status--;
    }
  }
});

for (i=0 ; i<modules.length ; i++) {
  modules[i].style.display = "none";
}
