import { NavLink } from "react-router-dom";

export default function OwnerMenu() {
  return (
    <>
      <div className="p-3 mt-2 mb-2 h4 bg-blue text-white">Vehicle Owner Links</div>

      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item bg-orange text-white" to="/dashboard/owner/profile">
            Profile
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item bg-orange text-white" to="/dashboard/owner/bookings">
            Bookings
          </NavLink>
        </li>
      </ul>
    </>
  );
}
