import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        Productr <span>🔗</span>
      </div>
      <input className="sidebar-search" placeholder="🔍 Search" />
      <NavLink to="/home" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        🏠 <span>Home</span>
      </NavLink>
      <NavLink to="/products" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        📦 <span>Products</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
