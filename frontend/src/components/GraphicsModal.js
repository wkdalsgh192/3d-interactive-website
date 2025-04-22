import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';        

const GraphicsModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleNavigate = () => {
        navigate('/procedural-scene'); // Navigate to the procedural scene page
    };

    return (
        <>
            {/* First Modal - Graphics 3D */}
            <div className="modal" style={{ display: 'block' }}>
                <div 
                    className="header" 
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgb(0, 0, 0)), 
                        url("/images/toon-shaded-mongky.png")`
                    }}
                >
                    <div className="header-wrapper">
                        <div className="title projectheadline">3D Graphics</div>
                    </div>
                    <div className="button-round close" onClick={onClose}>
                        <i className="icon fa-solid fa-xmark fa-xl"></i>
                    </div>
                </div>
                <div className="modal-content-wrapper">
                    <h1 className="modal-subtitle">Advanced 3D Graphics rendering techniques.</h1>
                    
                    <h1>Understanding the Rendering Pipeline & Toon Shading</h1>
                    <p2>I wanted to explore how 3D graphics are rendered beyond surface-level implementation. I built an OpenGL-like renderer, processing 3D models into rasterized images, and developed a toon shader to achieve a stylized, hand-drawn aesthetic.</p2>

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
                                url: "/images/teapots/basic_teapot.png",
                                alt: "Basic Teapot"
                            },
                            {
                                url: "/images/teapots/rotated_teapot.png",
                                alt: "Rotated Teapot"
                            },
                            {
                                url: "/images/teapots/phong_shaded_teapot.png",
                                alt: "Phong Shaded Teapot"
                            },
                            {
                                url: "/images/teapots/texturized_teapot.png",
                                alt: "Texturized Teapot"
                            },
                            {
                                url: "/images/teapots/procedural_pattern_teapot.png",
                                alt: "Procedural Pattern Teapot"
                            }
                            
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
                    
                    <h1>Bridging the Gap Between Modeling & Rendering</h1>
                    <p2>While working on rendering projects, I realized that proper 3D models were essential for realistic rendering. To address this, I self-taught basic 3D modeling in Blender for seamless integration.</p2>
                
                    <img 
                        className="project-img" 
                        src="/images/toon-shaded-mongky.png"  // Update with your GIF path
                        alt="Web Development Process"
                        style={{
                            width: '100%',
                            maxWidth: '800px',
                            margin: '20px auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                    />
                    <img 
                        className="project-img" 
                        src="/images/mongky-modeling.jpg"  // Update with your GIF path
                        alt="Web Development Process"
                        style={{
                            width: '100%',
                            maxWidth: '800px',
                            margin: '20px auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                    />

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
                        Explore Procedural Scene
                    </button>
                </div>
            </div>
        </>
    );
};

export default GraphicsModal;