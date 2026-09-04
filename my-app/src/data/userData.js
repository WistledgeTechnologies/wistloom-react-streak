const user = {
    name: "Victor Tamunoibuomi",
    age: 40,
    email: "victortamunoibuomi07@gmail.com",
    isLoggedIn: true
}

localStorage.setItem("user", JSON.stringify(user))

export default user;