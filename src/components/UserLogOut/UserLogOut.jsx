import './UserLogOut.css';
import { logOut } from '../../utilities/users-service';

export default function UserLogOut({ user, setUser }) {
  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <div className="UserLogOut">
      <div>
        <span>{user.name}</span> &nbsp; 
        <span className="email">{user.email}</span> 
      </div>
      <button className="btn-sm"  onClick={handleLogOut}>LOG OUT</button>
    </div>
  );
}
