const buttons = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.project-card');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('filter');
        buttons.forEach(button => button.classList.remove('selected'));
        btn.classList.add('selected');

        cards.forEach(card => {
            const tags = card.getElementsByClassName("tag");
            console.log(tags);

            if (filter == "all" || Array.from(tags).some(tag => tag.classList.contains(filter))) {
                card.style.display = "flex";
            }
            else {
                card.style.display = "none";
            }
        });
    });
});