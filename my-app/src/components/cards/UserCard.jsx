
const UserCard = ( { user } ) => {

  if (!user) {
    return <div className="text-sm text-muted">No user saved</div>;
  }

  
  return (
    <div>
      { user.name }
      { user.category }
    </div>
  )
}

export default UserCard