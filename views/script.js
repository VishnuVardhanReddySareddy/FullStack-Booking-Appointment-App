

document
  .getElementById("appointmentForm")
  .addEventListener("submit", handleFormSubmit);

window.addEventListener("DOMContentLoaded", (event) => {
  fetchUsers();
});

function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  axios
    .post("http://localhost:3000/users", userDetails)
    .then((response) => {
      console.log("Success:", response.data);
      displayUserOnScreen(response.data.user);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  
  event.target.reset();
}

function fetchUsers() {
  axios
    .get("http://localhost:3000/users")
    .then((response) => {
      response.data.forEach((user) => displayUserOnScreen(user));
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}

function displayUserOnScreen(user) {
  const userList = document.getElementById("userList");
  const userItem = document.createElement("li");
  userItem.id = `user-${user.id}`;
  userItem.innerHTML = `${user.username} - ${user.email} - ${user.phone} 
        <button onclick="editUser('${user.id}')">Edit</button>
        <button onclick="deleteUser('${user.id}')">Delete</button>`;
  userList.appendChild(userItem);
}

function deleteUser(userId) {
  axios
    .delete(`http://localhost:3000/users/${userId}`)
    .then((response) => {
      console.log("Deleted:", response.data);
      document.getElementById(`user-${userId}`).remove();
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

function editUser(userId) {
  axios
    .get(`http://localhost:3000/users/${userId}`)
    .then((response) => {
      const user = response.data;
      document.getElementById("username").value = user.username;
      document.getElementById("email").value = user.email;
      document.getElementById("phone").value = user.phone;
      deleteUser(userId);
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
    });
}
