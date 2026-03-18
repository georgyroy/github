import { scriptures, getDailyIndex } from "../data/devotional";
import "./ScriptureOfDay.css";

export default function ScriptureOfDay() {
  const scripture = scriptures[getDailyIndex(scriptures.length)];

  return (
    <div className="sod-container">
      <div className="sod-header">
        <div className="sod-icon">✦</div>
        <span className="sod-label">Scripture of the Day</span>
      </div>

      <div className="sod-card">
        <div className="sod-theme">{scripture.theme}</div>
        <blockquote className="sod-verse">
          <span className="sod-quote-mark">"</span>
          {scripture.verse}
          <span className="sod-quote-mark">"</span>
        </blockquote>
        <div className="sod-reference">{scripture.reference}</div>
      </div>

      <div className="sod-reflection-card">
        <div className="sod-reflection-label">Reflection</div>
        <p className="sod-reflection-text">{scripture.reflection}</p>
      </div>

      <div className="sod-all">
        <h3 className="sod-all-title">This Week's Verses</h3>
        <div className="sod-list">
          {scriptures.map((s, i) => (
            <div key={i} className={`sod-item ${s.reference === scripture.reference ? "sod-item--active" : ""}`}>
              <div className="sod-item-inner">
                <span className="sod-item-theme">{s.theme}</span>
                <span className="sod-item-ref">{s.reference}</span>
              </div>
              <p className="sod-item-snippet">
                {s.verse.length > 80 ? s.verse.slice(0, 78) + "…" : s.verse}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
