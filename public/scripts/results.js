// Simulated scholarships data
const scholarships = []; // Replace this with your actual data

const scholarshipResults = document.querySelector('.scholarship-boxes');
const noScholarshipsMessage = document.getElementById('no-scholarships');

if (scholarships.length === 0) {
    scholarshipResults.style.display = 'none';  // Hide the scholarship results
    noScholarshipsMessage.style.display = 'block';  // Show the "No scholarships found" message
} else {
    scholarshipResults.style.display = 'block';  // Show the scholarship results
    noScholarshipsMessage.style.display = 'none';  // Hide the "No scholarships found" message
}
