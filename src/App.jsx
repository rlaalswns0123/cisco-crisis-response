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
              <h3>2. Monitoring: Network Anomaly Detection</h3>
              <div className="step2-layout">
                {/* Left: Network Path Visualization */}
                <div className="network-path-panel glass-panel">
                  <div className="path-row">
                    <div className="node-container">
                      <div className="tech-node normal">
                        <span className="icon">📷</span>
                        <span className="name">CAM 01</span>
                      </div>
                      <div className="status-dot online"></div>
                    </div>

                    <div className="link-segment">
                      <div className="cable normal">
                        <div className="packet-flow"></div>
                      </div>
                      <div className="latency-tag">12ms</div>
                    </div>

                    <div className="node-container">
                      <div className="tech-node warning">
                        <span className="icon">📡</span>
                        <span className="name">ISP HUB</span>
                      </div>
                      <div className="status-dot warning"></div>
                    </div>

                    <div className="link-segment">
                      <div className="cable broken"></div>
                      <div className="latency-tag error">TIMEOUT</div>
                    </div>

                    <div className="node-container">
                      <div className="tech-node offline">
                        <span className="icon">☁️</span>
                        <span className="name">SPLUNK</span>
                      </div>
                      <div className="status-dot offline"></div>
                    </div>
                  </div>
                  <div className="network-stat">
                    <span>PATH STATUS:</span> <strong className="danger">CRITICAL FAILURE</strong>
                  </div>
                </div>

                {/* Right: Data Loss Analysis */}
                <div className="analysis-panel glass-panel">
                  <h4>Data Loss Real-time Analysis</h4>
                  <div className="chart-container">
                    <div className="chart-grid">
                      <div className="bar" style={{ height: '10%' }}></div>
                      <div className="bar" style={{ height: '15%' }}></div>
                      <div className="bar" style={{ height: '12%' }}></div>
                      <div className="bar" style={{ height: '8%' }}></div>
                      <div className="bar danger" style={{ height: '98%' }}></div>
                      <div className="bar danger" style={{ height: '95%' }}></div>
                      <div className="bar danger" style={{ height: '99%' }}></div>
                    </div>
                    <div className="chart-overlay">
                      <div className="spike-alert">
                        ⚠️ SUDDEN SPIKE
                      </div>
                    </div>
                  </div>
                  <div className="metric-box danger">
                    <div className="metric-label">PACKET LOSS</div>
                    <div className="metric-value">98.2%</div>
                  </div>
                  <div className="metric-desc">
                    Rapid data loss detected due to physical infrastructure submersion.
                  </div>
                </div>
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
        .analysis-panel h4 { margin: 0 0 15px 0; font-size: 0.9rem; color: #333; border-bottom: 1px solid #eee; padding-bottom: 5px; }
        
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
        .metric-desc { font-size: 0.8rem; color: #777; line-height: 1.4; }
        
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
        
        @media (max-width: 768px) {
           .dashboard-footer { flex-direction: column; height: auto; }
           .log-panel, .controls-panel { height: 250px; }
        }
      `}</style>
    </div>
  );
}

export default App;
