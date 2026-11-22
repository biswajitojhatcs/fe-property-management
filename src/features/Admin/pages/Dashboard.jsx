import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { fetchDashboardData } from "../store/dashboardSlice";
import KpiCard from "../components/KpiCard";
import "../admin.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, role } = useSelector((state) => state.auth);
  const { kpis, recentTenants, loading, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin-wrapper">
      <nav className="admin-navbar">
        <div className="admin-brand">Tenant Admin Panel</div>
        <div className="admin-nav-right">
          <span>{user?.email}</span>
          <span className="admin-badge">{role}</span>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="admin-content">
        <h1 className="admin-heading">Dashboard Overview</h1>

        {loading && <p>Loading dashboard data...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <>
            <div className="kpi-grid">
              {kpis.map((kpi) => (
                <KpiCard
                  key={kpi.id}
                  title={kpi.title}
                  value={kpi.value}
                  subtitle={kpi.subtitle}
                  isAlert={kpi.isAlert}
                />
              ))}
            </div>

            <div className="admin-card">
              <h3>Recent Tenant Rent Status</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Tenant</th>
                    <th>Unit</th>
                    <th>Monthly Rent</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTenants.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.unit}</td>
                      <td>{item.rent}</td>
                      <td
                        className={
                          item.status === "Paid" ? "status-paid" : "status-due"
                        }
                      >
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;