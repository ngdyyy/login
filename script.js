const loginForm = document.getElementById('login-form')
const emailLogin = document.getElementById('login-email')
const passwordLogin = document.getElementById('login-password')
const loginBtn = document.getElementById('loginbtn')

const userForm = document.getElementById('user-form')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const roleInput = document.getElementById('role')
const addbtn = document.getElementById('addbtn')
const logoutbtn = document.getElementById('logout')
const error = document.getElementById('error')

const table = document.getElementById('table')
const userTable = document.getElementById('user-table')

let users = [];

if (userForm) {
    userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = {
        name: nameInput.value,
        email: emailInput.value,
        role: roleInput.value
    };

    users.push(user);
    renderTable();
    userForm.reset();
});
}

if (userTable) {
    function renderTable() {
    userTable.innerHTML = '';

    users.forEach((u, index) => {
        userTable.innerHTML += `
        <tr>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
            <td>
               <button onclick = "editUser(${index})">Edit</button>
               <button onclick = "deleteUser(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
};
}


function deleteUser(index) {
    const confirmDelete = confirm('Are you sure about that?');
    if (confirmDelete) {
        users.splice(index, 1);
        renderTable();
    }
    else {
        return;
    }
}

function editUser(index) {
    const u = users[index];
    nameInput.value = u.name;
    emailInput.value = u.email;
    roleInput.value = u.role;

    addbtn.textContent = 'Update';
    addbtn.onclick = function(e) {
        e.preventDefault();
        users[index] = {
            name: nameInput.value,
            email: emailInput.value,
            role: roleInput.value
        };

        renderTable();
        addbtn.textContent = 'Add';
        userForm.reset();
        renderTable();
        addbtn.onclick = null;
    };
};

let isLoggedIn = localStorage.getItem('isLoggedIn');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (emailLogin.value === 'admin@example.com' && passwordLogin.value === '123456') {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'admin.html';
        }
        else {
            error.textContent = 'Incorrect email or password';
        }
    });
}

if (window.location.pathname.includes('admin.html') && !isLoggedIn) {
    window.location.href = 'login.html';
}

if (logoutbtn) {
    logoutbtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    });
}