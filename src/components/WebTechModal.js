import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProjectModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Third Modal - Web Technology */}
            <div className="modal" style={{ display: 'block' }}>
                <div 
                    className="header" 
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgb(0, 0, 0)), 
                        url("https://cdn.sanity.io/images/jidqpryp/production/f91679151dd1c973c17b61dd9d2e0dc52a0b0ae7-1920x1280.jpg")`
                    }}
                >
                    <div className="header-wrapper">
                        <div className="title projectheadline">Modern Web Development</div>
                    </div>
                    <div className="button-round close" onClick={onClose}>
                        <i className="icon fa-solid fa-xmark fa-xl"></i>
                    </div>
                </div>
                <div className="modal-content-wrapper">
                    <h1 className="modal-subtitle"> Visual Design Tool that Satisfies the User</h1>

                    <img 
                        className="project-img" 
                        src="/images/intro.gif"  // Update with your GIF path
                        alt="Web Development Process"
                        style={{
                            width: '100%',
                            maxWidth: '800px',
                            margin: '20px auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                    />
                    
                    <h1>Enhancing Data Visualization in Web Apps</h1>
                    <p2>Users needed customizable data charts in their presentations, but handling XML-based chart rendering was challenging due to numerous custom elements. I optimized the process by analyzing D3.js source code, improving visualization rendering and user experience.</p2>

                    <img 
                        className="project-img" 
                        src="/images/chart-preview.gif"  // Update with your GIF path
                        alt="Web Development Process"
                        style={{
                            width: '100%',
                            maxWidth: '800px',
                            margin: '20px auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                    />
                    
                    <h1>Building a Scalable Data Pipeline for AI</h1>
                    <p2>As the system expanded, AI workloads required a unified data processing framework for images, multimedia, and labeled data. I refactored the legacy pipeline architecture, enabling seamless file conversions and processing, handling 10 billion multimedia files with a 97% success rate.</p2>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        className="teapot-swiper"
                    >
                        {[
                            {
                                url: "/images/multi-media-architecture.png",
                                alt: "Multi Media Architecture"
                            },
                            
                            // Add more images as needed
                        ].map((img, index) => (
                            <SwiperSlide key={index}>
                                <img 
                                    className="project-img" 
                                    src={img.url}
                                    alt={img.alt}
                                    style={{
                                        width: '100%',
                                        maxWidth: '800px',
                                        margin: '20px auto',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default ProjectModal; 