const form = document.getElementById("userForm");
const table = document.getElementById("userTable");
let editId = null;

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    try {
        if (editId) {
            await axios.put(`https://crud-user-app-adsk.onrender.com/${editId}`, {
                name: name,
                email: email
            });

            alert("User Updated Successfully");
            editId = null;
        } else {
            await axios.post("https://crud-user-app-adsk.onrender.com/users", {
                name: name,
                email: email
            });

            alert("User Added Successfully");
        }

        form.reset();
        await getUsers();
    } catch (error) {
        console.log(error);
        alert("Error saving user");
    }
});

async function getUsers() {
    try {
        const response = await axios.get("https://crud-user-app-adsk.onrender.com");

        table.innerHTML = "";

        response.data.forEach((user) => {
            table.innerHTML += `
<tr>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>
        <button type="button" onclick="editUser('${user._id}', '${user.name}', '${user.email}')">
    Edit
</button>
       <button type="button" onclick="deleteUser('${user._id}')">
    Delete
</button>
    </td>
</tr>
`;
        });
    } catch (error) {
        console.log(error);
    }
}

async function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) {
        return;
    }

    try {
        await axios.delete(`https://crud-user-app-adsk.onrender.com/${id}`);
        alert("User Deleted Successfully");
        await getUsers();
    } catch (error) {
        console.log(error);
        alert("Error deleting user");
    }
}

function editUser(id, name, email) {

    console.log("Edit Clicked");
    alert("Edit Clicked");

    document.getElementById("name").value = name;
    document.getElementById("email").value = email;

    editId = id;
}
getUsers();