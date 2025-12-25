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

  const nextStep = () => {
    if (currentStep < 5) {
      const step = steps[currentStep]; // Steps are 0-indexed in array but ID is +1? No, logic needs alignment.
      // Let's align: step 1 is index 0.
      // CurrentStep 0 -> Show Intro.
      // CurrentStep 1 -> Show Step 1.
      setCurrentStep(prev => prev + 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setLogs(["System Initialized. Re-scanning..."]);
    setWaterLevel(20);
  };

  useEffect(() => {
    if (currentStep > 0 && currentStep <= 5) {
      const stepData = steps[currentStep - 1];
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${stepData.log}`]);

      // Step specific logic
      if (currentStep === 1) {
        // Water rising simulation
        const interval = setInterval(() => {
          setWaterLevel(prev => Math.min(prev + 5, 85)); // Slower rise for better visual effect
        }, 800);
        return () => clearInterval(interval);
      }
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
              <div className="pulse-circle"></div>
              <button className="start-btn" onClick={nextStep}>INITIATE SIMULATION</button>
            </div>
          )}

          {currentStep === 1 && (
            <div className="step-view animate-fade-in">
              <h3>Meraki MV72 Analysis</h3>
              <div className="step1-layout">
                <div className="camera-feed" style={{ backgroundImage: `url(${getCCTVImage()})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  {/* Clean Feed - No Overlays */}
                </div>

                <div className="side-gauge-panel glass-panel">
                  <h4>Water Level</h4>
                  <div className="liquid-gauge-container">
                    <div className="liquid-gauge-tube">
                      <div className="liquid-fill" style={{
                        height: `${waterLevel}%`,
                        backgroundColor: waterLevel > 70 ? 'var(--danger)' : waterLevel > 40 ? 'var(--warning)' : 'var(--success)',
                        boxShadow: `0 0 20px ${waterLevel > 70 ? 'var(--danger)' : waterLevel > 40 ? 'var(--warning)' : 'var(--success)'}`
                      }}>
                        <div className="liquid-surface"></div>
                      </div>

                      {/* Markers */}
                      <div className="gauge-marker danger" style={{ bottom: '70%' }}><span>CRITICAL (4.0m)</span></div>
                      <div className="gauge-marker warning" style={{ bottom: '40%' }}><span>WARNING (2.5m)</span></div>
                      <div className="gauge-marker normal" style={{ bottom: '20%' }}><span>NORMAL (1.0m)</span></div>
                    </div>
                    <div className="gauge-value-display">
                      {(waterLevel / 20).toFixed(1)}m
                    </div>
                  </div>
                </div>
              </div>

              <div className="metric-row">
                <div className="metric">Status: <span className={waterLevel > 40 ? "blink" : ""}>{waterLevel > 70 ? 'CRITICAL ALERT' : waterLevel > 40 ? 'RISING' : 'STABLE'}</span></div>
                <div className="code-block-mini">
                  <pre>{`{ "id": "MV72", "lvl": ${(waterLevel / 20).toFixed(2)}, "ts": "${new Date().toLocaleTimeString()}" }`}</pre>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-view animate-fade-in">
              <h3>ThousandEyes Network Path</h3>
              <div className="network-graph">
                <div className="node node-start">CAM</div>
                <div className="link link-bad"></div>
                <div className="node node-mid warning">ISP_HUB</div>
                <div className="link link-broken"></div>
                <div className="node node-end">SPLUNK</div>
                <div className="alert-box">PACKET LOSS 98%</div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-view animate-fade-in">
              <h3>Splunk Intelligence</h3>
              <div className="dashboard-grid">
                <div className="dash-card">
                  <h4>API WEATHER</h4>
                  <div className="data-val">HEAVY RAIN</div>
                </div>
                <div className="dash-card warning">
                  <h4>SENSOR DATA</h4>
                  <div className="data-val">4.2m (+30%)</div>
                </div>
                <div className="dash-card danger">
                  <h4>PREDICTION</h4>
                  <div className="data-val">FAIL &lt; 5MIN</div>
                </div>
              </div>
              <div className="ai-insight">AI RECOMMENDATION: <strong>REROUTE TRAFFIC</strong></div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="step-view animate-fade-in">
              <h3>Agentic AI Execution</h3>
              <div className="network-switch">
                <div className="satellite-icon">🛰️ STARLINK ACTIVE</div>
                <div className="path-animation">
                  <div className="packet"></div>
                  <div className="packet"></div>
                  <div className="packet"></div>
                </div>
                <div className="status-log">
                  <div>Legacy Path: <span className="red">FAILED</span></div>
                  <div>SD-WAN Policy: <span className="green">UPDATED</span></div>
                  <div>New Latency: 45ms</div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="step-view animate-fade-in">
              <h3>Final Resolution</h3>
              <div className="rescue-scene">
                <div className="person-box">
                  <div className="focus-brackets"></div>
                  <span className="label">HUMAN DETECTED (98%)</span>
                </div>
                <div className="map-path">
                  <div className="waypoint">CAM</div>
                  <div className="line-ok"></div>
                  <div className="waypoint">RESCUE</div>
                </div>
                <div className="success-message">COORDINATES SENT</div>
              </div>
              <button className="reset-btn" onClick={reset}>RESET SYSTEM</button>
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
            {currentStep > 0 && currentStep < 5 && (
              <button className="next-btn" onClick={nextStep}>NEXT STAGE &rarr;</button>
            )}
          </div>
        </div>
      </main>

      <style>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 20px;
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .header {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header h1 { font-size: 1.5rem; margin: 0; }
        
        .main-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
        }
        .visualization-area {
          flex: 1;
          min-height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: rgba(0,0,0,0.5);
        }
        
        .dashboard-footer {
          display: flex;
          gap: 20px;
          height: 250px;
        }
        
        /* Step 1 Styles */
        /* Step 1 Styles */
        .step1-layout {
          display: flex;
          gap: 30px; /* Increased gap */
          height: 100%;
          align-items: stretch;
          width: 100%;
        }

        .camera-feed {
          flex: 3; /* Increased from 2 to make it wider */
          height: 350px;
          border: 2px solid #ccc;
          position: relative;
          background: #333;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          min-width: 500px; /* Increased min-width */
        }

        .side-gauge-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          min-width: 200px; /* Increased min-width */
          background: rgba(255, 255, 255, 0.4);
          border-radius: 8px;
        }

        .side-gauge-panel h4 {
          margin-bottom: 20px;
          font-size: 1.2rem; /* Larger title */
          color: var(--text-muted);
        }

        .liquid-gauge-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          width: 100%;
        }

        .liquid-gauge-tube {
          width: 120px; /* Doubled width from 60px */
          flex: 1;
          background: rgba(200, 200, 200, 0.2);
          border-radius: 60px; /* Increased radius to match new width */
          border: 1px solid rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
          margin-bottom: 10px;
          box-shadow: inset 0 0 15px rgba(0,0,0,0.1);
        }

        .liquid-fill {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          transition: height 0.5s ease-out, background-color 0.5s ease;
          border-radius: 0 0 60px 60px; /* Match tube radius */
        }
        
        .liquid-surface {
          position: absolute;
          top: 0; left: 0; right: 0; height: 10px;
          background: rgba(255,255,255,0.4);
          border-radius: 50%;
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
          right: 5px;
          bottom: 2px;
          white-space: nowrap;
          font-weight: bold;
          text-shadow: 0 0 2px rgba(255,255,255,0.8);
        }

        .gauge-value-display {
          font-size: 2rem;
          font-weight: bold;
          font-family: var(--font-display);
          color: var(--primary-dark);
        }
        
        .metric-row {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-top: 15px;
           background: rgba(255,255,255,0.5);
           padding: 10px 20px;
           border-radius: 8px;
           width: 100%;
        }
        .code-block-mini { font-family: monospace; font-size: 0.8rem; color: var(--text-muted); }
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
        .network-graph { display: flex; align-items: center; gap: 20px; position: relative; }
        .node { width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--primary); display:grid; place-items:center; font-size: 0.7rem; z-index:2; background:#000;}
        .link { width: 100px; height: 2px; background: var(--primary); }
        .link-bad { background: var(--danger); }
        .link-broken { border-top: 2px dashed var(--danger); background: transparent; height: 0; width: 100px;}
        .alert-box { position: absolute; top: -40px; left: 50%; transform: translateX(-50%); color: var(--danger); font-weight: bold; animation: pulse 1s infinite; }
        
        /* Step 3 Styles */
        .dashboard-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; width: 100%; max-width: 600px; }
        .dash-card { border: 1px solid var(--primary); padding: 20px; text-align: center; }
        .dash-card.warning { border-color: var(--warning); color: var(--warning); }
        .dash-card.danger { border-color: var(--danger); color: var(--danger); }
        .data-val { font-size: 1.5rem; font-weight: bold; margin-top: 10px; }
        
        /* Step 4 Styles */
        .network-switch { text-align: center; }
        .satellite-icon { font-size: 3rem; margin-bottom: 20px; animation: pulse 3s infinite; }
        .path-animation { width: 300px; height: 10px; background: #333; margin: 20px auto; position: relative; border-radius: 5px; overflow: hidden; }
        .packet { width: 20px; height: 100%; background: var(--success); position: absolute; animation: moveRight 1s linear infinite; }
        .packet:nth-child(2) { animation-delay: 0.3s; }
        .packet:nth-child(3) { animation-delay: 0.6s; }
        @keyframes moveRight { from { left: -20px; } to { left: 100%; } }
        
        /* General Layout */
        .log-panel { flex: 2; padding: 20px; overflow: hidden; display: flex; flex-direction: column; }
        .controls-panel { flex: 1; padding: 20px; display: flex; flex-direction: column; justify-content:space-between; }
        
        .log-window { flex: 1; overflow-y: auto; font-family: monospace; font-size: 0.9rem; color: var(--text-muted); }
        .log-entry { margin-bottom: 5px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 2px; }
        .log-caret { color: var(--primary); margin-right: 8px; }
        
        .step-indicator { display: flex; flex-direction: column; gap: 15px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; background: #333; display: flex; align-items: center; position: relative; }
        .dot.active { background: var(--primary); box-shadow: 0 0 10px var(--primary); }
        .step-label { position: absolute; left: 25px; white-space: nowrap; font-size: 0.9rem; font-weight: bold; color: var(--primary); }
        
        button.start-btn, button.next-btn, button.reset-btn {
           background: var(--primary); border: none; padding: 15px 30px; font-weight: bold; font-size: 1rem; color: #000; clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%); transition: all 0.3s;
        }
        button.next-btn:hover { background: #fff; box-shadow: 0 0 20px var(--primary); }
        button.reset-btn { background: var(--success); }

        .intro-screen { text-align: center; }
        .pulse-circle { width: 100px; height: 100px; background: rgba(0, 240, 255, 0.1); border-radius: 50%; border: 2px solid var(--primary); margin: 30px auto; animation: pulse 2s infinite; }
        
        @media (max-width: 768px) {
           .dashboard-footer { flex-direction: column; height: auto; }
           .log-panel, .controls-panel { height: 250px; }
        }
      `}</style>
    </div>
  );
}

export default App;
