import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProjectModal = ({ 
    isOpen, 
    onClose,
    headerImage,
    title,
    subtitle,
    videoUrl,
    challenge,
    result,
    images = [],
    carouselImages = [],
    component: Component
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal" style={{ display: 'block' }}>
            <div 
                className="header" 
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgb(0, 0, 0)), 
                    url("${headerImage}")`
                }}
            >
                <div className="header-wrapper">
                    <div className="title projectheadline">{title}</div>
                </div>
                <div className="button-round close" onClick={onClose}>
                    <i className="icon fa-solid fa-xmark fa-xl"></i>
                </div>
            </div>
            <div className="modal-content-wrapper">
                <h1 className="modal-subtitle">{subtitle}</h1>
                
                {videoUrl && (
                    <div className="embed-container">
                        <iframe 
                            className="video" 
                            src={videoUrl}
                            width="640" 
                            height="360" 
                            frameBorder="0" 
                            allowFullScreen
                            title={`${title} Video`}
                        ></iframe>
                    </div>
                )}
                
                <h1>Challenge</h1>
                <p2>{challenge}</p2>

                {Component && (
                    <div style={{ width: '100%', height: '500px', margin: '0' }}>
                        <Component />
                    </div>
                )}
                
                {images.map((img, index) => (
                    <img 
                        key={index}
                        className="project-img" 
                        src={img.url}
                        alt={img.alt || "Project"}
                    />
                ))}
                
                <h1>Result</h1>
                <p2>{result}</p2>
                
                {carouselImages.length > 0 && (
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        className="teapot-swiper"
                    >
                        {carouselImages.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img 
                                    className="project-img" 
                                    src={img.url}
                                    alt={img.alt || `Slide ${index + 1}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default ProjectModal; 