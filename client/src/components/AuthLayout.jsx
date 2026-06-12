const AuthLayout = ({ children }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-banner">
            <div className="brand-logo">Productr 🔗</div>
            <div className="runner-card">
              <img
                src="https://images.unsplash.com/photo-1502904550040-7534597429ae?w=400"
                alt="runner"
              />
              <span>
                Uplist your
                <br />
                product to market
              </span>
            </div>
          </div>
        </div>
        <div className="auth-right">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
