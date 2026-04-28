let container = document.querySelector('.container');

setTimeout(() => {
  container.innerHTML = "<div class='group'><div class='dot' style='left: 220px; top: 220px; background-color: #c5979d;'></div></div>";
}, 500);

setTimeout(() => {
  container.innerHTML = "<div class='group'><div class='dot' style='left: 220px; top: 220px; background-color: #c5979d;'></div><div class='dot' style='left: 160px; top: 220px; background-color: #4b8f8c;'></div></div>";
}, 1000);

setTimeout(() => {
  container.innerHTML = "<div class='group'><div class='dot' style='left: 220px; top: 220px; background-color: #c5979d;'></div><div class='dot' style='left: 160px; top: 220px; background-color: #4b8f8c;'></div><div class='dot' style='left: 280px; top: 220px; background-color: #484d6d;'></div></div>";
}, 1500);

setTimeout(() => {
  container.innerHTML = "<div class='group'><div class='dot' style='left: 220px; top: 220px; background-color: #c5979d;'></div><div class='dot' style='left: 160px; top: 220px; background-color: #4b8f8c;'></div><div class='dot' style='left: 280px; top: 220px; background-color: #484d6d;'></div><div class='dot' style='left: 220px; top: 160px; background-color: #2c365e;'></div></div>";
}, 2000);

setTimeout(() => {
  container.innerHTML = "<div class='group'><div class='dot' style='left: 220px; top: 220px; background-color: #c5979d;'></div><div class='dot' style='left: 160px; top: 220px; background-color: #4b8f8c;'></div><div class='dot' style='left: 280px; top: 220px; background-color: #484d6d;'></div><div class='dot' style='left: 220px; top: 160px; background-color: #2c365e;'></div><div class='dot' style='left: 220px; top: 280px; background-color: #2b193d;'></div></div>";
}, 2500);