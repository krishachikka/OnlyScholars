const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.loginlink');
const btnPopup = document.querySelector('.registerbtn');
const iconClose = document.querySelector('.close');

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// Function to toggle a specific popup by its ID
function togglePopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup.style.display === "block") {
        popup.style.display = "none";
    } else {
        popup.style.display = "block";
    }
}

// Close the pop-up if the user clicks outside of it
window.onclick = function(event) {
    var popups = document.getElementsByClassName("popup");
    for (var i = 0; i < popups.length; i++) {
        if (event.target == popups[i]) {
            popups[i].style.display = "none";
        }
    }
}