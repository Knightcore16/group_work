document.addEventListener('DOMContentLoaded', function () {
    const courseReps = [
        // Course reps
        {
            fullName: "JOHN AFRIYIE ODURO",
            ID: "4121220303CR",
            program: "BCE-level 300",
            phone: "+233244000001"
        },
        {
            fullName: "ELEAZER NTIAMOAH OPARE",
            ID: "4111220140CR",
            program: "BTE-level 200",
            phone: "+233244000001"
        },
        {
            fullName: "RALPH TETTEH",
            ID: "4111220077CR",
            program: "BIT-level 300",
            phone: "+233244000001"
        },
        {
            fullName: "KELVIN AVORNYOTSE",
            ID: "4111220140CR",
            program: "BEE-level 300",
            phone: "+233244000001"
        },
        {
            fullName: "EMMANUELLA NATASHA ELLIE",
            ID: "4121220312CR",
            program: "DIT-level 200",
            phone: "+233244000001"
        },
    ];

    const staffs = [
        // Staff
        {
            fullName: "Claude Odoi",
            ID: "5111220077ST",
            staffdept: "Conference-Room-1",
            phone: "+233244000001"
        },
        {
            fullName: "Bernard Asante",
            ID: "5111220077ST",
            staffdept: "Conference-Room-2",
            phone: "+233244000001"
        },
    ];

    const form = document.getElementById('access-form');
    const idInput = document.getElementById('id-input');
    const keyId = document.getElementById('keyID');
    const message = document.getElementById('message');
    const staffmessage = document.getElementById('staffmessage');
    let records = JSON.parse(localStorage.getItem('records')) || [];
    let records1 = JSON.parse(localStorage.getItem('records1')) || [];

    function removeKeyFromSelect(key) {
        const options = keyId.querySelectorAll('option');
        options.forEach(option => {
            if (option.value === key) {
                option.remove();
            }
        });
    }

    function isKeyTaken(key) {
        return records.some(record => record.keys === key) || records1.some(record => record.keys === key);
    }

    function hasSamePersonTakenAnyKey(id) {
        return records.some(record => record.id === id) || records1.some(record => record.id === id);
    }

    function populateAvailableKeys() {
        const allKeys = [
            'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'G7', 
            'Conference-Room-1', 'Conference-Room-2'
        ];
        const takenKeys = [...records, ...records1].map(record => record.keys);
        const availableKeys = allKeys.filter(key => !takenKeys.includes(key));
        
        keyId.innerHTML = '';
        availableKeys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            keyId.appendChild(option);
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const id = idInput.value.trim();
        const keys = keyId.value.trim();
        const courseRep = courseReps.find(rep => rep.ID === id);
        const staff = staffs.find(con => con.ID === id);

        if (isKeyTaken(keys)) {
            message.textContent = 'Access Denied: Key has already been taken!';
            message.style.color = 'red';
            return;
        }

        if (hasSamePersonTakenAnyKey(id)) {
            message.textContent = 'Access Denied: Please return the current key before requesting a new one!';
            message.style.color = 'red';
            return;
        }

        if (courseRep) {
            if (keys.toLowerCase().startsWith('conference-room')) {
                message.textContent = 'Access Denied: Course reps cannot access Staff Keys!';
                message.style.color = 'red';
            } else {
                const time = new Date().toLocaleString();
                records.unshift({ id, time, keys, fullname: courseRep.fullName, phone: courseRep.phone, program: courseRep.program });
                localStorage.setItem('records', JSON.stringify(records));
                populateAvailableKeys();
                message.textContent = `Access Granted: You have successfully taken a key.`;
                message.style.color = 'green';
            }
        } else if (staff) {
            const time = new Date().toLocaleString();
            records1.unshift({ id, time, keys, sfullname: staff.fullName, sphone: staff.phone, dept: staff.staffdept });
            localStorage.setItem('records1', JSON.stringify(records1));
            populateAvailableKeys();
            staffmessage.textContent = `Access Granted: You have successfully taken a key.`;
            staffmessage.style.color = 'green';
        } else {
            message.textContent = 'Access Denied: Unauthorized ID!!!';
            message.style.color = 'red';
        }

        idInput.value = '';
        keyId.value = '';
    });

    populateAvailableKeys();
});
