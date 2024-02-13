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
window.onclick = function (event) {
    var popups = document.getElementsByClassName("popup");
    for (var i = 0; i < popups.length; i++) {
        if (event.target == popups[i]) {
            popups[i].style.display = "none";
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const courseSelect = document.getElementById('courseSelect');
    const countrySelect = document.getElementById('countrySelect');
    const scholarshipResults = document.getElementById('scholarship-results');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const country = countrySelect.value;
        const course = courseSelect.value;

        //use AJAX to fetch the results
        fetch('/search', {
            method: 'POST',
            body: JSON.stringify({ country, course }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                scholarshipResults.innerHTML = '';
                data.scholarships.forEach(scholarship => {
                    const scholarshipBox = document.createElement('div');
                    scholarshipBox.className = 'scholarship-box';
                    scholarshipBox.innerHTML = `
                        <b>${scholarship.ScholarshipName}</b>
                        <p>Country: ${scholarship.Country}</p>
                        <p>Reward: ${scholarship.Reward}</p>
                        <button class="view-button" data-scholarship-id="${scholarship.ID}">View</button>
                    `;
                    scholarshipResults.appendChild(scholarshipBox);
                });

                document.querySelectorAll('.view-button').forEach(button => {
                    button.addEventListener('click', function () {
                        const scholarshipID = this.getAttribute('data-scholarship-id');
                        // Redirect to details page
                        window.location.href = `/view-scholarship?id=${scholarshipID}`;
                    });
                });
            })
            .catch(error => console.error('Error fetching search results:', error));
    });
});