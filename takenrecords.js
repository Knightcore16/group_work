document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('access-form');
    const idInput = document.getElementById('id-input');
    const keyId = document.getElementById('keyID');
    const message = document.getElementById('message');
    // const recordsList = document.getElementById('records-list');
    let records = JSON.parse(localStorage.getItem('records')) || [];
    let records1 = JSON.parse(localStorage.getItem('records1')) || [];

    function loadRecords() {
        const recordsList = document.getElementById('records-list');
        recordsList.innerHTML = '';
        records.sort((a, b) => new Date(b.timeTaken) - new Date(a.timeTaken));
    
        records.forEach(record => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ID: ${record.id}<br>
                Name: ${record.fullname}<br>
                Class: ${record.program}<br>
                Phone: ${record.phone}<br>
                Key: ${record.keys}<br>
                Time Taken: ${record.time}<br>
            `;
            recordsList.appendChild(listItem);
        });
    }    
    function loadRecords1() {
        const recordsList2 = document.getElementById('records-list2');
        recordsList2.innerHTML = '';
        records1.sort((a, b) => new Date(b.timeTaken) - new Date(a.timeTaken));
    
        records1.forEach(record => {
            const listItem1 = document.createElement('li');
            listItem1.innerHTML = `
                ID: ${record.id}<br>
                Name: ${record.sfullname}<br>
                Dept: ${record.dept}<br>
                Phone: ${record.sphone}<br>
                Key: ${record.keys}<br>
                Time Taken: ${record.time}<br>
            `;
            recordsList2.appendChild(listItem1);
        });
    }
    
    document.getElementById('back-button').addEventListener('click', function () {
        window.location.href = 'index.html';
    });
    
    loadRecords();
    loadRecords1();
});

function clearRecords() {
    if (confirm('Are you sure you want to clear?')) {
        console.log('Clearing records');
        localStorage.removeItem('records');
        localStorage.removeItem('records1');
        window.location.href = 'keytakenrecords.html';
    } else {
        console.log('Cancel clicked');
        window.location.href = 'keytakenrecords.html';
    }
}