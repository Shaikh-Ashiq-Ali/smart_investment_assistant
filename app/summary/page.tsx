"use client";
import React, { useEffect, useState } from "react";
import summaryPage from "../page.module.css";
import Nav from "../Nav";
import Sidebar from "../Sidebar";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler,
} from "chart.js";
import axios from "axios";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler
);

function Summary() {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [csvData, setCSVData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [summary, setSummary] = useState(null);
  
  useEffect(() => {
    const savedData = localStorage.getItem('csvData'); 
    const savedColumns = localStorage.getItem('csvColumns');
    if(savedData && savedColumns){
      setCSVData(JSON.parse(savedData));
      setColumns(JSON.parse(savedColumns));
    }else{
      setError("No uploaded stock data found. Please upload data from the Dashboard.");
    }
  },[]);

  const handleGenerateSummary = async () => {
    if(!csvData.length) return;
    setLoading(true);
    setError(null);

    try{
      const response = await axios.post("http://127.0.0.1:8000/generate-summary", {
        stock_json : csvData
      });
      console.log(response);
      setSummary(response.data.summary);
    }catch(e){
      console.log(e);
      setError("Generating failed");
    }finally{
      setLoading(false);
    }
  }

  return (
    <>
      <Nav />
      <Container fluid className="d-flex p-lg-0" id="insidePage">
        <Sidebar />
        <div className={summaryPage.main}>
          <Container className="p-4">
            <Row>
              {csvData.length > 0 && (
                <Col lg={12} className="pt-3">
                  <h5>Sample Data Preview</h5>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        {columns.map((col) => (
                          <th key={col}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.map((row, idx) => (
                        <tr key={idx}>
                          {columns.map((col) => (
                            <td key={col}>{row[col]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              )}   

               {error && <p className="text-danger">{error}</p>}

                {csvData.length > 0 && (
                    <Col lg={12}>
                      <h4>AI Summary Generator</h4>

                      <button className="btn btn-primary" onClick={handleGenerateSummary}>{loading ? "Loading..." : "Generate Summary"}</button>

                      {summary && (
                        <p>{summary}</p>
                      )}

                  </Col>
                )}


            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default Summary;
