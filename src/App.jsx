import { useState, useEffect } from 'react';
import './App.css';
import hanoiNormal from './assets/hanoi_normal.png';
import hanoiRising from './assets/hanoi_rising.png';
import hanoiFlood from './assets/hanoi_flood.png';

const steps = [
  {
    id: 1,
    title: "1. Detection (Meraki MV72)",
    desc: "AI-powered Virtual Gauge detects rising water levels.",
    log: "Meraki MV72: Initializing Virtual Gauge... Monitoring Pixel delta..."
  },
  {
    id: 2,
    title: "2. Monitoring (ThousandEyes)",
    desc: "Real-time network path analysis detects infrastructure failure.",
    log: "ThousandEyes: Scanning Digital Highway... Latency spike detected on Node B."
  },
  {
    id: 3,
    title: "3. Analysis (Splunk)",
    desc: "Correlation of sensor data and weather APIs for risk prediction.",
    log: "Splunk: Received Data. Rising Rate > 30% vs History. CRITICAL ALERT."
  },
  {
    id: 4,
    title: "4. Execution (Agentic AI)",
    desc: "Autonomous SD-WAN rerouting to Starlink satellite network.",
    log: "Agentic AI: Primary WAN Unstable. Switching context... Rerouting via Starlink."
  },
  {
    id: 5,
    title: "5. Rescue (Solution)",
    desc: "Person detection coordinates sent to rescue teams.",
    log: "System: Connection Restored. Person Detected at Sector 4. Coordinates sent."
  }
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState(["System Initialized. Scanning..."]);
  const [waterLevel, setWaterLevel] = useState(20); // %
  const [monitorStatus, setMonitorStatus] = useState('connecting'); // connecting, failed

  const nextStep = () => {
    if (currentStep < 5) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);

      const stepData = steps[nextStepIndex - 1];
      if (stepData) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${stepData.log}`]);
      }
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setLogs(["System Initialized. Re-scanning..."]);
    setWaterLevel(20);
  };

  useEffect(() => {
    // Step specific logic
    if (currentStep === 1) {
      // Manual trigger mode: Water level is controlled by the user via the 'RAIN' button.
      // Auto-rise interval removed.
    }

    if (currentStep === 2) {
      setMonitorStatus('connecting');
      const failTimer = setTimeout(() => {
        setMonitorStatus('failed');

        // Auto recover after failure presentation
        const recoverTimer = setTimeout(() => {
          setMonitorStatus('restored');
        }, 4000); // Wait 4 seconds in failed state
        return () => clearTimeout(recoverTimer);

      }, 3000);
      return () => clearTimeout(failTimer);
    }
  }, [currentStep]);

  // Determine background image based on water level
  const getCCTVImage = () => {
    if (waterLevel < 40) return hanoiNormal;
    if (waterLevel < 70) return hanoiRising;
    return hanoiFlood;
  };

  return (
    <div className="app-container">
      <div className="grid-bg"></div>

      <header className="header glass-panel">
        <h1>CISCO <span className="text-gradient">RESILIENCE</span></h1>
        <div className="status-indicator">
          <span className={`status-badge ${currentStep === 0 ? 'status-normal' : currentStep > 3 ? 'status-normal' : 'status-danger'}`}>
            {currentStep === 0 ? 'SYSTEM READY' : currentStep > 4 ? 'RECOVERY COMPLETE' : 'CRITICAL EVENT'}
          </span>
        </div>
      </header>

      <main className="main-content">
        <div className="visualization-area glass-panel">
          {currentStep === 0 && (
            <div className="intro-screen animate-fade-in">
              <h2>Flood Response Protocol</h2>
              <p>Monitoring Stations Active</p>
              <div className="ramon-badge">
                <div className="badge-ring"></div>
                <div className="badge-core">
                  <span className="ramon-title">RAMON</span>
                  <span className="ramon-subtitle">AI AGENT</span>
                </div>
              </div>
              <button className="start-btn" onClick={nextStep}>INITIATE SIMULATION</button>
            </div>
          )}

          {currentStep === 1 && (
            <div className="step-view animate-fade-in">
              <h3>Meraki MV72 Analysis</h3>
              <div className="step1-layout">
                <div className="camera-feed" style={{ backgroundImage: `url(${getCCTVImage()})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  {/* Clean Feed */}
                  <button className="rain-btn" onClick={() => setWaterLevel(prev => Math.min(prev + 20, 95))}>☔ RAIN</button>
                </div>

                <div className="side-gauge-panel glass-panel">
                  <div className="gauge-status-row">
                    <div className="status-readout">
                      <div className="readout-item">
                        <span className="label">WATER HEIGHT</span>
                        <span className="value">{(waterLevel / 20).toFixed(2)}m</span>
                      </div>
                      <div className="readout-item">
                        <span className="label">CURRENT LEVEL</span>
                        <span className={`value status-${waterLevel > 70 ? 'danger' : waterLevel > 40 ? 'warning' : 'normal'}`}>
                          {waterLevel > 70 ? 'CRITICAL' : waterLevel > 40 ? 'WARNING' : 'NORMAL'}
                        </span>
                      </div>
                      <div className="readout-item">
                        <span className="label">SENSOR ID</span>
                        <span className="value-small">MV72_HANOI</span>
                      </div>
                    </div>

                    <div className="liquid-gauge-container">
                      <div className="liquid-gauge-tube">
                        <div className="liquid-fill" style={{
                          height: `${waterLevel}%`,
                          backgroundColor: waterLevel > 70 ? 'var(--danger)' : waterLevel > 40 ? 'var(--warning)' : 'var(--success)',
                          boxShadow: `0 0 20px ${waterLevel > 70 ? 'var(--danger)' : waterLevel > 40 ? 'var(--warning)' : 'var(--success)'}`
                        }}>
                          <div className="liquid-surface"></div>
                        </div>

                        <div className="gauge-marker danger" style={{ bottom: '70%' }}><span>4.0m</span></div>
                        <div className="gauge-marker warning" style={{ bottom: '40%' }}><span>2.5m</span></div>
                        <div className="gauge-marker normal" style={{ bottom: '20%' }}><span>1.0m</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-view animate-fade-in">
              <h3>2. Monitoring: Network Path Analysis</h3>
              <div className="step2-layout">
                {/* Visual Description of Logic */}
                <div className="network-path-panel glass-panel">
                  <div className="path-row">
                    {/* CAM NODE */}
                    <div className="node-container">
                      <div className="tech-node normal">
                        <span className="icon">📷</span>
                        <span className="name">MERAKI</span>
                      </div>
                      <div className="status-dot online"></div>
                    </div>

                    <div className="link-segment">
                      <div className="cable normal">
                        <div className="packet-flow"></div>
                      </div>
                      <div className="latency-tag">12ms</div>
                    </div>

                    {/* ISP NODE / STARLINK NODE */}
                    <div className="node-container">
                      <div className={`tech-node ${monitorStatus === 'connecting' ? 'warning pulsing' : monitorStatus === 'restored' ? 'normal' : 'offline'}`}>
                        <span className="icon">{monitorStatus === 'restored' ? '🛰' : '🌐'}</span>
                        <span className="name">{monitorStatus === 'restored' ? 'STARLINK' : 'ISP HUB'}</span>
                        {monitorStatus === 'failed' && <span className="error-badge">FLOODED</span>}
                        {monitorStatus === 'restored' && <span className="success-badge">SD-WAN</span>}
                      </div>
                      <div className={`status-dot ${monitorStatus === 'connecting' ? 'warning' : monitorStatus === 'restored' ? 'online' : 'offline'}`}></div>
                    </div>

                    <div className="link-segment">
                      <div className={`cable ${monitorStatus === 'connecting' ? 'dashed' : monitorStatus === 'restored' ? 'normal' : 'broken'}`}>
                        {(monitorStatus === 'connecting' || monitorStatus === 'restored') && <div className={`packet-flow ${monitorStatus === 'connecting' ? 'slow' : ''}`}></div>}
                      </div>
                      <div className={`latency-tag ${monitorStatus === 'connecting' ? 'warning' : monitorStatus === 'restored' ? 'normal' : 'error'}`}>
                        {monitorStatus === 'connecting' ? 'CONNECTING...' : monitorStatus === 'restored' ? '45ms (SAT)' : 'TIMEOUT'}
                      </div>
                    </div>

                    {/* SPLUNK NODE */}
                    <div className="node-container">
                      <div className={`tech-node ${monitorStatus === 'restored' ? 'normal active-receiver' : 'offline'}`}>
                        <span className="icon">☁️</span>
                        <span className="name">SPLUNK</span>
                        {monitorStatus === 'restored' && <span className="receiving-badge">SYNCING</span>}
                      </div>
                      <div className={`status-dot ${monitorStatus === 'restored' ? 'online' : 'offline'}`}></div>
                    </div>
                  </div>

                  <div className="network-stat">
                    {monitorStatus === 'connecting' ? (
                      <div>
                        <span>STATUS: </span> <strong className="warning">ATTEMPTING HANDSHAKE...</strong>
                        <div className="loading-bar"><div className="loading-fill"></div></div>
                      </div>
                    ) : monitorStatus === 'restored' ? (
                      <div>
                        <span>STATUS: </span> <strong className="success">RESTORED VIA SATELLITE</strong>
                        <div className="sub-stat">SD-WAN Policy Implemented. Data stream active.</div>
                      </div>
                    ) : (
                      <div className="animate-shake">
                        <span>STATUS: </span> <strong className="danger">CRITICAL FAILURE (SUBMERGED)</strong>
                        <div className="sub-stat">Physical layer connectivity lost at ISP Gateway.</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Data Loss Analysis */}
                <div className="analysis-panel glass-panel">
                  <h4 className="panel-title">DATA CONTINUITY <br />MONITORING</h4>

                  <div className="monitor-status-row">
                    {monitorStatus === 'connecting' ? (
                      <div className="signal-bars">
                        <div className="bar-signal active"></div>
                        <div className="bar-signal active"></div>
                        <div className="bar-signal active"></div>
                        <div className="bar-signal blink"></div>
                      </div>
                    ) : monitorStatus === 'restored' ? (
                      <div className="signal-bars">
                        <div className="bar-signal active"></div>
                        <div className="bar-signal active"></div>
                        <div className="bar-signal active"></div>
                        <div className="bar-signal active"></div>
                        <div className="signal-badge-ok">
                          <span>●</span> OPTIMAL
                        </div>
                      </div>
                    ) : (
                      <div className="signal-bars lost">
                        <div className="bar-signal active"></div>
                        <div className="bar-signal active"></div>
                        <div className="bar-signal active"></div>
                        <div className="no-signal-badge">
                          <span className="icon">🛑</span> NO SIGNAL
                          <div className="signal-line"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="metric-display">
                    <span className="metric-label">PACKET LOSS</span>
                    <div className={`metric-value ${monitorStatus === 'connecting' ? 'warning' : monitorStatus === 'restored' ? 'success' : 'danger'}`}>
                      {monitorStatus === 'connecting' ? '12.4%' : monitorStatus === 'restored' ? '0.0%' : '100%'}
                    </div>
                  </div>

                  <div className="metric-desc">
                    {monitorStatus === 'connecting' ? 'Packet loss increasing. Retrying...' : monitorStatus === 'restored' ? 'Connection stabilized via Starlink Uplink.' : (
                      <div className="status-text">Connection terminated. Infrastructure unresponsive.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Global Error Overlay for Step 2 */}
              {monitorStatus === 'failed' && (
                <div className="error-overlay animate-pop-in">
                  <div className="error-card glass-panel">
                    <div className="error-icon">⚠️</div>
                    <h3>CRITICAL NETWORK FAILURE</h3>
                    <p>Physical infrastructure at ISP HUB is submerged and unresponsive.</p>
                    <div className="ai-suggestion">
                      <strong>🤖 AI RECOMMENDATION:</strong>
                      <span>지금 즉시 위성망 SD-WAN 기술을 사용하여 연결합니다.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-view animate-fade-in">
              <h3>3. Analysis: Data Correlation</h3>
              <div className="step2-layout">
                {/* Visual Analysis Panel */}
                <div className="splunk-viz-panel glass-panel">
                  <h4 className="panel-title">RISK PREDICTION MODEL</h4>
                  <div className="chart-area-large">
                    <svg viewBox="0 0 400 150" className="prediction-chart">
                      <defs>
                        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--success)" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="var(--success)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Grid Lines */}
                      <line x1="0" y1="30" x2="400" y2="30" stroke="#eee" strokeWidth="1" />
                      <line x1="0" y1="60" x2="400" y2="60" stroke="#eee" strokeWidth="1" />
                      <line x1="0" y1="90" x2="400" y2="90" stroke="#eee" strokeWidth="1" />
                      <line x1="0" y1="120" x2="400" y2="120" stroke="#eee" strokeWidth="1" />

                      {/* Water Level Line (Rising) */}
                      <path d="M0,140 C100,135 200,90 400,20" fill="none" stroke="var(--primary)" strokeWidth="3" strokeDasharray="5,5" />
                      <text x="5" y="125" fill="var(--primary)" fontSize="10" fontWeight="bold">WATER LEVEL</text>

                      {/* Network Health (Drop and Recover) */}
                      <path d="M0,45 L150,45 Q180,45 200,110 Q220,45 250,35 L400,35" fill="none" stroke="var(--success)" strokeWidth="3" />
                      <text x="5" y="35" fill="var(--success)" fontSize="10" fontWeight="bold">NET HEALTH</text>

                      {/* Trigger Point */}
                      <circle cx="200" cy="110" r="5" fill="var(--danger)" className="pulsing-dot" />
                      <text x="165" y="130" fill="var(--danger)" fontSize="10" fontWeight="bold">FLOOD EVENT</text>
                    </svg>
                  </div>

                  <div className="kpi-grid">
                    <div className="kpi-item">
                      <span className="label">ANOMALY SCORE</span>
                      <span className="value danger">98.2</span>
                    </div>
                    <div className="kpi-item">
                      <span className="label">PREDICTED IMPACT</span>
                      <span className="value warning">CRITICAL</span>
                    </div>
                    <div className="kpi-item">
                      <span className="label">AUTO-REMEDIATION</span>
                      <span className="value success">ENABLED</span>
                    </div>
                  </div>
                </div>

                {/* Log Panel */}
                <div className="splunk-log-panel glass-panel">
                  <h4 className="panel-title">INTELLIGENT RESPONSE LOG</h4>
                  <div className="log-feed">
                    <div className="log-item active">
                      <span className="time">14:32:05</span>
                      <span className="msg">Satellite Uplink Established</span>
                      <span className="tag success">RESOLVED</span>
                    </div>
                    <div className="log-item">
                      <span className="time">14:32:01</span>
                      <span className="msg">ISP Gateway Unreachable</span>
                      <span className="tag danger">FLAPPING</span>
                    </div>
                    <div className="log-item">
                      <span className="time">14:31:55</span>
                      <span className="msg">Water Level &gt; Threshold (4.0m)</span>
                      <span className="tag warning">TRIGGER</span>
                    </div>
                    <div className="log-item">
                      <span className="time">14:31:40</span>
                      <span className="msg">Latency Deviation Detected</span>
                      <span className="tag info">ANOMALY</span>
                    </div>
                  </div>

                  <div className="splunk-logo-watermark">
                    <span>splunk&gt;</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="step-view animate-fade-in">
              <div className="ai-header">
                <div className="ai-status-badge pulse-red">CRITICAL EVENT DETECTED</div>
                <h3>RAMON AI INTEGRATED RESPONSE</h3>
                <div className="ai-mode">MODE: autonomous_rescue_protocol_v2.0</div>
              </div>

              <div className="step4-layout integrated-response">

                {/* 1. 경보 (ALERT) */}
                <div className="response-card alert-card">
                  <div className="card-header">
                    <span className="icon">📢</span>
                    <h4>[CMD-01] PUBLIC SAFETY</h4>
                  </div>
                  <div className="card-visual alert-visual">
                    <div className="siren-icon">📩</div>
                    <div className="sound-wave"></div>
                    <div className="sound-wave delay-1"></div>
                  </div>
                  <div className="action-list">
                    <div className="action-item done">
                      <span className="chk">✔</span> Triggering Civil Defense Siren
                    </div>
                    <div className="action-item active">
                      <span className="chk blink">▶</span> Broadcasting SMS to Zone C
                    </div>
                  </div>
                  <div className="stat-box">
                    <span className="label">SMS SENT</span>
                    <strong className="val">2,451 / 2,451</strong>
                  </div>
                </div>

                {/* 2. 전환 (NETWORK) */}
                <div className="response-card network-card">
                  <div className="card-header">
                    <span className="icon">🛰️</span>
                    <h4>[CMD-02] NETWORK RESILIENCE</h4>
                  </div>
                  <div className="card-visual network-visual">
                    <div className="path-row">
                      <span className="lbl">ISP</span>
                      <div className="line broken"></div>
                      <span className="state down">FAIL</span>
                    </div>
                    <div className="path-row">
                      <span className="lbl sat">SAT</span>
                      <div className="line active-sat"></div>
                      <span className="state up">ACTIVE</span>
                    </div>
                  </div>
                  <div className="action-list">
                    <div className="action-item done">
                      <span className="chk">✔</span> Detecting Link Submersion
                    </div>
                    <div className="action-item done">
                      <span className="chk">✔</span> Activating Starlink Uplink
                    </div>
                  </div>
                  <div className="stat-box">
                    <span className="label">SWITCHOVER TIME</span>
                    <strong className="val success">0.05s</strong>
                  </div>
                </div>

                {/* 3. 구조 (RESCUE) */}
                <div className="response-card rescue-card">
                  <div className="card-header">
                    <span className="icon">🚁</span>
                    <h4>[CMD-03] LIFE SAVING</h4>
                  </div>
                  <div className="card-visual rescue-visual">
                    <div className="cctv-frame">
                      <div className="bounding-box">
                      </div>
                      <div className="scan-line"></div>
                    </div>
                  </div>
                  <div className="action-list">
                    <div className="action-item done">
                      <span className="chk">✔</span> Analyzing Meraki MV Feed
                    </div>
                    <div className="action-item active">
                      <span className="chk blink">▶</span> Dispatching GPS to 119
                    </div>
                  </div>
                  <div className="stat-box">
                    <span className="label">GPS ACCURACY</span>
                    <strong className="val warning">±1.2m</strong>
                  </div>
                </div>

              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="step-view animate-fade-in operation-summary">
              <div className="summary-split-layout">
                {/* Left Panel: Status & Header */}
                <div className="summary-left">
                  <div className="summary-header">
                    <h2>OPERATIONAL SUCCESS</h2>
                    <span className="mission-id">ID: #FLOOD-2023-X92</span>
                  </div>
                  <div className="hero-status">

                    <h1>ALL SYSTEMS SECURED</h1>
                    <p>RAMON AI has successfully mitigated the flood threat.</p>
                  </div>
                </div>

                {/* Right Panel: Metrics & Actions */}
                <div className="summary-right">
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <span className="m-label">RESPONSE TIME</span>
                      <strong className="m-val highlight">0.05s</strong>
                      <span className="m-sub">WORLD RECORD</span>
                    </div>
                    <div className="metric-card">
                      <span className="m-label">NETWORK UPTIME</span>
                      <strong className="m-val">100%</strong>
                      <span className="m-sub">VIA STARLINK</span>
                    </div>
                    <div className="metric-card">
                      <span className="m-label">RESCUE STATUS</span>
                      <strong className="m-val success">DISPATCHED</strong>
                      <span className="m-sub">ETA 3 MINS</span>
                    </div>
                  </div>

                  <div className="action-footer">
                    <button className="primary-btn">Download Report</button>
                    <button className="secondary-btn" onClick={reset}>Reset System</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="dashboard-footer">
          <div className="log-panel glass-panel">
            <h4>EVENT LOG</h4>
            <div className="log-window">
              {logs.map((L, i) => (
                <div key={i} className="log-entry">
                  <span className="log-caret">&gt;</span> {L}
                </div>
              ))}
            </div>
          </div>

          <div className="controls-panel glass-panel">
            <div className="step-indicator">
              {steps.map((s, i) => (
                <div key={s.id} className={`dot ${currentStep > i ? 'active' : ''}`}>
                  {currentStep === i + 1 && <span className="step-label">{s.title}</span>}
                </div>
              ))}
            </div>
          </div>

          {currentStep > 0 && currentStep < 5 && (
            <button className="next-btn-side" onClick={nextStep}>
              <span className="btn-text">NEXT<br />STAGE</span>
              <span className="btn-icon">&rarr;</span>
            </button>
          )}
        </div>
      </main>

      <style>{`
        .app-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 10px 15px; /* Tighter padding */
          gap: 10px; /* Reduced gap */
          max-width: 1200px;
          margin: 0 auto;
          overflow: hidden; /* Prevent scrolling globally */
        }
        .header {
          padding: 10px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }
        .header h1 { font-size: 1.4rem; margin: 0; }
        
        .main-content {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
          min-height: 0; /* Important for flex child scrolling/fitting */
        }
        .visualization-area {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: #fff; /* Changed to White */
          min-height: 0;
        }
        
        .intro-screen h2 {
           color: #333;
           margin-bottom: 10px;
           text-transform: uppercase;
           letter-spacing: 2px;
        }
        .intro-screen p {
           color: #666;
           font-weight: bold;
           margin-bottom: 30px;
        }
        
        .dashboard-footer {
          display: flex;
          gap: 15px;
          height: 180px; /* Compact footer */
          flex-shrink: 0;
        }
        
        /* Step 1 Styles */
        /* Step 1 Styles */
        .step1-layout {
          display: flex;
          gap: 30px;
          height: 100%;
          align-items: stretch;
          width: 100%;
        }

        .camera-feed {
          flex: 3;
          height: 320px; /* Reduced height to fit viewport */
          border: 2px solid #ccc; /* Lighter border for light theme */
          position: relative;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          min-width: 500px;
        }

        .side-gauge-panel {
          flex: 2; /* Increased flex to hold text + gauge */
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 10px; /* Reduced padding */
          min-width: 300px;
          background: rgba(255, 255, 255, 0.6); /* Slightly more transparent */
          border-radius: 8px;
        }

        .gauge-status-row {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 100%;
          height: 100%;
        }

        .status-readout {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
          text-align: left;
        }

        .readout-item {
          display: flex;
          flex-direction: column;
        }

        .readout-item .label {
           font-size: 0.8rem;
           color: #666;
           font-weight: bold;
           margin-bottom: 4px;
        }
        
        .readout-item .value {
           font-size: 2rem;
           font-weight: 800;
           font-family: var(--font-display);
           color: #333;
        }
        
        .readout-item .value.status-danger { color: var(--danger); }
        .readout-item .value.status-warning { color: var(--warning); }
        .readout-item .value.status-normal { color: var(--success); }
        
        .readout-item .value-small {
           font-size: 1.1rem;
           font-family: monospace;
           color: #555;
        }

        .liquid-gauge-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: center;
        }

        .liquid-gauge-tube {
          width: 100px; /* Slightly reduced width to fit layout */
          height: 90%;
          background: rgba(200, 200, 200, 0.2);
          border-radius: 50px;
          border: 1px solid rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 0 15px rgba(0,0,0,0.1);
        }

        .liquid-fill {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          transition: height 0.5s ease-out, background-color 0.5s ease;
          border-radius: 0 0 50px 50px;
          z-index: 1; /* Behind surface */
        }
        
        .liquid-surface {
          position: absolute;
          top: -5px; /* Pull up to center on the fill edge */
          left: 0; right: 0; height: 10px;
          background-color: inherit; /* Match the fluid color */
          filter: brightness(1.2); /* Top is lighter */
          border-radius: 50%;
          z-index: 2; /* On top of fill */
          box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
        }

        .gauge-marker {
          position: absolute;
          right: 0; width: 100%;
          border-bottom: 2px dashed rgba(0,0,0,0.3);
          font-size: 0.6rem;
          color: #555;
          z-index: 10;
        }
        
        .gauge-marker span {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 2px;
          white-space: nowrap;
          font-weight: bold;
          text-shadow: 0 0 2px rgba(255,255,255,0.8);
          font-size: 0.7rem;
        }
        /* No water overlay div needed as we use images */
        
        .gauge-lines {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          perspective: 300px; /* Stronger perspective for low-angle look */
          pointer-events: none;
        }

        .vertical-pole {
          position: absolute;
          left: 20%; /* Position near a likely bridge pillar or bank */
          top: 40%;
          bottom: 0;
          width: 4px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 2px 0 5px rgba(0,0,0,0.5);
          transform: rotateX(10deg); /* Slight tilt */
          z-index: 10;
        }
        
        .vertical-pole .tick {
           position: absolute; left: 0; width: 15px; height: 2px; background: #fff;
        }
        
        .gauge-lines .line {
           position: absolute;
           width: 150%; 
           left: -25%;
           border-top: 2px dashed rgba(255, 255, 255, 0.7);
           box-shadow: 0 2px 4px rgba(0,0,0,0.3);
           transform: rotateX(60deg); 
           transform-origin: center center;
        }
        
        .gauge-lines .line.danger { border-color: var(--danger); box-shadow: 0 0 10px var(--danger); }
        .gauge-lines .line.warning { border-color: var(--warning); }
        .gauge-lines .line.normal { border-color: var(--success); }
        
        .gauge-lines span {
           background: rgba(0, 188, 235, 0.9);
           padding: 2px 8px; 
           font-size: 0.75rem; 
           color: #fff;
           position: absolute; 
           left: 21%; /* Align with pole */
           top: -20px;
           border-radius: 4px;
           transform: rotateX(0deg); 
           white-space: nowrap;
        }
        
        .cam-overlay-text {
          position: absolute;
          top: 10px; left: 10px;
          color: #fff;
          font-family: monospace;
          background: rgba(0,0,0,0.5);
          padding: 2px 6px;
          font-size: 0.8rem;
        }
        
        /* Step 2 Styles */
        .step2-layout { display: flex; width: 100%; height: 350px; gap: 20px; }
        
        .network-path-panel {
           flex: 2;
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: center;
           padding: 20px;
           background: #fff; /* White bg */
           border: 2px solid #eee;
           border-radius: 8px;
           position: relative;
           box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        
        .path-row { display: flex; align-items: center; gap: 15px; width: 100%; justify-content: space-around; }
        
        .node-container { display: flex; flex-direction: column; align-items: center; gap: 5px; position: relative; }
        .tech-node {
           width: 80px; height: 80px;
           border: 2px solid var(--primary);
           border-radius: 10px;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           background: #f9f9f9;
           box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .tech-node.warning { border-color: var(--warning); background: #fffbf0; }
        .tech-node.offline { border-color: #ddd; opacity: 1; background: #f0f0f0; }
        
        .tech-node .icon { font-size: 2rem; margin-bottom: 5px; }
        .tech-node .name { font-size: 0.7rem; color: #333; font-weight: bold; }
        
        .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #ddd; }
        .status-dot.online { background: var(--success); box-shadow: 0 0 5px var(--success); }
        .status-dot.warning { background: var(--warning); box-shadow: 0 0 5px var(--warning); }
        .status-dot.offline { background: var(--danger); }
        
        .link-segment { flex: 1; display: flex; flex-direction: column; align-items: center; position: relative; height: 40px; justify-content: center; }
        .cable { width: 100%; height: 4px; background: #eee; position: relative; overflow: hidden; border-radius: 2px; }
        .cable.normal { background: #e0fadd; }
        .cable.broken { background: transparent; border-bottom: 2px dashed var(--danger); height: 0; }
        
        .packet-flow { 
           position: absolute; top:0; left:0; width: 20px; height: 100%; 
           background: var(--success); 
           animation: flow 1s linear infinite; 
           box-shadow: 0 0 5px var(--success);
        }
        @keyframes flow { from { left: -20px; } to { left: 100%; } }
        
        .latency-tag { font-size: 0.7rem; color: var(--success); margin-top: 5px; font-weight: bold; }
        .latency-tag.error { color: var(--danger); animation: blink 1s infinite; }
        
        .network-stat { margin-top: 20px; font-size: 1.2rem; color: #333; }
        .network-stat strong.danger { color: var(--danger); }
        
        .analysis-panel {
           flex: 1;
           display: flex;
           flex-direction: column;
           padding: 20px;
           background: #fff; /* White bg */
           border: 2px solid #eee;
           border-radius: 8px;
           box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .analysis-panel h4.panel-title { 
           margin: 0 0 20px 0; 
           font-size: 1rem; 
           color: #333; 
           font-family: var(--font-display); 
           text-transform: uppercase;
           letter-spacing: 1px;
           border-bottom: 1px solid #eee; 
           padding-bottom: 10px; 
           font-weight: 800;
        }

        .monitor-status-row {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          height: 40px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }

        .signal-bars { display: flex; align-items: flex-end; gap: 5px; height: 100%; width: 100%; }
        .bar-signal { width: 30px; height: 15px; background: #ddd; border-radius: 2px; }
        .bar-signal.active { background: #8cd699; }
        .bar-signal.blink { background: var(--warning); animation: pulse 1s infinite; }
        
        .signal-bars.lost .no-signal-badge {
           margin-left: auto;
           display: flex;
           flex-direction: column;
           align-items: flex-end;
        }
        
        .no-signal-badge {
           border: 1px solid var(--danger);
           color: var(--danger);
           padding: 2px 8px;
           border-radius: 4px;
           font-size: 0.7rem;
           font-weight: bold;
           background: #fff;
           display: flex;
           align-items: center;
           gap: 5px;
           position: relative;
        }
        .signal-line { width: 100%; height: 3px; background: var(--danger); margin-top: 2px; border-radius: 2px; }

        .metric-display { text-align: center; margin-bottom: 15px; }
        .metric-display .metric-label { font-size: 0.9rem; color: #666; letter-spacing: 1px; text-transform: uppercase; }
        .metric-display .metric-value { 
           font-size: 4rem; 
           font-weight: 800; 
           line-height: 1; 
           font-family: var(--font-display);
           text-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .metric-value.danger { color: #d93f3c; background: -webkit-linear-gradient(#d93f3c, #a00); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .metric-value.warning { color: var(--warning); }
        
        .status-text { color: #555; margin-bottom: 15px; font-size: 0.85rem; line-height: 1.4; }

        .success-badge { position: absolute; bottom: -10px; background: var(--primary); color: #000; font-size: 0.6rem; padding: 2px 4px; border-radius: 4px; font-weight: bold; white-space: nowrap; box-shadow: 0 0 10px var(--primary); }
        .metric-value.success { color: var(--success); }
        .signal-badge-ok { margin-left: auto; border: 1px solid var(--success); color: var(--success); padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; display: flex; align-items: center; gap: 5px; }

        .recommendation-box {
           background: #eff6ff;
           border-radius: 6px;
           border-left: 4px solid var(--primary);
           padding: 12px;
           text-align: left;
           box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .box-header { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; font-size: 0.8rem; color: #333; }
        .box-content { font-size: 0.85rem; color: #444; line-height: 1.3; }

        .error-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }
        
        .error-card {
          background: #fff;
          border: 2px solid var(--danger);
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          max-width: 500px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        .error-icon { font-size: 3rem; margin-bottom: 15px; }
        
        .error-card h3 {
          color: var(--danger);
          font-size: 1.5rem;
          margin: 0 0 10px 0;
          font-weight: 800;
        }
        
        .error-card p {
          color: #555;
          margin-bottom: 25px;
          font-size: 1rem;
        }
        
        .ai-suggestion {
          background: #f0f9ff;
          border: 1px solid var(--primary);
          padding: 15px;
          border-radius: 8px;
          color: #333;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        .ai-suggestion strong { color: var(--primary); font-size: 0.9rem; letter-spacing: 1px; }
        .ai-suggestion span { font-weight: bold; font-size: 1rem; }
        
        .animate-pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        
        .chart-container { flex: 1; position: relative; display: flex; align-items: flex-end; padding-bottom: 10px; margin-bottom: 15px; border-left: 1px solid #ccc; border-bottom: 1px solid #ccc; }
        .chart-grid { display: flex; align-items: flex-end; width: 100%; height: 100%; gap: 5px; padding: 0 10px; }
        .bar { flex: 1; background: var(--success); border-radius: 2px 2px 0 0; opacity: 0.6; transition: height 0.3s; }
        .bar.danger { background: var(--danger); opacity: 0.9; box-shadow: none; animation: pulse-bar 0.5s infinite alternate; }
        
        @keyframes pulse-bar { from { opacity: 0.7; } to { opacity: 1; } }
        
        .chart-overlay { position: absolute; top: 10px; right: 10px; }
        .spike-alert { background: rgba(255,0,0,0.05); border: 1px solid var(--danger); color: var(--danger); font-size: 0.6rem; padding: 2px 5px; border-radius: 3px; font-weight: bold; animation: blink 1s infinite; }
        
        .metric-box { text-align: center; margin-bottom: 10px; }
        .metric-label { font-size: 0.8rem; color: #666; letter-spacing: 1px; }
        .metric-value { font-size: 2.5rem; font-weight: 800; color: #333; line-height: 1; }
        .metric-box.danger .metric-value { color: var(--danger); text-shadow: 0 0 10px rgba(255,50,50,0.5); }
        .metric-box.warning .metric-value { color: var(--warning); }
        .metric-desc { font-size: 0.8rem; color: #777; line-height: 1.4; }

        /* Step 2 Animations & Extras */
        .tech-node.pulsing { animation: pulse-border 1s infinite; }
        @keyframes pulse-border { 0% { border-color: var(--warning); box-shadow: 0 0 0 rgba(255, 165, 0, 0.4); } 50% { border-color: #fff; box-shadow: 0 0 10px rgba(255, 165, 0, 0.7); } 100% { border-color: var(--warning); box-shadow: 0 0 0 rgba(255, 165, 0, 0.4); } }
        
        .error-badge { position: absolute; bottom: -10px; background: var(--danger); color: #fff; font-size: 0.6rem; padding: 2px 4px; border-radius: 4px; font-weight: bold; white-space: nowrap; }

        .cable.dashed { background: repeating-linear-gradient(90deg, #ccc, #ccc 10px, transparent 10px, transparent 20px); height: 2px; }
        .packet-flow.slow { animation-duration: 3s; }

        .loading-bar { width: 100%; height: 4px; background: #eee; margin-top: 10px; border-radius: 2px; overflow: hidden; }
        .loading-fill { width: 50%; height: 100%; background: var(--warning); animation: load-move 1s infinite alternate; }
        @keyframes load-move { from { transform: translateX(-50%); } to { transform: translateX(150%); } }

        .chart-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #f9f9f9; color: #999; font-size: 0.8rem; }
        .blink { animation: blink 1s infinite; }
        .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
        
        .sub-stat { font-size: 0.8rem; color: #666; font-weight: normal; margin-top: 5px; }
        
        /* Step 3 Styles - Splunk Dashboard */
        .splunk-dashboard {
           display: flex; flex-direction: column; gap: 15px; width: 100%; height: 100%;
           background: #fff; padding: 20px; border-radius: 4px; border: 1px solid #ddd;
           font-family: sans-serif; color: #333; overflow: hidden;
        }
        
        .splunk-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #eee; flex-shrink: 0; }
        .splunk-header h3 { font-size: 1.3rem; margin: 0; color: #333; font-weight: 700; }
        .sub-header { font-weight: 400; color: #666; margin-left: 10px; font-size: 1rem; }

        
        .splunk-content { display: flex; gap: 20px; flex: 1; min-height: 0; }
        
        .splunk-main-col { flex: 5; display: flex; flex-direction: column; gap: 15px; min-height: 0; }
        .splunk-side-col { flex: 3; display: flex; flex-direction: column; min-height: 0; }

        .kpi-row { display: flex; gap: 15px; justify-content: space-between; margin-bottom: 5px; flex-shrink: 0; }
        .kpi-card { flex: 1; padding: 15px; background: #fff; border-left: 4px solid transparent; box-shadow: 0 3px 6px rgba(0,0,0,0.05); }
        .kpi-card.highlight { border-left-color: var(--danger); background: #fff5f5; }
        .kpi-label { display: block; font-size: 0.8rem; color: #666; text-transform: uppercase; margin-bottom: 5px; }
        .kpi-value { display: block; font-size: 2rem; font-weight: 700; color: #333; }
        .kpi-value.danger { color: var(--danger); }
        
        .splunk-grid-row { display: flex; gap: 15px; flex: 1; min-height: 0; }
        .chart-panel { flex: 1; border: 1px solid #eee; padding: 15px; display: flex; flex-direction: column; border-radius: 4px; box-shadow: 0 3px 6px rgba(0,0,0,0.05); }
        .chart-panel h4 { margin: 0 0 10px 0; font-size: 1rem; color: #555; }
        .chart-area { flex: 1; position: relative; width: 100%; display: flex; align-items: flex-end; min-height: 0; }
        .graph-svg { width: 100%; height: 100%; }
        
        .bar-chart-list { display: flex; flex-direction: column; gap: 8px; width: 100%; overflow-y: auto; }
        .bar-row { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; }
        .bar-label { width: 50px; text-align: right; color: #666; white-space: nowrap; }
        .bar-track { flex: 1; height: 14px; background: #f0f0f0; border-radius: 2px; overflow: hidden; }
        .bar-val { height: 100%; }
        .bar-val.danger { background: #d93f3c; }
        .bar-val.warning { background: #f58f39; }
        .bar-val.info { background: #65a637; }
        .bar-num { width: 35px; font-weight: bold; color: #333; font-size: 0.85rem; }
        
        .splunk-table-panel { flex: 1; display:flex; flex-direction:column; border: 1px solid #eee; border-radius: 4px; padding: 15px; box-shadow: 0 3px 6px rgba(0,0,0,0.05); overflow: hidden; }
        .splunk-table-panel h4 { margin: 0 0 10px 0; font-size: 1rem; color: #555; }
        .splunk-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        .splunk-table th { text-align: left; border-bottom: 1px solid #ccc; padding: 8px; color: #666; background: #f9f9f9; position: sticky; top: 0; }
        .splunk-table td { border-bottom: 1px solid #eee; padding: 10px 8px; color: #333; }
        .splunk-table tr:hover { background: #f9f9f9; }
        .row-danger { background: #fff0f0; }
        .badge { padding: 3px 8px; border-radius: 3px; font-size: 0.7rem; color: #fff; font-weight: bold; }
        .badge.danger { background: #d93f3c; }
        .badge.warning { background: #f58f39; }
        .badge.info { background: #65a637; }
        
        /* Step 4 Styles */
        .network-switch { text-align: center; }
        .satellite-icon { font-size: 3rem; margin-bottom: 20px; animation: pulse 3s infinite; }
        .path-animation { width: 300px; height: 10px; background: #333; margin: 20px auto; position: relative; border-radius: 5px; overflow: hidden; }
        .packet { width: 20px; height: 100%; background: var(--success); position: absolute; animation: moveRight 1s linear infinite; }
        .packet:nth-child(2) { animation-delay: 0.3s; }
        .packet:nth-child(3) { animation-delay: 0.6s; }
        @keyframes moveRight { from { left: -20px; } to { left: 100%; } }
        
        /* General Layout */
        .log-panel { flex: 3; padding: 20px; overflow: hidden; display: flex; flex-direction: column; }
        .controls-panel { flex: 1; padding: 20px; display: flex; flex-direction: column; justify-content: center; } /* just step indicator */
        
        .log-window { flex: 1; overflow-y: auto; font-family: monospace; font-size: 0.9rem; color: var(--text-muted); }
        .log-entry { margin-bottom: 5px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 2px; }
        .log-caret { color: var(--primary); margin-right: 8px; }
        
        .step-indicator { display: flex; flex-direction: column; gap: 15px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; background: #333; display: flex; align-items: center; position: relative; }
        .dot.active { background: var(--primary); box-shadow: 0 0 10px var(--primary); }
        .step-label { position: absolute; left: 25px; white-space: nowrap; font-size: 0.9rem; font-weight: bold; color: var(--primary); }
        
        .next-btn-side {
           flex: 0 0 100px;
           background: var(--primary);
           border: none;
           border-radius: 8px;
           color: #000;
           font-weight: 800;
           cursor: pointer;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           gap: 10px;
           transition: all 0.3s ease;
           box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .next-btn-side:hover {
           background: #fff;
           box-shadow: 0 0 20px var(--primary);
           transform: translateY(-2px);
        }
        .next-btn-side .btn-text { font-size: 0.9rem; line-height: 1.2; }
        .next-btn-side .btn-icon { font-size: 2rem; }

        button.start-btn, button.reset-btn {
           background: var(--primary); border: none; padding: 15px 30px; font-weight: bold; font-size: 1rem; color: #000; clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%); transition: all 0.3s;
        }
        button.reset-btn { background: var(--success); }

        .intro-screen { text-align: center; }
        
        .ramon-badge {
            position: relative;
            width: 140px;
            height: 140px;
            margin: 30px auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .badge-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px dashed var(--primary);
            border-radius: 50%;
            animation: spin-slow 10s linear infinite;
        }

        .badge-core {
            width: 110px;
            height: 110px;
            background: var(--primary);
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
            position: relative;
            z-index: 2;
        }

        .ramon-title {
            font-size: 1.6rem;
            font-weight: 900;
            color: #000; /* Dark text on primary color for contrast */
            letter-spacing: 2px;
            font-family: var(--font-display);
            line-height: 1;
        }

        .ramon-subtitle {
            font-size: 0.65rem;
            color: rgba(0,0,0,0.7);
            letter-spacing: 1px;
            margin-top: 2px;
            font-weight: bold;
        }

        @keyframes spin-slow { 
            from { transform: rotate(0deg); } 
            to { transform: rotate(360deg); } 
        }

        @keyframes receive-pulse {
            0% { box-shadow: 0 0 0 0 rgba(0, 188, 235, 0.7); border-color: var(--primary); }
            70% { box-shadow: 0 0 0 10px rgba(0, 188, 235, 0); border-color: var(--primary); }
            100% { box-shadow: 0 0 0 0 rgba(0, 188, 235, 0); border-color: var(--primary); }
        }

        .active-receiver {
            animation: receive-pulse 1.5s infinite;
        }

        .receiving-badge {
            position: absolute;
            top: -10px;
            background: var(--primary);
            color: #000;
            font-size: 0.6rem;
            padding: 2px 6px;
            border-radius: 10px;
            font-weight: bold;
            animation: bounce 1s infinite;
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
        }

        .success-badge { position: absolute; bottom: -10px; background: var(--success); color: #fff; font-size: 0.6rem; padding: 2px 4px; border-radius: 4px; font-weight: bold; white-space: nowrap; box-shadow: 0 0 10px var(--success); }
        .metric-value.success { color: var(--success) !important; }
        .signal-badge-ok { margin-left: auto; border: 1px solid var(--success); color: var(--success); padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; display: flex; align-items: center; gap: 5px; }
        
        .recommendation-box {
           background: #eff6ff;
           border-radius: 6px;
           border-left: 4px solid var(--primary);
           padding: 12px;
           text-align: left;
           box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        /* Step 3 Redesign Styles */
        .splunk-viz-panel {
            flex: 2;
            display: flex;
            flex-direction: column;
            padding: 20px;
            position: relative;
        }
        .splunk-log-panel {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 15px;
            position: relative;
        }
        
        .chart-area-large {
            flex: 1;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
        }
        .prediction-chart { width: 100%; height: 100%; max-height: 200px; }
        .pulsing-dot { animation: pulse-red 1s infinite; }
        @keyframes pulse-red { 0% { r: 5; opacity: 1; } 100% { r: 15; opacity: 0; } }

        .kpi-grid {
            display: flex;
            gap: 15px;
            margin-top: auto;
        }
        .kpi-item {
            flex: 1;
            background: #f4f4f4;
            padding: 10px;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid #ddd;
        }
        .kpi-item .label { font-size: 0.7rem; color: #666; font-weight: bold; margin-bottom: 5px; }
        .kpi-item .value { font-size: 1.2rem; font-weight: 800; color: #333; }
        .kpi-item .value.danger { color: var(--danger); }
        .kpi-item .value.warning { color: var(--warning); }
        .kpi-item .value.success { color: var(--success); }

        .log-feed {
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding-right: 5px;
        }
        .log-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 10px;
            background: #fff;
            border-left: 3px solid #ccc;
            border-radius: 4px;
            font-size: 0.8rem;
            animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
        
        .log-item.active { border-left-color: var(--success); background: #f0fff4; }
        .log-item .time { color: #888; font-size: 0.7rem; width: 50px; }
        .log-item .msg { flex: 1; font-weight: 500; color: #333; margin: 0 10px; }
        .log-item .tag { padding: 2px 5px; border-radius: 3px; font-size: 0.65rem; font-weight: bold; color: #fff; }
        .log-item .tag.success { background: var(--success); }
        .log-item .tag.danger { background: var(--danger); }
        .log-item .tag.warning { background: var(--warning); }
        .log-item .tag.info { background: #17a2b8; }

        .splunk-logo-watermark {
            margin-top: 10px;
            text-align: right;
            font-size: 1.2rem;
            font-weight: 900;
            color: #333;
            opacity: 0.8;
            font-family: sans-serif;
            letter-spacing: -1px;
        }
        .splunk-logo-watermark span { color: #000; }
        
        /* Step 4: AI Threat Response Styles */
        .step4-layout {
            display: flex; /* Ensure flex layout */
            width: 100%;
            height: 350px;
            gap: 20px;
        }

        /* Step 4: AI Integrated Response Styles */
        .ai-header {
           display: flex; flex-direction: column; align-items: center; justify-content: center;
           margin-bottom: 20px; text-align: center;
        }
        .ai-status-badge {
           background: var(--danger); color: #fff; padding: 5px 15px; border-radius: 20px;
           font-weight: bold; font-size: 0.8rem; letter-spacing: 1px; margin-bottom: 10px;
           box-shadow: 0 0 15px rgba(220, 53, 69, 0.5);
        }
        .pulse-red { animation: pulseWarning 1.5s infinite; }
        @keyframes pulseWarning { 0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; } }
        .ai-header h3 { margin: 0; background: linear-gradient(to right, #333, #666); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.5rem; }
        .ai-mode { font-family: monospace; color: #888; font-size: 0.8rem; margin-top: 5px; }

        .step4-layout.integrated-response {
            display: flex; justify-content: space-between; gap: 15px; width: 100%; height: 350px;
        }

        .response-card {
            flex: 1;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            padding: 15px;
            display: flex; flex-direction: column;
            border-top: 5px solid #ccc;
            transition: transform 0.3s;
        }
        .response-card:hover { transform: translateY(-5px); }
        .alert-card { border-color: #ffc107; background: linear-gradient(to bottom, #fffcf5, #fff); }
        .network-card { border-color: var(--primary); background: linear-gradient(to bottom, #f0faff, #fff); }
        .rescue-card { border-color: var(--danger); background: linear-gradient(to bottom, #fff5f5, #fff); }

        .card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 10px; }
        .card-header .icon { font-size: 1.5rem; }
        .card-header h4 { margin: 0; font-size: 0.8rem; color: #555; text-transform: uppercase; letter-spacing: 0.5px; }

        .card-visual {
            flex: 1;
            border-radius: 8px;
            margin-bottom: 15px;
            position: relative;
            overflow: hidden;
            display: flex; justify-content: center; align-items: center;
        }
        
        /* Alert Visual */
        .alert-visual { background: #ffeeba; }
        .siren-icon { font-size: 3rem; animation: shake 0.5s infinite; z-index: 2; }
        .sound-wave {
            position: absolute; width: 100px; height: 100px; border-radius: 50%;
            border: 2px solid rgba(0,0,0,0.1);
            animation: waveExpand 1.5s infinite;
        }
        .delay-1 { animation-delay: 0.5s; }
        @keyframes shake { 0% { transform: rotate(0deg); } 25% { transform: rotate(10deg); } 75% { transform: rotate(-10deg); } }
        @keyframes waveExpand { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }

        /* Network Visual */
        .network-visual { background: #e0f7fa; flex-direction: column; justify-content: space-evenly; padding: 10px; }
        .path-row { display: flex; align-items: center; width: 100%; gap: 10px; }
        .lbl { font-size: 0.7rem; font-weight: bold; width: 30px; }
        .lbl.sat { color: var(--primary); }
        .line { flex: 1; height: 3px; background: #ddd; position: relative; }
        .line.active-sat { background: var(--primary); box-shadow: 0 0 10px var(--primary); }
        .line.broken { border-top: 3px dotted #aaa; background: transparent; }
        .state { font-size: 0.6rem; font-weight: bold; padding: 2px 5px; border-radius: 4px; color: #fff; width: 50px; text-align: center; }
        .state.down { background: #999; }
        .state.up { background: var(--success); }

        /* Rescue Visual */
        .rescue-visual { background: #000; }
        .cctv-frame { width: 100%; height: 100%; position: relative; background: url('/flood_rescue.png') center/cover; }
        .bounding-box {
            position: absolute; top: 38%; left: 39%; width: 70px; height: 75px;
            /* Border removed to avoid duplication */
            box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
            animation: pulseBox 1s infinite;
        }

        .scan-line {
            width: 100%; height: 2px; background: rgba(0,255,0,0.5);
            position: absolute; top: 0;
            animation: scan 2s infinite linear;
        }
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }

        .action-list { font-size: 0.75rem; color: #666; margin-bottom: 10px; }
        .action-item { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; }
        .chk { color: #ccc; font-weight: bold; font-size: 0.8rem; }
        .action-item.done .chk { color: var(--success); }
        .action-item.active .chk { color: var(--primary); }
        .blink { animation: blink 1s infinite; }

        .stat-box {
            display: flex; justify-content: space-between; align-items: center;
            background: rgba(0,0,0,0.03); padding: 8px; border-radius: 6px;
        }
        .stat-box .label { font-size: 0.65rem; font-weight: bold; color: #888; }
        .stat-box .val { font-size: 0.9rem; color: #333; }
        .val.success { color: var(--success); }
        .val.warning { color: orangered; }
        /* Step 5: AI Operation Summary Styles */
        /* Step 5: AI Operation Summary Styles */
        .operation-summary {
           width: 100%; height: 350px;
        }
        .summary-split-layout {
           display: flex; width: 100%; height: 100%; gap: 30px; align-items: center;
        }
        .summary-left {
           flex: 1; text-align: left; padding: 20px;
           display: flex; flex-direction: column; justify-content: center;
        }
        .summary-right {
           flex: 1.2; display: flex; flex-direction: column; 
           align-items: center; justify-content: center;
           padding: 20px;
        }
        .summary-header { margin-bottom: 20px; }
        .summary-header h2 { color: var(--success); margin: 0; font-size: 2.0rem; letter-spacing: 1px; }
        .mission-id { font-family: monospace; color: #999; font-size: 1rem; }
        
        .hero-status { margin-bottom: 30px; animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .status-icon-large { font-size: 4rem; margin-bottom: 10px; }
        .hero-status h1 { margin: 0 0 5px 0; font-size: 2.6rem; color: #333; }
        .hero-status p { color: #666; margin: 0; font-size: 1.1rem; }
        @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        .metrics-grid {
           display: flex; gap: 20px; width: 100%; max-width: 800px; margin-bottom: 30px;
        }
        .metric-card {
           flex: 1; background: #f8f9fa; padding: 20px; border-radius: 12px;
           box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 4px solid #ccc;
        }
        .metric-card:nth-child(1) { border-color: var(--primary); }
        .metric-card:nth-child(2) { border-color: var(--success); }
        .metric-card:nth-child(3) { border-color: var(--warning); }
        
        .m-label { display: block; font-size: 0.8rem; color: #888; font-weight: bold; margin-bottom: 5px; }
        .m-val { display: block; font-size: 2.2rem; color: #333; margin-bottom: 5px; }
        .m-sub { font-size: 0.75rem; color: #666; font-weight: bold; }
        .m-val.highlight { color: var(--primary); }

        .action-footer { display: flex; gap: 15px; }
        .primary-btn {
           background: var(--primary); color: #fff; border: none; padding: 12px 25px;
           border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s;
        }
        .primary-btn:hover { background: #008cb0; }
        .secondary-btn {
           background: transparent; color: #666; border: 2px solid #ddd; padding: 12px 25px;
           border-radius: 6px; font-weight: bold; cursor: pointer; transition: all 0.2s;
        }
        .secondary-btn:hover { border-color: #999; color: #333; }
        
        @media (max-width: 768px) {
           .metrics-grid { flex-direction: column; }
        }
        .rain-btn {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          background: rgba(0,0,0,0.6); color: #fff; border: 2px solid #fff;
          padding: 10px 20px; border-radius: 30px; cursor: pointer;
          font-weight: bold; font-size: 1rem; backdrop-filter: blur(5px);
          transition: all 0.2s; z-index: 10;
        }
        .rain-btn:hover { background: rgba(255,255,255,0.2); transform: translateX(-50%) scale(1.05); }
      `}</style>
    </div>
  );
}

export default App;
