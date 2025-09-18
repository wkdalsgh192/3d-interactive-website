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
                    {/* <h1 className="modal-subtitle">Interactive Visual Chart</h1> */}
                    
                    <h1>Overview</h1>
                    <img 
                        className="project-img" 
                        src="/images/chart.png"  // Update with your GIF path
                        alt="Web Development Process"
                        style={{
                            width: '100%',
                            maxWidth: '800px',
                            margin: '20px auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                    />
                    <p2>
                        The component mounts and begins by fetching country metadata from your backend. It then clears out any existing SVG charts in the container to prevent duplicates and proceeds to render updated area charts for each country. 
                        Once the 2D charts are complete, it renders a 3D chart using the combined dataset.
                    </p2>
                    <p2>
                        Creates an off-screen SVG using D3 to convert a country's population data into a scalable visual representation. It parses year values for the x-axis using a time scale and maps population numbers to the y-axis using a power scale. These axes define the shape of an area chart, which is rendered as a path element. 
                        Though the SVG is hidden and non-interactive, it serves as a data source for generating 3D geometry based on the chart’s scaled shape.
                    </p2>
                    
                    <h1>Interactive Visualization</h1>
                    <img 
                        className="project-img" 
                        src="/images/ray-casting.png"  // Update with your GIF path
                        alt="Web Development Process"
                        style={{
                            width: '100%',
                            maxWidth: '800px',
                            margin: '20px auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                    />
                    
                    <p2> 
                        Identifies and interacts with a selected 3D mesh by using raycasting to detect which object was clicked within the scene. It begins by preventing rapid repeated clicks with a short debounce. If a mesh was previously selected, it resets its position and hides the data display. 
                        Then, it calculates the mouse position relative to the canvas, casts a ray into the 3D scene, and filters intersected objects to target only those marked as chart element. A styled information box is updated with the country name, flag, and population, and the selected mesh is animated outward to visually distinguish it from the rest.
                    </p2>

                    <img 
                        className="project-img" 
                        src="/images/chart-preview.png"  // Update with your GIF path
                        alt="Web Development Process"
                        style={{
                            width: '100%',
                            maxWidth: '800px',
                            margin: '20px auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                    />
                
                </div>
        </div>
        </>
    );
};

export default DataVisualsModal;