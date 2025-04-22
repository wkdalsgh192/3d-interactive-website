
# 🌍 3D Population Chart Visualization

This project is an interactive 3D visualization of global population trends, combining web technologies, data analytics, and 3D graphics.

## 🚀 Features

- Interactive 3D charts built with Three.js
- Dynamic population data visualization using D3
- API integration with a Flask backend
- Country metadata + flags fetched via public APIs
- Clickable mesh interaction with data popups and animation

## 🧱 Tech Stack

- **Frontend**: React, D3.js, Three.js, TWEEN.js
- **Backend**: Flask, Python
- **Deployment**: Docker, Nginx, EC2
- **Visualization**: SVG to 3D conversion, raycasting for interactivity

## 🐳 Getting Started with Docker

```bash
# Clone the repo
git clone https://github.com/wkdalsgh192/3d-interactive-website.git
cd 3d-interactive-website

# Start all services
docker-compose up --build
```

Access the app at: `http://localhost` or your EC2 public IP.

## 📁 Project Structure

```
backend/       # Flask API (serves country metadata)
frontend/      # React app (builds 3D chart)
nginx/         # Reverse proxy and static file delivery
docker-compose.yml
```

## 📸 Preview

![screenshot](./preview.gif)

## 📄 License

MIT License © 2024 Minho Jang
```

