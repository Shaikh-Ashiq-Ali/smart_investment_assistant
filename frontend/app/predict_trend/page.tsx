"use client";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import dashboard from "../page.module.css";
import Nav from "../Nav";
import Sidebar from "../Sidebar";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { error } from "console";
import { Line } from "react-chartjs-2";
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

function PredictTrend() {
  const [csvData, setCSVData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
      const savedData = localStorage.getItem('csvData');
      const savedColumns = localStorage.getItem('csvColumns');
      if(savedData && savedColumns){
        const parsedData = JSON.parse(savedData);
        const parsedColumns = JSON.parse(savedColumns);
        setCSVData(parsedData);
        setColumns(parsedColumns);
        fetchPredictions(parsedData);
      }else{
        setError("No uploaded stock data found. Please upload data from the Dashboard.");
      }
    },[]);

  const sendForPrediction = async (file: any) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("http://127.0.0.1:8000/predict-trend", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    setPredictions(response.data.predictions);
    try {
    } catch (err) {
      console.error(err);
      setError("Prediction Failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchPredictions = async (parsedData) => {
    try {
      setLoading(true);
      const csvContent = [Object.keys(parsedData[0]).join(',')]
        .concat(parsedData.map((row:any) => Object.values(row).join(',')))
        .join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const file = new File([blob], 'stored.csv');
      await sendForPrediction(file);
    } catch (err) {
      console.error(err);
      setError('Prediction from saved data failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Nav />
      <Container fluid className="d-flex p-lg-0" id="insidePage">
        <Sidebar />
        <div className={dashboard.main}>
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

              {loading && <p className="text-primary">Predicting...</p>}
              {error && <p className="text-danger">{error}</p>}

               {predictions.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mt-6 mb-2">Prediction Results</h4>
                  <table className="table-auto w-full border">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Close</th>
                        <th className="border px-4 py-2">Prediction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.map((row, idx) => (
                        <tr key={idx}>
                          <td className="border px-4 py-2">{row.Date}</td>
                          <td className="border px-4 py-2">{row.Close}</td>
                          <td className="border px-4 py-2">{predictions[idx] || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* {chartData && (
                <div>
                  <h5 className="text-lg font-semibold mb-2">
                    Close Price Chart
                  </h5>
                  <Line
                    data={chartData}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: "top" as const } },
                      maintainAspectRatio: true,
                    }}
                  />
                </div>
              )} */}
            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default PredictTrend;
