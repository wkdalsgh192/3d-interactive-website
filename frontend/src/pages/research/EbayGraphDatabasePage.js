import React, { useEffect } from "react";

const EbayGraphDatabasePage = () => {
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
            <a href="/">Minho's</a> / <a href="/research">Research</a> / Ebay Graph Database
            </p>
        </nav>

        <h1>eBay Distributed Graph Database</h1>

        <h2>Overview</h2>
        <p>
            As part of a collaborative research initiative between the University of Southern California and eBay, 
            I contributed to the design and implementation of a <b>distributed graph query execution pipeline</b>. 
            The project focused on improving <b>query performance, scalability, and fault tolerance</b> 
            for large-scale graph workloads on JanusGraph and Apache TinkerPop.
        </p>

        <h2>My Contributions</h2>
        <ul>
            <li>Designed and implemented a distributed query execution engine using Vert.x for asynchronous processing and Hazelcast for cluster coordination.</li>
            <li>Developed modular query operators (VertexFilter, EdgeTraversal, HashMerge, Repeat, etc.) supporting sort-linear and bushy query plans.</li>
            <li>Introduced partitioning strategies (hash, range, round-robin) to balance computation and reduce skewed workload bottlenecks.</li>
            <li>Built a CSV-based performance logging system to capture min, max, median query times and throughput across iterations.</li>
            <li>Implemented fault-tolerance mechanisms by simulating network and node failures to ensure query correctness under distributed execution.</li>
        </ul>

        <h2>Achievements</h2>
        <ul>
            <li>Reduced query execution latency from ~100ms to under 10ms for optimized query plans while supporting concurrent workloads.</li>
            <li>Demonstrated scalability by deploying multiple operators across JVMs and validating system capability to scale to millions of operators.</li>
            <li>Strengthened reliability by validating query correctness under simulated cluster failures and stress tests.</li>
            <li>Published experimental results with reproducible test frameworks using JUnit/Mockito and configurable JSON files.</li>
        </ul>

        <h2>Technologies Used</h2>
        <p>
            Java, Vert.x, Hazelcast, JanusGraph, Apache TinkerPop, JUnit, Mockito, Maven
        </p>
    </div>
  );
};

export default EbayGraphDatabasePage;
