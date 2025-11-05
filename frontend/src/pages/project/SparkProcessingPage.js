import React, { useEffect } from "react";

const HadoopSparkPage = () => {
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
            <a href="/">Minho's</a> / <a href="/project">Project</a> / Hadoop &amp; Spark Processing
            </p>
        </nav>

        <h1>Hadoop &amp; Spark Distributed Processing</h1>

        <h2>Project Overview</h2>
        <p>
            Deployed a two-node Hadoop (HDFS) and Spark standalone cluster on AWS EC2 to evaluate distributed
            data processing. Implemented Python MapReduce (Streaming) and PySpark RDD jobs (WordCount, CharCount, and Min/Max word frequency),
            with input from the Gutenberg corpus stored in HDFS. Benchmarked performance and examined Spark’s fault-tolerance mechanisms.
        </p>

        <h2>Implementation Highlights</h2>
        <ul>
            <li>Configured Spark standalone cluster with worker cores and memory tuned to EC2 instance capacity.</li>
            <li>Benchmarked PySpark jobs for execution time across WordCount, CharCount, and Min/Max analysis.</li>
            <li>Explored Spark’s lineage-based recovery model by simulating node failures and tracing recomputation.</li>
        </ul>

        <h2>Benchmark Summary</h2>
        <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "left", marginTop: "10px" }}>
            <thead>
            <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Job</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Stage Time</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>WordCount</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>~10.1 s</td>
            </tr>
            <tr>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>CharCount</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>~9.1 s</td>
            </tr>
            <tr>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>Min/Max (word freq.)</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>~10.0 s</td>
            </tr>
            </tbody>
        </table>

        <h2>Key Concept: RDD Lineage</h2>
        <p>
            A core contribution of Zaharia et al. (NSDI ’12) is the <strong>Resilient Distributed Dataset (RDD)</strong>,
            which enables deterministic recomputation of lost partitions instead of relying on costly replication.
            The diagram below illustrates this principle: if a node holding partitions <code>P1</code> and <code>P2</code> fails,
            Spark can recompute them on other nodes by replaying the lineage graph, ensuring fault tolerance with minimal overhead.
        </p>
        <img 
            className="project-img" 
            src="/images/rdd-fault-tolerance.png"  // Update with your GIF path
            alt="RDD lineage recomputation diagram"
            style={{
                width: '100%',
                maxWidth: '800px',
                margin: '20px auto',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
        />

        <h2>References</h2>
        <p>
            Zaharia, M., et al. <em>“Resilient Distributed Datasets: A Fault-Tolerant Abstraction for In-Memory Cluster Computing.”</em> 
            NSDI, 2012.
        </p>
    </div>
  );
};

export default HadoopSparkPage;
