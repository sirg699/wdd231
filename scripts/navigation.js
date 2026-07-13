const hamburger = document.querySelector(".hamburger");
const navigation = document.querySelector(".navigation");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("show");
    navigation.classList.toggle("show");
});