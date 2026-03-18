import { prayers, getDailyIndex } from "../data/devotional";
import "./PrayerOfDay.css";

export default function PrayerOfDay() {
  const prayer = prayers[getDailyIndex(prayers.length)];

  return (
    <div className="pod-container">
      <div className="pod-header">
        <div className="pod-icon">✝</div>
        <span className="pod-label">Today's Prayer</span>
      </div>

      <div className="pod-card">
        <div className="pod-category">{prayer.category}</div>
        <h2 className="pod-title">{prayer.title}</h2>
        <div className="pod-divider" />
        <p className="pod-text">{prayer.text}</p>
      </div>

      <div className="pod-all">
        <h3 className="pod-all-title">More Prayers</h3>
        <div className="pod-list">
          {prayers.map((p, i) => (
            <div key={i} className={`pod-item ${p.title === prayer.title ? "pod-item--active" : ""}`}>
              <span className="pod-item-category">{p.category}</span>
              <span className="pod-item-title">{p.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
