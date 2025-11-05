import React, { useEffect } from "react";

const TrafficForecastingPage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white"; // Ensure text is readable

    return () => {
      document.body.style.backgroundColor = ""; // Reset when component unmounts
      document.body.style.color = "";
    };
  }, []);

  const containerStyle = {
    margin: "10% 20px",
  };

  return (
    <div style={containerStyle}>
        <nav>
            <p>
                <a href="/">Minho's</a> / <a href="/project">Project</a> / Traffic Forecasting
            </p>
        </nav>

        <h1>Traffic Forecasting using DCRNN</h1>

        <h2>Project Overview</h2>
        <p>
            Implemented a <strong>Diffusion Convolutional Recurrent Neural Network (DCRNN)</strong> model to forecast 
            traffic speed across Los Angeles County using the <strong>METR-LA dataset</strong>. 
            The project investigates how different graph structures influence forecasting accuracy 
            in spatiotemporal graph neural networks.
        </p>

        <h2>Implementation Highlights</h2>
        <ul>
            <li>Loaded and preprocessed the METR-LA dataset containing 5-minute interval traffic sensor data.</li>
            <li>Extracted the Los Angeles road network using <code>OSMnx</code> and stored it in both GraphML and GeoPackage formats.</li>
            <li>Constructed multiple graph structures:
                <ul>
                    <li><strong>Euclidean Distance Graph</strong> – nodes connected by spatial proximity.</li>
                    <li><strong>Road Network Graph</strong> – connections based on real road distances.</li>
                    <li><strong>Fully Connected</strong> and <strong>Disconnected Graphs</strong> for baselines.</li>
                </ul>
            </li>
            <li>Trained the DCRNN model using PyTorch with hyperparameters tuned for temporal forecasting.</li>
            <li>Evaluated model performance using <strong>MAE, RMSE, and MAPE</strong> metrics.</li>
            <li>Compared the predictive accuracy across different graph topologies to assess spatial influence.</li>
        </ul>

        <h2>Experimental Setup</h2>
        <p>
            The training pipeline was executed in Google Colab with dependencies such as 
            <code>geopandas</code>, <code>osmnx</code>, <code>fastdtw</code>, and <code>PyTorch</code>. 
            The model was trained on preprocessed graph adjacency matrices and validated on the METR-LA test split.
        </p>

        <h2>Key Concept: Spatiotemporal Graph Learning</h2>
        <p>
            The DCRNN leverages a <strong>diffusion convolution</strong> operation to capture directional 
            spatial dependencies in road networks, combined with recurrent units (GRUs) to model temporal dynamics. 
            This enables learning of both spatial and temporal patterns critical for accurate traffic forecasting.
        </p>

        <img 
            className="project-img" 
            src="/images/dcrnn-architecture.png"
            alt="DCRNN architecture illustration"
            style={{
                width: '100%',
                maxWidth: '800px',
                margin: '20px auto',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
        />

        <h2>Results & Insights</h2>
        <ul>
            <li>Graphs based on <strong>road-network distances</strong> yielded higher prediction accuracy compared to purely Euclidean connections.</li>
            <li><strong>Fully connected</strong> graphs increased computational cost without proportional accuracy gain.</li>
            <li>The experiment highlights the importance of graph topology in <strong>spatiotemporal GNN performance</strong>.</li>
        </ul>

        <h2>Technologies Used</h2>
        <p>
            Python, PyTorch, GeoPandas, OSMnx, NetworkX, FastDTW, Matplotlib, Google Colab
        </p>

        <h2>References</h2>
        <p>
            Li, Y., Yu, R., Shahabi, C., & Liu, Y. (2018). 
            <em>"Diffusion Convolutional Recurrent Neural Network: Data-Driven Traffic Forecasting."</em> 
            ICLR 2018.
        </p>
    </div>

  );
};

export default TrafficForecastingPage;
