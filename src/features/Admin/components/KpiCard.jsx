const KpiCard = ({ title, value, subtitle, isAlert = false }) => {
  return (
    <div className="kpi-card">
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{value}</div>
      <div className={`kpi-sub ${isAlert ? "kpi-alert" : ""}`}>{subtitle}</div>
    </div>
  );
};

export default KpiCard;