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
                        url("/images/notification_system.png")`
                    }}
                >
                    <div className="header-wrapper">
                        <div className="title projectheadline">Real-Time Notification System</div>
                    </div>
                    <div className="button-round close" onClick={onClose}>
                        <i className="icon fa-solid fa-xmark fa-xl"></i>
                    </div>
                </div>
                <div className="modal-content-wrapper">
                    <h1 className="modal-subtitle"> Enhancing Engagement and Reliability with Asynchronous Messaging</h1>

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
                    
                    <div>
                        <h1>Requirements</h1>
                        <p2>A real-time multi-channel notification system must support email, SMS, push, and in-app notifications while ensuring seamless communication across diverse user segments.</p2>
                        <br/>
                        <p2>Key features for reliable and efficient notifications include message prioritization, real-time processing, delivery tracking, retries, and API integration. Additionally, it should support template management, localization, and personalization to enhance user engagement.</p2>
                    </div>

                    <div>
                        <h1>Key Design Considerations</h1>
                        <ul>
                            <li><p2><b>Scalability & High Traffic Handling</b></p2></li>
                            <li><p2><b>Low-Latency Delivery</b></p2></li>
                            <li><p2><b>Logging & Message Tracking</b></p2></li>
                            <li><p2><b>Fault Tolerance</b></p2></li>
                        </ul>
                        <p2>In short, the system must scale to support 10M+ users with minimal downtime, ensuring sub-second delivery for high-priority messages via asynchronous pipelines (RabbitMQ). Robust logging for accurate message tracking and failover mechanisms with auto-retries were also needed to maintain reliability during failures.</p2>
                    </div>

                    <div>
                        <h1>Scale Estimation</h1>
                        <ul>
                            <li><p2>Users: The system is designed to serve 1 million daily active users.</p2></li>
                            <li><p2>Notifications per user: On average, each user receives up to 5 notifications per day.</p2></li>
                            <li><p2>Peak Load: During peak times, the system handles 100,000 notifications within 1 minute.</p2></li>
                        </ul>

                        <p2>Based on these estimations, the system must handle 5 million notifications per day and approximately 1,700 notifications per second. Assuming an average notification and user data size of 1KB, the system requires 1GB of storage for user data and 5GB for notifications.</p2>
                    </div>

                    <iframe
                        style={{"border": "1px solid rgba(0, 0, 0, 0.1)" }}
                        width="800"
                        height="450"
                        src="https://embed.figma.com/board/7YnpUXaHwW8Pt0eYgsEfjM/Untitled?node-id=0-1&embed-host=share"
                        allowfullscreen>
                    </iframe>
                    
                    <div>
                        <h1>Outcome</h1>
                        <p2>My asynchronous message processing pipeline successfully handled up to 1 million messages with high availability (99.9%), ensuring reliable delivery. More importantly, maintenance costs remain minimal due to object encapsulation and dynamic configuration—no more code fixes for requirement changes!</p2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectModal; 