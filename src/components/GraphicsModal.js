import React from 'react';
import PopulationModel from '../models/PopulationModel';            

const GraphicsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            {/* First Modal - Graphics 3D */}
            <div className="modal" style={{ display: 'block' }}>
                <div 
                    className="header" 
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgb(0, 0, 0)), 
                        url("https://cdn.sanity.io/images/jidqpryp/production/f91679151dd1c973c17b61dd9d2e0dc52a0b0ae7-1920x1280.jpg")`
                    }}
                >
                    <div className="header-wrapper">
                        <div className="title projectheadline">Graphics 3D</div>
                    </div>
                    <div className="button-round close" onClick={onClose}>
                        <i className="icon fa-solid fa-xmark fa-xl"></i>
                    </div>
                </div>
                <div className="modal-content-wrapper">
                    <h1 className="modal-subtitle">3D Graphics and Animation Projects</h1>
                    
                    <h1>Understanding the Rendering Pipeline & Toon Shading</h1>
                    <p2>I wanted to explore how 3D graphics are rendered beyond surface-level implementation. I built an OpenGL-like renderer, processing 3D models into rasterized images, and developed a toon shader to achieve a stylized, hand-drawn aesthetic.</p2>

                    {/* <div style={{ width: '100%', height: '500px', margin: '20px 0' }}>
                        <PopulationModel />
                    </div> */}
                    
                    <h1>Bridging the Gap Between Modeling & Rendering</h1>
                    <p2>While working on rendering projects, I realized that proper 3D models were essential for realistic rendering. To address this, I self-taught 3D modeling in Blender, creating assets in OBJ/GLB/GLTF formats for seamless integration.</p2>
                </div>
            </div>
        </>
    );
};

export default GraphicsModal;