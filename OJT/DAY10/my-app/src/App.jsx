import reactlogo from "./assets/react.svg";
import Hello from "./Hello";
import FileUploader from "./FileUploader";
import './App.css';

function App() {
  const days = ['DAY1','DAY2','DAY4','DAY5','DAY6','DAY7','DAY8','DAY8.1','DAY9','DAY10','DAY10.1'];

  return (
    <div className="app-root">
      <header style={{display:'flex',alignItems:'center',gap:12}}>
        <img src={reactlogo} alt="React" style={{width:36,height:36}} />
        <h1>Day 10 - React Portfolio & File Uploader</h1>
      </header>

      <main>
        <section style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,alignItems:'start'}}>
          <div className="days-list" style={{gridColumn:'1 / -1'}}>
            <h2>Days</h2>
            {days.map(d => (
              <div key={d} className="day-row" style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 12px',border:'1px solid #eee',marginBottom:8}}>
                <span style={{fontWeight:600}}>{d}</span>
                {d === 'DAY1' ? (
                  <button onClick={() => window.open('../day1/index.html', '_blank')} style={{padding:'6px 10px'}}>Open / Uploader</button>
                ) : (
                  <a href={`../${d.toLowerCase()}/index.html`} target="_blank" rel="noreferrer">Open</a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{marginTop:30}}>
          <Hello />
        </section>
      </main>
    </div>
  )
}

export default App