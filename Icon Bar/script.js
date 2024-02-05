document.querySelector(".container")
.addEventListener("click", function() {
    let iconBar = document.querySelector(".icon-bar");
    if (iconBar.style.display === "none") {
       iconBar.style.display = "block";
    } else {
        iconBar.style.display = "none";
    }
});