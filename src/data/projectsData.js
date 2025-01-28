import DashboardModel from '../models/DashboardModel';

export const projectsData = {
    graphics3d: {
        headerImage: "https://cdn.sanity.io/images/jidqpryp/production/9cf961647a099a6444ac90cc57a363014ea0b0d5-1920x1280.jpg",
        title: "3D Graphics",
        subtitle: "Advanced 3D Graphics rendering techniques.",
        videoUrl: "https://player.vimeo.com/video/190451314?h=5b038d6e31",
        challenge: "In my previous work, I collaborated with graphic designers and engineers to build a graphic design tool for creating visuals and presentations. The goal was to optimize the rendering performance of the application.",
        result: "To achieve this, I implemented a custom renderer using WebGL and GLSL shaders. This allowed me to optimize the rendering performance of the application by leveraging the capabilities of the GPU.",
        images: [
            {
                url: "/images/toon-shaded-mongky.png",
                alt: "Toon Shaded Monkey"
            },
            {
                url: "https://cdn.sanity.io/images/jidqpryp/production/7bdea3bb5539d89301168ffd976d3bae73c341fd-1920x1280.jpg",
                alt: "Project Image"
            }
        ],
        carouselImages: [
            {
                url: "/images/teapots/basic_teapot.png",
                alt: "Basic Teapot"
            },
            {
                url: "/images/teapots/rotated_teapot.png",
                alt: "Rotated Teapot"
            }
        ]
    },
    interactiveViz: {
        headerImage: "/images/3d-population-preview.png",
        title: "Interactive Visualization",
        subtitle: "Better understanding of the data leads to better decision making.",
        videoUrl: "", // No video for this project
        challenge: "Data analysts or project managers often spend most of their time to show meaningful data for business. How might software engineers be able to tackle this problem by processing and presenting data with visual impact?",
        result: "After a series of experiments and a series of large-scale queries, I showcased how users' pattern has changed and how important the mobile app development project actually is.",
        component: DashboardModel,
        images: [
            {
                url: "https://cdn.sanity.io/images/jidqpryp/production/a364f33557bbfbbc4e92bec90cc9858ac3da98fd-1920x1280.jpg",
                alt: "AI Hiring Overview"
            },
            {
                url: "https://cdn.sanity.io/images/jidqpryp/production/847b16d8b7ae1ee3de4a2c57217aa6df4ec2946f-4608x3072.jpg",
                alt: "Project Challenge"
            },
            {
                url: "https://cdn.sanity.io/images/jidqpryp/production/2f3d52199a790cd41d7fa2efbcf6acf553659474-1440x960.jpg",
                alt: "Feedback Report"
            },
            {
                url: "https://cdn.sanity.io/images/jidqpryp/production/a6a42b2033533fd3ef0a3289e718b4b105120b52-1200x800.jpg",
                alt: "Feedback Report Detail"
            },
            {
                url: "https://cdn.sanity.io/images/jidqpryp/production/2ed02af01afe714f7cb83f9a20604263b7e62dd1-1440x900.jpg",
                alt: "Feedback Report Interface"
            },
            {
                url: "https://cdn.sanity.io/images/jidqpryp/production/dae9e3f8175f63145396bc36dcda32a6b1f3abf2-1440x960.jpg",
                alt: "CHECKMATE Interface"
            },
            {
                url: "https://cdn.sanity.io/images/jidqpryp/production/0617d55d3e29493a88754051dd74c4900a4c6fa6-1440x900.jpg",
                alt: "Incognito CV Interface"
            }
        ],
        carouselImages: [] // No carousel images for this project
    },
    // Add more projects as needed
}; 