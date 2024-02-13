const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.registerlink');
const btnPopup = document.querySelector('.loginbtn');
const iconClose = document.querySelector('.close');


registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
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