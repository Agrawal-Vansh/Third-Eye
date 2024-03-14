document.getElementById("rideForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var datetime = document.getElementById("datetime").value;

    // Update map with the new route
    calculateAndDisplayRoute(from, to);

    // Add the ride to the table
    addRideToTable(from, to, datetime);
});

function calculateAndDisplayRoute(start, end) {
    // Code for calculating and displaying route...
}

function addRideToTable(from, to, datetime) {
    var table = document.getElementById("ridesTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    cell1.innerHTML = from;
    cell2.innerHTML = to;
    cell3.innerHTML = datetime;
}