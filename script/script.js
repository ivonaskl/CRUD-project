//surandame index.html fajle mums reikalingus kintamuosius ir juos deklaruojame
const addBox = document.querySelector(".add-new-note-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("div p"),
closeIcon = popupBox.querySelector("div i"),
titleTag = popupBox.querySelector("input"),
textArea = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

//įrašų nurašymas + nuskaitymas JSOn formatu ir jeigu kazkas nepavyktu, duomenys liks masyve
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

//paspaudus pliusiuką, pridedame įvykį, kad paspaudus atsiranda forma naujam įrašui kurti
addBox.addEventListener("click", () => {
    addBtn.innerText = "Pridėkite naują įrašą";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
});

//paspaudus išėjimo mygtuką, išeiname iš formos nieko neužpildę
closeIcon.addEventListener("click", () => {
    titleTag.value = textArea.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

//formos trafaretas:
function showNotes() {
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        const liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <div class="settings">
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${note.description}')"><i class="fa fa-refresh update"></i></li>
                                    <li onclick="deleteNote(${id})"><i class="fa fa-trash delete"></i></li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        //pridedame dar vieną elementą pabaigoje
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

//pridedame show klase, kad paspaudus ant groteliu atsirastu delete ir update buttons
function showMenu(elem) {
    elem.parentElement.classList.add("show");
}

//ištrinimo funkcija
function deleteNote(note) {
    const deleteNote = confirm("Ar norite ištrinti šį įrašą?");
    if(!deleteNote) return;
    notes.splice(note, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

//funkcija update'inti
function updateNote(noteId, title, description) {
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    textArea.value = description;
    addBtn.innerText = "Atnaujinti";
}

//sutikrinimas ir pushinimas į local storage
addBtn.addEventListener("click", e => {
    e.preventDefault();
    const title = titleTag.value.trim(),
    description = textArea.value.trim();

    if(title || description) {
        const noteInfo = {title, description}
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});
