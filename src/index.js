import "./styles.css";

const block2Div1 = document.querySelector("#block2Div1");
const block2Div2 = document.querySelector("#block2Div2");
const block2Div3 = document.querySelector("#block2Div3");

const block1Div1 = document.querySelector("#block1Div1");
const block1Div2 = document.querySelector("#block1Div2");
const block1Div3 = document.querySelector("#block1Div3");

const block1StopPropagation = document.querySelector("#stopPropagation1");
const block2StopPropagation = document.querySelector("#stopPropagation2");
const block3StopPropagation = document.querySelector("#stopPropagation3");

const block1StopImmediatePropagation = document.querySelector(
  "#stopImmediatePropagation1"
);
const block2StopImmediatePropagation = document.querySelector(
  "#stopImmediatePropagation2"
);
const block3StopImmediatePropagation = document.querySelector(
  "#stopImmediatePropagation3"
);

let capturing = false;

document.querySelectorAll("#preventDefault").forEach(el =>
  el.addEventListener(
    "click",
    event => {
      event.preventDefault();
      alert("Sorry! preventDefault() won't let you check this!");
    },
    false
  )
);

const processColor = className => {
  if (className.includes("green")) {
    return className.split(" ")[0];
  }

  if (className.includes("light")) {
    if (capturing) {
      return className;
    }

    return className.split(" ")[0];
  }
  return `${className} green`;
};

let counter1 = 1;

const block2Div1Listener1 = event => {
  if (block1StopPropagation.checked) {
    event.stopPropagation();
  }

  if (block1StopImmediatePropagation.checked) {
    event.stopImmediatePropagation();
  }

  setTimeout(
    () => {
      if (capturing && counter1 % 2) {
        block1Div1.className = `${block1Div1.className} light`;
      } else {
        block1Div1.className = processColor(block1Div1.className);
      }
      counter1++;
    },
    capturing ? 1000 : 1500
  );
};

let counter = 1;

const block2Div1Listener2 = event => {
  setTimeout(
    () => {
      if (counter % 2) {
        if (capturing) {
          block1Div1.className = processColor(block1Div1.className);
        } else {
          block1Div1.className = `${block1Div1.className} light`;
        }
      } else if (capturing) {
        block1Div1.className = "div1 green";
      }

      counter++;
    },
    capturing ? 500 : 2000
  );
};

const block2Div2Listener = event => {
  if (block2StopPropagation.checked) {
    event.stopPropagation();
  }

  if (block2StopImmediatePropagation.checked) {
    event.stopImmediatePropagation();
  }

  setTimeout(
    () => {
      block1Div2.className = processColor(block1Div2.className);
    },
    capturing ? 1500 : 1000
  );
};

const block2Div3Listener = event => {
  if (block3StopPropagation.checked) {
    event.stopPropagation();
  }

  if (block3StopImmediatePropagation.checked) {
    event.stopImmediatePropagation();
  }

  setTimeout(
    () => {
      block1Div3.className = processColor(block1Div3.className);
    },
    capturing ? 2000 : 500
  );
};

document.querySelector("#capturing").addEventListener("click", event => {
  capturing = event.target.checked;
  block2Div1.removeEventListener("click", block2Div1Listener1, !capturing);
  block2Div1.removeEventListener("click", block2Div1Listener2, !capturing);
  block2Div2.removeEventListener("click", block2Div2Listener, !capturing);
  block2Div3.removeEventListener("click", block2Div3Listener, !capturing);
  block2Div1.addEventListener("click", block2Div1Listener1, capturing);
  block2Div1.addEventListener("click", block2Div1Listener2, capturing);
  block2Div2.addEventListener("click", block2Div2Listener, capturing);
  block2Div3.addEventListener("click", block2Div3Listener, capturing);
});

block2Div1.addEventListener("click", block2Div1Listener1);
block2Div1.addEventListener("click", block2Div1Listener2);
block2Div2.addEventListener("click", block2Div2Listener);
block2Div3.addEventListener("click", block2Div3Listener);
