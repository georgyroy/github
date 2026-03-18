import { useState } from "react";
import "./PrayerRequests.css";

const STORAGE_KEY = "devotional_prayer_requests";

function loadRequests() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveRequests(requests) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  } catch {}
}

export default function PrayerRequests() {
  const [requests, setRequests] = useState(loadRequests);
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState("all");

  function handleSubmit(e) {
    e.preventDefault();
    if (!request.trim()) return;

    const newRequest = {
      id: Date.now(),
      name: name.trim() || "Anonymous",
      text: request.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      answered: false,
    };

    const updated = [newRequest, ...requests];
    setRequests(updated);
    saveRequests(updated);
    setName("");
    setRequest("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  }

  function toggleAnswered(id) {
    const updated = requests.map((r) =>
      r.id === id ? { ...r, answered: !r.answered } : r
    );
    setRequests(updated);
    saveRequests(updated);
  }

  function deleteRequest(id) {
    const updated = requests.filter((r) => r.id !== id);
    setRequests(updated);
    saveRequests(updated);
  }

  const filtered =
    filter === "answered"
      ? requests.filter((r) => r.answered)
      : filter === "active"
      ? requests.filter((r) => !r.answered)
      : requests;

  return (
    <div className="pr-container">
      <div className="pr-header">
        <div className="pr-icon">🙏</div>
        <span className="pr-label">Prayer Requests</span>
      </div>

      <form className="pr-form" onSubmit={handleSubmit}>
        <div className="pr-form-group">
          <label className="pr-form-label" htmlFor="pr-name">
            Your Name <span className="pr-optional">(optional)</span>
          </label>
          <input
            id="pr-name"
            type="text"
            className="pr-input"
            placeholder="Anonymous"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
          />
        </div>

        <div className="pr-form-group">
          <label className="pr-form-label" htmlFor="pr-request">
            Prayer Request
          </label>
          <textarea
            id="pr-request"
            className="pr-textarea"
            placeholder="Share what's on your heart…"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            rows={4}
            maxLength={500}
          />
          <div className="pr-char-count">{request.length} / 500</div>
        </div>

        <button type="submit" className="pr-submit" disabled={!request.trim()}>
          {submitted ? "✓ Request Added" : "Submit Prayer Request"}
        </button>
      </form>

      {requests.length > 0 && (
        <div className="pr-list-section">
          <div className="pr-list-header">
            <h3 className="pr-list-title">Prayer Wall</h3>
            <div className="pr-filters">
              {["all", "active", "answered"].map((f) => (
                <button
                  key={f}
                  className={`pr-filter ${filter === f ? "pr-filter--active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="pr-empty">No {filter} requests yet.</div>
          ) : (
            <div className="pr-list">
              {filtered.map((r) => (
                <div key={r.id} className={`pr-item ${r.answered ? "pr-item--answered" : ""}`}>
                  <div className="pr-item-top">
                    <div className="pr-item-meta">
                      <span className="pr-item-name">{r.name}</span>
                      <span className="pr-item-date">{r.date}</span>
                    </div>
                    <div className="pr-item-actions">
                      <button
                        className={`pr-action ${r.answered ? "pr-action--answered" : ""}`}
                        onClick={() => toggleAnswered(r.id)}
                        title={r.answered ? "Mark as unanswered" : "Mark as answered"}
                      >
                        {r.answered ? "✓ Answered" : "Mark Answered"}
                      </button>
                      <button
                        className="pr-action pr-action--delete"
                        onClick={() => deleteRequest(r.id)}
                        title="Delete"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <p className="pr-item-text">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {requests.length === 0 && (
        <div className="pr-empty-state">
          <div className="pr-empty-icon">✝</div>
          <p className="pr-empty-text">
            Your prayer requests will appear here.<br />
            Bring your burdens to the Lord.
          </p>
        </div>
      )}
    </div>
  );
}
