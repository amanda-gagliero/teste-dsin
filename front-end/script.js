async function loadUsers() {
    const res = await fetch('http://localhost:3000/users');
    const users = await res.json();
    
    if (users.length === 0) {
        document.getElementById('user_id').innerHTML = `<option disabled selected>Nenhum cliente cadastrado</option>`;
    } else {
        document.getElementById('user_id').innerHTML = users.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
    }
}

async function addUser() {
    const name = document.getElementById('client_name').value;
    const email = document.getElementById('client_email').value;

    if (!name || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    });

    alert("Cliente cadastrado!");
    loadUsers();
}

async function loadAppointments() {
    const res = await fetch('http://localhost:3000/appointments');
    const appointments = await res.json();
    
    document.getElementById('appointmentList').innerHTML = appointments.map(a => `
        <tr>
            <td>${a.name}</td>
            <td>${a.service}</td>
            <td>${a.date}</td>
            <td>${a.status}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editAppointment(${a.id}, '${a.service}', '${a.date}')">Editar</button>
                <button class="cancel-btn" onclick="deleteAppointment(${a.id})">Cancelar</button>
            </td>
        </tr>
    `).join('');
}

async function addAppointment() {
    const user_id = document.getElementById('user_id').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;

    if (!service || !date) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    await fetch('http://localhost:3000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, service, date })
    });

    alert("Agendamento realizado com sucesso!");
    loadAppointments();
}

// Editar um agendamento
async function editAppointment(id, oldService, oldDate) {
    const newService = prompt("Digite o novo serviço:", oldService);
    const newDate = prompt("Digite a nova data (AAAA-MM-DD):", oldDate);

    if (!newService || !newDate) {
        alert("Edição cancelada.");
        return;
    }

    const res = await fetch(`http://localhost:3000/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: newService, date: newDate })
    });

    if (res.status === 400) {
        alert(await res.text());
    } else {
        alert("Agendamento atualizado com sucesso!");
    }
    loadAppointments();
}

// Cancelar um agendamento
async function deleteAppointment(id) {
    if (!confirm("Tem certeza que deseja cancelar este agendamento?")) return;

    await fetch(`http://localhost:3000/appointments/${id}`, {
        method: 'DELETE'
    });

    alert("Agendamento cancelado com sucesso!");
    loadAppointments();
}

loadUsers();
loadAppointments();
