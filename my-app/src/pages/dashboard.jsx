
const Dashboard = () => {

  const savedUser = JSON.parse(localStorage.getItem("user"))

  return (
    <div>
      {savedUser.name}
      {savedUser.email}
      <p>Welcome to the dashboard</p>
      <p>Age: {savedUser.age}</p>
      <p>Logged In: {savedUser.isLoggedIn ? "Yes" : "No"}</p>
    </div>
  );
};

export default Dashboard;
