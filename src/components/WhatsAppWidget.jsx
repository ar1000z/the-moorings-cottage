// src/components/WhatsAppWidget.jsx
import { useState, useEffect } from 'react';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  // Auto-open after 8 seconds on first visit
  useEffect(() => {
    if (!sessionStorage.getItem('wa-widget-opened')) {
      const timer = setTimeout(() => {
        if (!isOpen) {
          setIsOpen(true);
          sessionStorage.setItem('wa-widget-opened', '1');
        }
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    setShowBadge(false);
  };

  const waBase = 'https://wa.me/';
  const markNumber = '447796601576';
  const margaretNumber = '447742042031';

  const quickMessages = [
    {
      label: '🏡 Book a stay',
      href: `${waBase}${markNumber}?text=Hi%20there%2C%20I'd%20like%20to%20book%20a%20stay%20at%20The%20Moorings%20Cottage`,
    },
    {
      label: '❓ Ask a question',
      href: `${waBase}${markNumber}?text=Hi%20there%2C%20I%20have%20a%20question%20about%20The%20Moorings%20Cottage`,
    },
  ];

  return (
    <>
      <style>{`
        .wa-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Chat Box */
        .wa-chat-box {
          width: 320px;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 12px 48px rgba(0,0,0,0.18);
          overflow: hidden;
          display: none;
          flex-direction: column;
          animation: wa-slide-up 0.25s ease;
          transform-origin: bottom right;
        }
        .wa-chat-box.open {
          display: flex;
        }
        @keyframes wa-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }

        /* Header */
        .wa-header {
          background: #25D366;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .wa-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .wa-name  { font-weight: 700; color: #fff; font-size: 15px; margin: 0; }
        .wa-status { color: rgba(255,255,255,0.85); font-size: 12px; margin: 0; }
        .wa-close {
          background: none; border: none; color: rgba(255,255,255,0.8);
          cursor: pointer; font-size: 18px; margin-left: auto; padding: 0 0 0 8px;
          line-height: 1; transition: color 0.15s;
        }
        .wa-close:hover { color: #fff; }

        /* Body bubble */
        .wa-body {
          background: #f0f2f5;
          padding: 16px;
        }
        .wa-bubble {
          background: #fff;
          border-radius: 0 12px 12px 12px;
          padding: 10px 14px;
          font-size: 14px; line-height: 1.55; color: #222;
          max-width: 90%;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .wa-time {
          font-size: 11px; color: #999; text-align: right; margin-top: 4px;
        }

        /* Buttons area */
        .wa-btns {
          padding: 10px 14px 14px;
          background: #f0f2f5;
          display: flex; flex-direction: column; gap: 7px;
        }
        .wa-section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: #aaa; padding: 4px 0 2px;
        }
        .wa-btn {
          border-radius: 20px;
          padding: 8px 14px;
          font-size: 13px; font-weight: 600;
          cursor: pointer; text-align: center;
          transition: background 0.2s, color 0.2s;
          text-decoration: none; display: block;
        }
        .wa-btn-green {
          background: #fff;
          border: 1.5px solid #25D366;
          color: #128C7E;
        }
        .wa-btn-green:hover { background: #25D366; color: #fff; }

        .wa-btn-violet {
          background: #fff;
          border: 1.5px solid #7c3aed;
          color: #7c3aed;
        }
        .wa-btn-violet:hover { background: #7c3aed; color: #fff; }

        .wa-btn-blue {
          background: #fff;
          border: 1.5px solid #2563eb;
          color: #2563eb;
        }
        .wa-btn-blue:hover { background: #2563eb; color: #fff; }

        .wa-btn-email {
          background: #fff;
          border: 1.5px solid #e5e7eb;
          color: #374151;
        }
        .wa-btn-email:hover { background: #f9fafb; border-color: #d1d5db; }

        /* Toggle button */
        .wa-toggle {
          width: 60px; height: 60px; border-radius: 50%;
          background: #25D366;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: none;
          box-shadow: 0 4px 20px rgba(37,211,102,0.45);
          transition: transform 0.2s, background 0.2s;
          position: relative;
        }
        .wa-toggle:hover { background: #20ba5a; transform: scale(1.08); }
        .wa-toggle svg { transition: opacity 0.2s; }

        .wa-badge {
          position: absolute; top: -4px; right: -4px;
          width: 18px; height: 18px; background: #ea580c;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; color: #fff; border: 2px solid #fff;
        }

        @media (max-width: 360px) {
          .wa-chat-box { width: 290px; }
          .wa-widget { right: 12px; bottom: 12px; }
        }
      `}</style>

      <div className="wa-widget">
        {/* Chat panel */}
        <div className={`wa-chat-box${isOpen ? ' open' : ''}`}>

          {/* Header */}
          <div className="wa-header">
            <div className="wa-avatar">🏡</div>
            <div>
              <p className="wa-name">The Moorings Cottage</p>
              <p className="wa-status">💬 Typically replies quickly</p>
            </div>
            <button className="wa-close" onClick={toggleWidget} aria-label="Close">✕</button>
          </div>

          {/* Bubble */}
          <div className="wa-body">
            <div className="wa-bubble">
              Hi there, How would you like to get in touch?
              <div className="wa-time">Just now</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="wa-btns">
            <p className="wa-section-label">Message us</p>
            {quickMessages.map((btn) => (
              <a key={btn.label} className="wa-btn wa-btn-green" href={btn.href} target="_blank" rel="noopener noreferrer">
                {btn.label}
              </a>
            ))}

            <p className="wa-section-label" style={{ marginTop: 4 }}>Other ways</p>

            {/* Book via calendar */}
            <a
              className="wa-btn wa-btn-violet"
              href="https://secure.bookalet.co.uk/widget?id=da8ebdf5-2f4a-47cb-8c92-f84032b16f5b&property=17263&monthcount=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              📅 Book via calendar
            </a>

            {/* Call / WhatsApp Mark */}
            <a
              className="wa-btn wa-btn-blue"
              href={`${waBase}${markNumber}?text=Hi%20there%2C%20I%20have%20an%20enquiry%20about%20The%20Moorings%20Cottage`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📞 WhatsApp Mark: +44 (0)7796 601576
            </a>

            {/* Call / WhatsApp Margaret */}
            <a
              className="wa-btn wa-btn-blue"
              href={`${waBase}${margaretNumber}?text=Hi%20there%2C%20I%20have%20an%20enquiry%20about%20The%20Moorings%20Cottage`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📞 WhatsApp Margaret: +44 (0)7742 042031
            </a>

            {/* Email */}
            <a
              className="wa-btn wa-btn-email"
              href="mailto:themooringscottage@gmail.com"
            >
              ✉️ themooringscottage@gmail.com
            </a>
          </div>
        </div>

        {/* Toggle FAB */}
        <button className="wa-toggle" onClick={toggleWidget} aria-label={isOpen ? 'Close contact options' : 'Open contact options'}>
          {showBadge && !isOpen && <span className="wa-badge">1</span>}
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16 2C8.268 2 2 8.268 2 16c0 2.425.638 4.703 1.756 6.676L2 30l7.524-1.732A13.946 13.946 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" fill="#fff"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M16 4.5C9.649 4.5 4.5 9.649 4.5 16c0 2.196.628 4.247 1.717 5.983l.285.454-.944 3.455 3.544-.93.44.262A11.46 11.46 0 0016 27.5c6.351 0 11.5-5.149 11.5-11.5S22.351 4.5 16 4.5zm-4.51 6.232c.198 0 .414.008.596.013.198.006.463-.075.726.554.272.652.921 2.252 1.003 2.415.082.163.136.354.027.571-.109.217-.163.354-.326.545-.163.19-.342.425-.489.571-.163.163-.333.34-.143.666.19.326.845 1.394 1.814 2.258 1.245 1.109 2.296 1.452 2.622 1.615.326.163.516.136.706-.082.19-.217.815-.952 1.032-1.278.217-.326.434-.272.734-.163.299.109 1.897.895 2.223 1.058.326.163.543.245.625.381.082.136.082.788-.19 1.549-.273.761-1.605 1.496-2.176 1.55-.57.054-1.086.245-3.64-.761-3.07-1.222-5.007-4.362-5.16-4.552-.152-.19-1.25-1.658-1.25-3.17 0-1.51.788-2.25 1.087-2.562.299-.312.652-.39.869-.39z" fill="#25D366"/>
            </svg>
          )}
        </button>
      </div>
    </>
  );
};

export default WhatsAppWidget;
