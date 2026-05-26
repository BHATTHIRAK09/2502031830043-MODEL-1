import reactLogo from './assets/react.svg'
import './App.css'
import Hello from './Hello'
import Bye from './Bye'
import FileUploader from './FileUploader'

function App() {
  return (
    <div style={{ padding: '20px 10px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <header style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '10px 0 5px' }}>Day 9 - React Portfolio & File Uploader</h1>
        <p style={{ color: 'var(--text)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
          On-Job Training (OJT) Project showcasing custom React components and premium UI workflows.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '15px' }}>
          <Hello name="Hirak" />
          <span style={{ color: 'var(--border)' }}>|</span>
          <Bye />
        </div>
      </header>

      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <FileUploader />
      </main>

      <footer style={{ marginTop: '40px', borderTop: '1px solid var(--border)', paddingTop: '20px', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text)' }}>
          <span>Powered by React 19</span>
          <img src={reactLogo} alt="React logo" style={{ height: '16px', width: 'auto' }} />
          <span>&amp; Vite</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text)', marginTop: '5px' }}>
          &copy; 2026 Hirak. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default App

