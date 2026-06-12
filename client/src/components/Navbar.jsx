const Navbar = ({ title, showSearch }) => {
  return (
    <div className="topbar">
      <div className="topbar-title">{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {showSearch && (
          <input className="topbar-search" placeholder="🔍 Search Services, Products" />
        )}
        <span className="avatar" />
        <span style={{ color: "#6b7280", fontSize: 12 }}>▾</span>
      </div>
    </div>
  );
};

export default Navbar;
