// load project html into cards
window.addEventListener("DOMContentLoaded", () => {
    // For each project card, fetch the html and insert it into the card
  document.querySelectorAll(".project-card").forEach(async card => {
    const src = card.getAttribute("data-src");
    const html = await fetch(src).then(r => r.text());
    card.innerHTML = html;

    const button = card.querySelector("button");

    button.addEventListener("click", async () => {
        modal.style.display = "block";
        const modal_src = button.getAttribute("data-src");
        const modal_body = document.getElementsByClassName("modal-body")[0];
        const modal_html = await fetch(modal_src).then(r => r.text());
        modal_body.innerHTML = modal_html;
    });
  });

    // After the html is loaded, add click event listeners to each card to open the modal with the project details
    // Get the modal
    var modal = document.getElementById("modal");

    // Get the <span> element that closes the modal
    var span = document.getElementById("closeModalButton");

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }       
});

