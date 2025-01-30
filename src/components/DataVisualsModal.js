import React from 'react';
import { useNavigate } from 'react-router-dom';

const DataVisualsModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate(); // Initialize useHistory
    
    if (!isOpen) return null;

    const handleNavigate = () => {
        navigate('/visualization'); // Navigate to the visualization page
    };


    return (
        <>
            {/* Second Modal - Data Visualization */}
            <div className="modal" style={{ display: 'block' }}>
                <div 
                    className="header" 
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgb(0, 0, 0)), 
                        url("/images/dashboard.png")`
                    }}
                >
                    <div className="header-wrapper">
                        <div className="title projectheadline">Data Visualization</div>
                    </div>
                    <div className="button-round close" onClick={onClose}>
                        <i className="icon fa-solid fa-xmark fa-xl"></i>
                    </div>
                </div>
                <div className="modal-content-wrapper">
                    <h1 className="modal-subtitle">Interactive Data Visualization Dashboard</h1>
                    
                    <h1>Scaling Admin Tools for 8M+ Users</h1>
                    <p2>The admin panel lacked a centralized dashboard for tracking key business metrics. I designed and built a real-time analytics dashboard, integrating revenue, user groups, and data usage. I also proposed a customizable charting system, though it was not implemented due to cost constraints.</p2>

                    <img 
                        className="project-img" 
                        src="/images/dashboard.png"  // Update with your GIF path
                        alt="Web Development Process"
                        style={{
                            width: '100%',
                            maxWidth: '800px',
                            margin: '20px auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                    />

                    {/* <div style={{ width: '100%', height: '500px', margin: '20px 0' }}>
                        <DashboardModel />
                    </div> */}
                    
                    <h1>Exploring Interactive 3D Data Visualization</h1>
                    <p2> Inspired by the limitations of traditional dashboards, I started a side project to explore interactive 3D charts, experimenting with new ways to visually represent complex datasets.</p2>
                
                    <button 
                        onClick={handleNavigate} 
                        style={{
                            padding: '10px 20px',
                            marginTop: '20px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Go to Visualization
                    </button>
                </div>
        </div>
        </>
    );
};

export default DataVisualsModal;