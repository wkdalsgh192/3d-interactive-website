import React from 'react';

const ProjectPopup = ({ position, thumbnail, title, subtitle, onClickView }) => {
    return (
        <div 
            className="popup project"
            style={{
                position: 'absolute',
                left: position,
            }}
        >
            <div className="content">
                <img 
                    className="thumbnail" 
                    src={thumbnail}
                    alt="Project thumbnail"
                />
                <div className="text">
                    <h2 className="projecttitle">{title}</h2>
                    <p className="subtitle">{subtitle}</p>
                </div>
            </div>
            <button 
                className="button primary"
                onClick={onClickView}
            >
                View Project <i className="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    );
};

export default ProjectPopup; 