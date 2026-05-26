import React, { useState, useEffect, useRef, useCallback } from 'react';
import './FileUploader.css';

// SVG Icons for clean, crisp, custom visual styling
const Icons = {
  CloudUpload: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 13v8M12 13l-4 4M12 13l4-4" />
      <path d="M20.38 8.57A9 9 0 0 0 3.73 9H3a5 5 0 0 0 0 10h11.5" />
    </svg>
  ),
  File: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Pdf: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <text x="6" y="18" fontSize="6" fontWeight="bold" fill="currentColor">PDF</text>
    </svg>
  ),
  Image: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  Archive: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  ),
  Audio: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  Video: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  Play: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Pause: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
  Trash: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Refresh: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Check: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  StatsFiles: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  StatsSpeed: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  StatsSize: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  )
};

export default function FileUploader() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'avatar'
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [history, setHistory] = useState([
    { id: 'h1', name: 'corporate_pitch.pdf', size: '4.8 MB', date: 'Just now', type: 'application/pdf' },
    { id: 'h2', name: 'hero_background.jpg', size: '2.1 MB', date: '5 mins ago', type: 'image/jpeg', preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=60' },
  ]);

  const fileInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  // Helper function to format file sizes nicely
  const formatBytes = (bytes, decimals = 1) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // Identify file type to choose correct styling & icon
  const getFileTypeCategory = (type, name) => {
    if (type.startsWith('image/')) return 'image';
    if (type === 'application/pdf') return 'pdf';
    if (type.includes('zip') || type.includes('tar') || type.includes('rar') || type.includes('7z')) return 'archive';
    if (type.startsWith('audio/')) return 'audio';
    if (type.startsWith('video/')) return 'video';
    if (type.includes('word') || type.includes('document') || name.endsWith('.docx') || name.endsWith('.doc')) return 'document';
    return 'default';
  };

  const getFileIcon = (category) => {
    switch (category) {
      case 'image': return <Icons.Image />;
      case 'pdf': return <Icons.Pdf />;
      case 'archive': return <Icons.Archive />;
      case 'audio': return <Icons.Audio />;
      case 'video': return <Icons.Video />;
      case 'document': return <Icons.File />;
      default: return <Icons.File />;
    }
  };

  // Mock Upload Process Stream
  useEffect(() => {
    const interval = setInterval(() => {
      setFiles((prevFiles) => {
        let hasChanges = false;
        const nextFiles = prevFiles.map((file) => {
          if (file.status === 'uploading') {
            hasChanges = true;
            const step = Math.floor(Math.random() * 15) + 5; // upload step 5% to 20%
            const nextProgress = Math.min(file.progress + step, 100);
            
            // Randomly trigger mock failures (5% chance) for high interaction fidelity
            const isFailed = nextProgress < 100 && Math.random() < 0.03;

            let nextStatus = 'uploading';
            let speed = file.speed;
            let timeLeft = file.timeLeft;

            if (isFailed) {
              nextStatus = 'failed';
              speed = '0 KB/s';
              timeLeft = 'Failed';
            } else if (nextProgress === 100) {
              nextStatus = 'success';
              speed = 'Complete';
              timeLeft = '0s';

              // Push to history when finished
              const historyItem = {
                id: 'h_' + Date.now() + Math.random().toString(36).substr(2, 4),
                name: file.name,
                size: formatBytes(file.size),
                date: 'Just now',
                type: file.type,
                preview: file.preview
              };
              setHistory(h => [historyItem, ...h]);
            } else {
              // Calculate dynamic uploading meta values
              const currentSpeed = (Math.random() * 1.5 + 0.5).toFixed(1);
              speed = `${currentSpeed} MB/s`;
              const remainingBytes = file.size * (1 - nextProgress / 100);
              const remainingSec = Math.ceil(remainingBytes / (currentSpeed * 1024 * 1024));
              timeLeft = remainingSec > 60 ? `${Math.ceil(remainingSec / 60)}m left` : `${remainingSec}s left`;
            }

            return {
              ...file,
              progress: nextProgress,
              status: nextStatus,
              speed,
              timeLeft,
            };
          }
          return file;
        });

        return hasChanges ? nextFiles : prevFiles;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Handle files when dropped or browsed
  const processFiles = useCallback((selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const limit = 52428800; // 50MB Size Limit
    const newItems = Array.from(selectedFiles).map((file) => {
      // Create local image preview if file is image
      let preview = null;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      // Check if file exceeds limit
      const exceeds = file.size > limit;

      return {
        id: 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: exceeds ? 0 : 0,
        status: exceeds ? 'failed' : 'uploading',
        speed: exceeds ? '0 KB/s' : 'Starting...',
        timeLeft: exceeds ? 'Exceeds 50MB Limit' : 'Calculating...',
        preview,
      };
    });

    setFiles((prev) => [...newItems, ...prev]);
  }, []);

  // Drag Events Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  // Queue item interaction triggers
  const pauseUpload = (id) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'paused', speed: 'Paused', timeLeft: '--' } : f));
  };

  const resumeUpload = (id) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'uploading', speed: 'Resuming...', timeLeft: 'Calculating...' } : f));
  };

  const deleteFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const retryUpload = (id) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'uploading', progress: 0, speed: 'Retrying...', timeLeft: 'Calculating...' } : f));
  };

  const clearAll = () => {
    setFiles([]);
  };

  // Avatar Upload simulation
  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const preview = URL.createObjectURL(file);
      setAvatarLoading(true);
      setAvatar(preview);
      
      // Simulate profile picture uploading
      setTimeout(() => {
        setAvatarLoading(false);
        // Add to history log
        setHistory(h => [{
          id: 'av_' + Date.now(),
          name: file.name + ' (Profile)',
          size: formatBytes(file.size),
          date: 'Just now',
          type: file.type,
          preview
        }, ...h]);
      }, 2000);
    }
  };

  // Calculations for Stats Bar
  const totalUploadedBytes = history.reduce((sum, item) => {
    const parsed = parseFloat(item.size);
    const multiplier = item.size.includes('MB') ? 1024 * 1024 : item.size.includes('KB') ? 1024 : 1;
    return sum + (isNaN(parsed) ? 0 : parsed * multiplier);
  }, 0);

  const averageSpeed = files.filter(f => f.status === 'uploading').length > 0
    ? (files.filter(f => f.status === 'uploading').reduce((sum, f) => sum + parseFloat(f.speed || 0), 0) / files.filter(f => f.status === 'uploading').length).toFixed(1) + ' MB/s'
    : '0 MB/s';

  return (
    <div className="uploader-container">
      {/* Dashboard Top Header */}
      <div className="uploader-header">
        <h2>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle'}}>
            <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.3-2-1.8-3.6-3.8-3.9-1-.2-2.1 0-3 .5-1-1.6-2.6-2.7-4.6-2.7-2.6 0-4.8 2-5 4.6C3.2 10.1 2 11.9 2 14c0 2.8 2.2 5 5 5h13c1.7 0 3-1.3 3-3z"/>
          </svg>
          ApexCloud Uploader
        </h2>
        <div className="uploader-tabs">
          <button 
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            File Dashboard
          </button>
          <button 
            className={`tab-btn ${activeTab === 'avatar' ? 'active' : ''}`}
            onClick={() => setActiveTab('avatar')}
          >
            Avatar Uploader
          </button>
        </div>
      </div>

      {/* Stats Counter Panel */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><Icons.StatsFiles /></div>
          <div className="stat-info">
            <span className="stat-label">Total Files</span>
            <span className="stat-value">{history.length}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Icons.StatsSize /></div>
          <div className="stat-info">
            <span className="stat-label">Uploaded Volume</span>
            <span className="stat-value">{formatBytes(totalUploadedBytes)}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Icons.StatsSpeed /></div>
          <div className="stat-info">
            <span className="stat-label">Current Speed</span>
            <span className="stat-value">{averageSpeed}</span>
          </div>
        </div>
      </div>

      {/* Main Tab Contents */}
      {activeTab === 'dashboard' ? (
        <>
          {/* Drag & Drop Area */}
          <div 
            className={`dropzone ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <div className="dropzone-icon-wrap">
              <span className="cloud-upload-icon"><Icons.CloudUpload /></span>
            </div>
            <div className="dropzone-text">
              <h3>Drag and drop your files here</h3>
              <p>Supports PDFs, Images, Archives, Audio, Video (Up to 50MB)</p>
              <button 
                type="button" 
                className="browse-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current.click();
                }}
              >
                Browse Files
              </button>
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              className="file-input-hidden" 
              multiple 
              onChange={handleFileChange}
            />
          </div>

          {/* Upload Queue Section */}
          {files.length > 0 && (
            <div className="upload-queue-section">
              <div className="section-subtitle">
                <span>Active Uploads ({files.length})</span>
                <button className="clear-all-btn" onClick={clearAll}>Clear Queue</button>
              </div>

              <div className="queue-list">
                {files.map((file) => {
                  const category = getFileTypeCategory(file.type, file.name);
                  return (
                    <div className="queue-item" key={file.id}>
                      {file.preview ? (
                        <img 
                          src={file.preview} 
                          alt="preview" 
                          className="file-icon-container" 
                          style={{objectFit: 'cover'}}
                        />
                      ) : (
                        <div className={`file-icon-container file-icon-${category}`}>
                          {getFileIcon(category)}
                        </div>
                      )}

                      <div className="file-details-container">
                        <div className="file-row-meta">
                          <span className="file-name-text" title={file.name}>{file.name}</span>
                          <span className="file-size-text">{formatBytes(file.size)}</span>
                        </div>

                        <div className="progress-track">
                          <div 
                            className={`progress-bar-fill ${file.status}`} 
                            style={{width: `${file.progress}%`}}
                          />
                        </div>

                        <div className="file-status-row">
                          <span className={`status-label-pill ${file.status}`}>
                            {file.status === 'uploading' && `Uploading... ${file.progress}%`}
                            {file.status === 'paused' && 'Paused'}
                            {file.status === 'success' && 'Completed'}
                            {file.status === 'failed' && (file.size > 52428800 ? 'Size Limit Exceeded' : 'Failed')}
                          </span>
                          <span>
                            {file.status === 'uploading' && `${file.speed} • ${file.timeLeft}`}
                            {file.status === 'paused' && 'Idle'}
                            {file.status === 'success' && 'Saved'}
                            {file.status === 'failed' && '--'}
                          </span>
                        </div>
                      </div>

                      {/* Interactive Buttons for Uploader Management */}
                      <div className="file-actions-wrap">
                        {file.status === 'uploading' && (
                          <button 
                            className="icon-action-btn" 
                            title="Pause Upload"
                            onClick={() => pauseUpload(file.id)}
                          >
                            <Icons.Pause />
                          </button>
                        )}
                        {file.status === 'paused' && (
                          <button 
                            className="icon-action-btn" 
                            title="Resume Upload"
                            onClick={() => resumeUpload(file.id)}
                          >
                            <Icons.Play />
                          </button>
                        )}
                        {file.status === 'failed' && file.size <= 52428800 && (
                          <button 
                            className="icon-action-btn" 
                            title="Retry Upload"
                            onClick={() => retryUpload(file.id)}
                          >
                            <Icons.Refresh />
                          </button>
                        )}
                        <button 
                          className="icon-action-btn delete-btn" 
                          title="Remove File"
                          onClick={() => deleteFile(file.id)}
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Circular Avatar Profile View */
        <div className="profile-uploader-panel">
          <div 
            className="avatar-upload-circle"
            onClick={() => avatarInputRef.current.click()}
          >
            {avatar ? (
              <img src={avatar} alt="Avatar Preview" className="avatar-preview-img" />
            ) : (
              <div style={{textAlign:'center', padding: '10px', color: '#c084fc'}}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom:'8px'}}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <div style={{fontSize:'11px', fontWeight:'600'}}>UPLOAD</div>
              </div>
            )}

            <div className="avatar-overlay-text">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom:'4px'}}>
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span>Change Photo</span>
            </div>

            {avatarLoading && (
              <div className="avatar-overlay-text" style={{opacity: 1, background: 'rgba(0,0,0,0.75)'}}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  border: '3px solid rgba(192, 132, 252, 0.3)',
                  borderTop: '3px solid #c084fc',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '8px'
                }} />
                <span>Uploading...</span>
              </div>
            )}
            
            <input 
              ref={avatarInputRef}
              type="file" 
              accept="image/*" 
              className="file-input-hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="profile-info-text">
            <h3>Profile Picture Uploader</h3>
            <p>Upload a high-resolution square photo. Supports PNG, JPG, or GIF up to 5MB. Photo will be scaled and cropped dynamically.</p>
          </div>
          
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* Uploaded History Logs Section */}
      <div className="history-section">
        <h3 className="section-subtitle" style={{marginBottom:'15px'}}>Successfully Uploaded ({history.length})</h3>
        <div className="history-grid">
          {history.map((item) => (
            <div className="history-card" key={item.id}>
              {item.preview ? (
                <img src={item.preview} alt="history preview" className="history-card-img" />
              ) : (
                <div className={`history-card-img file-icon-container file-icon-${getFileTypeCategory(item.type, item.name)}`} style={{width:'44px', height:'44px', fontSize:'18px'}}>
                  {getFileIcon(getFileTypeCategory(item.type, item.name))}
                </div>
              )}
              <div className="history-details">
                <h4>{item.name}</h4>
                <span>{item.size} • {item.date}</span>
              </div>
              <div className="history-action-links">
                <span style={{color:'#34d399', fontSize:'12px', display:'flex', alignItems:'center', gap:'4px', fontWeight:'600'}}>
                  <Icons.Check /> Done
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
