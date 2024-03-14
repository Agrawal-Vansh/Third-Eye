document.getElementById("rideForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var datetime = document.getElementById("datetime").value;

    // Simulate booking process (can be replaced with actual API call)
    alert("Ride booked from " + from + " to " + to + " at " + datetime);
    
    // Clear form fields
    document.getElementById("rideForm").reset();
});