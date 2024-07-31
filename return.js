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
    let returnrecords = JSON.parse(localStorage.getItem('returnrecords')) || [];
    let returnrecords1 = JSON.parse(localStorage.getItem('returnrecords1')) || [];
    let records = JSON.parse(localStorage.getItem('records')) || [];
    let records1 = JSON.parse(localStorage.getItem('records1')) || [];

    function addKeyToSelect(key) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        keyId.appendChild(option);
    }

    function populateTakenKeys() {
        const allKeys = [...records, ...records1].map(record => record.keys);
        keyId.innerHTML = '';
        allKeys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            keyId.appendChild(option);
        });
    }

    function isValidReturn(id, keys, records) {
        return records.some(record => record.id === id && record.keys === keys);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const id = idInput.value.trim();
        const keys = keyId.value.trim();
        const courseRep = courseReps.find(rep => rep.ID === id);
        const staff = staffs.find(dep => dep.ID === id);

        if (courseRep) {
            if (keys === 'Conference-Room-1' || keys === 'Conference-Room-2') {
                message.textContent = 'Access Denied: Course reps cannot return Staff Keys';
                message.style.color = 'red';
            } else if (isValidReturn(id, keys, records)) {
                const time = new Date().toLocaleString();
                returnrecords.unshift({ id, time, keys, fullname: courseRep.fullName, phone: courseRep.phone, room: courseRep.room });
                localStorage.setItem('returnrecords', JSON.stringify(returnrecords));
                message.textContent = `Key Returned`;
                message.style.color = 'green';

                // Remove the key from the records
                records = records.filter(record => record.keys !== keys);
                localStorage.setItem('records', JSON.stringify(records));
                populateTakenKeys();
            } else {
                message.textContent = 'Access Denied: You did not take this key!';
                message.style.color = 'red';
            }
        } else if (staff) {
            if (isValidReturn(id, keys, records1)) {
                const time = new Date().toLocaleString();
                returnrecords1.unshift({ id, time, keys, sfullname: staff.fullName, sphone: staff.phone, dept: staff.staffdept });
                localStorage.setItem('returnrecords1', JSON.stringify(returnrecords1));
                staffmessage.textContent = `Key Returned`;
                staffmessage.style.color = 'green';

                // Remove the key from the records
                records1 = records1.filter(record => record.keys !== keys);
                localStorage.setItem('records1', JSON.stringify(records1));
                populateTakenKeys();
            } else {
                staffmessage.textContent = 'Access Denied: You did not take this key!';
                staffmessage.style.color = 'red';
            }
        } else {
            message.textContent = 'Access Denied: Unauthorized ID';
            message.style.color = 'red';
        }

        idInput.value = '';
        keyId.value = '';
    });

    populateTakenKeys();
});
