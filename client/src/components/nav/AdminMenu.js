import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  return (
    <>
      <div className="p-3 mt-2 mb-2 h4 text-white bg-blue">Admin Links</div>

      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item text-white bg-orange" to="/dashboard/admin/category">
            Create category
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item text-white bg-orange" to="/dashboard/admin/product">
            Create product
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item text-white bg-orange" to="/dashboard/admin/products">
            Products
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item text-white bg-orange" to="/dashboard/admin/bookings">
            Manage Bookings
          </NavLink>
        </li>
      </ul>
    </>
  );
}
