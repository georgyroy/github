import { useState } from "react";
import PrayerOfDay from "./components/PrayerOfDay";
import ScriptureOfDay from "./components/ScriptureOfDay";
import PrayerRequests from "./components/PrayerRequests";
import "./App.css";

const TABS = [
  { id: "prayer", label: "Prayer", icon: "✝" },
  { id: "scripture", label: "Scripture", icon: "✦" },
  { id: "requests", label: "Requests", icon: "🙏" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("prayer");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-brand">
            <div className="app-brand-cross">✝</div>
            <div>
              <div className="app-brand-name">Daily Grace</div>
              <div className="app-brand-date">{today}</div>
            </div>
          </div>
        </div>
      </header>

      <nav className="app-nav">
        <div className="app-nav-inner">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`app-tab ${activeTab === tab.id ? "app-tab--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="app-tab-icon">{tab.icon}</span>
              <span className="app-tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="app-main">
        <div className="app-content">
          {activeTab === "prayer" && <PrayerOfDay />}
          {activeTab === "scripture" && <ScriptureOfDay />}
          {activeTab === "requests" && <PrayerRequests />}
        </div>
      </main>

      <footer className="app-footer">
        <p className="app-footer-text">
          &ldquo;Your word is a lamp to my feet and a light to my path.&rdquo; &mdash; Psalm 119:105
        </p>
      </footer>
    </div>
  );
}
