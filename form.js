document.getElementById('truckForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual form submission

    const trucksData = [];
    const truckModels = document.querySelectorAll('input[name="truckModel"]');
    const truckCategories = document.querySelectorAll('select[name="truckCategory"]');
    const charges = document.querySelectorAll('input[name="charges"]');
    const mobileNos = document.querySelectorAll('input[name="mobileNo"]');

    truckModels.forEach((model, index) => {
        trucksData.push({
            truckModel: model.value,
            truckCategory: truckCategories[index].value,
            charges: charges[index].value,
            mobileNo: mobileNos[index].value,
        });
    });

    // Assuming the clearPreviousEntries function is defined to clear the table before adding new entries
    clearPreviousEntries();
    updateTable(trucksData);
});

function updateTable(trucksData) {
    const table = document.getElementById('trucksTable');
    const tbody = table.getElementsByTagName('tbody')[0];
    
    trucksData.forEach(truck => {
        const row = tbody.insertRow();
        Object.values(truck).forEach(text => {
            const cell = row.insertCell();
            cell.textContent = text;
        });
    });

    table.style.display = 'table'; // Make sure the table is visible
}

function clearPreviousEntries() {
    const tbody = document.getElementById('trucksTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear the table body to remove previous entries
}

document.getElementById('addMoreTrucks').addEventListener('click', function() {
    // Your existing logic for adding more trucks fields
});

