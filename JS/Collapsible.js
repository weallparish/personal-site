let buttons = document.querySelectorAll(".project button")

for (var i = 0; i < buttons.length; i++) {
    let collapsibleClass = buttons[i].className.split(" ")[1];
    let collapsibleID = -1;
    if (collapsibleClass) collapsibleID = collapsibleClass.split("-")[1];

    buttons[i].addEventListener("click", (event) => {
        // close any open collapsibles in this row
        let startIndex = Math.floor(collapsibleID/3) * 3;
        for (var j = startIndex; j < startIndex + 3; j++) {
            if (j == collapsibleID) continue;

            let collapsiblesToOpen = document.getElementsByClassName("project collapsed collapsible-" + j);
            for (var k = 0; k < collapsiblesToOpen.length; k++) {
                let newClasses = collapsiblesToOpen[k].className.replace("collapsed","uncollapsed");
                collapsiblesToOpen[k].setAttribute("class",newClasses);
            }

            let collapsiblesToClose = document.getElementsByClassName("detailed-project uncollapsed collapsible-" + j);
            for (var k = 0; k < collapsiblesToClose.length; k++) {
                let newClasses = collapsiblesToClose[k].className.replace("uncollapsed","collapsed");
                collapsiblesToClose[k].setAttribute("class",newClasses);
            }
            

            let buttonsToChange = document.querySelectorAll("button.collapsible-" + j);
            if (buttonsToChange.length > 0) {
                buttonsToChange[0].textContent = "Read More";
            }
            
        }

        

        // get all current collapsible states so they can be toggled.
        let collapsiblesToOpen = [].slice.call(document.getElementsByClassName("collapsed " + collapsibleClass),0);
        let collapsiblesToClose = [].slice.call(document.getElementsByClassName("uncollapsed " + collapsibleClass),0);

        for (var j = 0; j < collapsiblesToOpen.length; j++) {
            let newClasses = collapsiblesToOpen[j].className.replace("collapsed","uncollapsed");
            collapsiblesToOpen[j].setAttribute("class",newClasses);
        }
        
        for (var j = 0; j < collapsiblesToClose.length; j++) {
            let newClasses = collapsiblesToClose[j].className.replace("uncollapsed","collapsed");
            collapsiblesToClose[j].setAttribute("class",newClasses);
        }

        if (event.target.textContent == "Read More") {
            event.target.textContent = "Show Less";
        }
        else {
            event.target.textContent = "Read More";
        }
    });
}



        