const dragItems = document.querySelectorAll(".drag-item");
const dropItems = document.querySelectorAll(".drop-item");
const checkButton = document.getElementById("check-button");
const resultDiv = document.getElementById("result");

let dragItem = null;

dragItems.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
});

function dragStart(event) {
  dragItem = event.target;
  setTimeout(() => {
    event.target.style.display = "none";
  }, 0);
}

dropItems.forEach((item) => {
  item.addEventListener("dragover", dragOver);
  item.addEventListener("dragenter", dragEnter);
  item.addEventListener("dragleave", dragLeave);
  item.addEventListener("drop", drop);
});

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
  this.classList.add("drag-over");
}

function dragLeave(event) {
  this.classList.remove("drag-over");
}

function drop(event) {
  event.preventDefault();
  this.classList.remove("drag-over");
  
  // Vérifier si la boîte contient déjà un élément
  if (this.firstChild) {
    dragItem.style.display = "flex";
  } else {
    // Vérifier si un élément a déjà été déposé sur cette boîte
    const alreadyDropped = Array.from(dropItems).some((dropItem) => dropItem.contains(dragItem));
    if (alreadyDropped) {
      dragItem.style.display = "flex";
    } else {
      this.appendChild(dragItem);
      dragItem.style.display = "flex";
    }
  }
}

// Gestion de l'événement dragend pour empêcher les éléments de disparaître
dragItems.forEach((item) => {
  item.addEventListener("dragend", dragEnd);
});

function dragEnd(event) {
  // Vérifier si l'élément est toujours dans une boîte
  let inDropItem = false;
  dropItems.forEach((item) => {
    if (item.contains(dragItem)) {
      inDropItem = true;
    }
  });
  // Si l'élément n'est pas dans une boîte, le remettre à sa place d'origine
  if (!inDropItem) {
    event.target.style.display = "flex";
  }
}

checkButton.addEventListener("click", () => {
  let correct = true;
  dropItems.forEach((item) => {
    if (!item.firstChild) {
      correct = false;
    } else if (item.classList.contains("drop-1") && item.firstChild.textContent !== "Élément 2") {
      correct = false;
    } else if (item.classList.contains("drop-2") && item.firstChild.textContent !== "Élément 1") {
      correct = false;
    } else if (item.classList.contains("drop-3") && item.firstChild.textContent !== "Élément 4") {
      correct = false;
    } else if (item.classList.contains("drop-4") && item.firstChild.textContent !== "Élément 3") {
      correct = false;
    }
  });
  if (correct) {
    resultDiv.textContent = "Bravo, toutes les réponses sont correctes !";
    resultDiv.style.color = "green";
  } else {
    resultDiv.textContent = "Désolé, au moins une réponse est incorrecte.";
    resultDiv.style.color = "red";
  }
  
});