document.addEventListener("DOMContentLoaded", function () {
    activateDropdownMenu();
    activateButtonEffects();
});

function activateDropdownMenu() {
    let dropdown = document.querySelector(".dropdown");
    let dropdownContent = document.querySelector(".dropdown-content");

    if (dropdown && dropdownContent) {
        dropdown.addEventListener("mouseenter", function () {
            dropdownContent.style.display = "block";
        });

        dropdown.addEventListener("mouseleave", function () {
            dropdownContent.style.display = "none";
        });

        dropdownContent.querySelectorAll("a").forEach(item => {
            item.addEventListener("click", function () {
                dropdownContent.style.display = "none";
            });
        });
    }
}

function activateButtonEffects() {
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));

            this.classList.add("active");
        });
    });
}
