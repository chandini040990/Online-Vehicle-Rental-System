import { NavLink } from "react-router-dom";

export default function UserMenu() {
  return (
    <>
      <div className="p-3 mt-2 mb-2 h4 bg-blue text-white">User Links</div>

      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item bg-orange text-white" to="/dashboard/user/profile">
            Profile
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item bg-orange text-white" to="/dashboard/user/bookings">
            Bookings
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item bg-orange text-white" to="/dashboard/user/feedback">
            Feedback
          </NavLink>
        </li>
      </ul>
    </>
  );
}
