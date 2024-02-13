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

function toggleTermsAndConditions() {
    const termsAndConditionsDiv = document.getElementById("termsAndConditions");
    if (termsAndConditionsDiv.style.display === "none" || termsAndConditionsDiv.style.display === "") {
        termsAndConditionsDiv.style.display = "block";
    } else {
        termsAndConditionsDiv.style.display = "none";
    }
}
