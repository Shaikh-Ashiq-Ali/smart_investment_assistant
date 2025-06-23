"use client";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import dashboard from "../page.module.css";
import { log, table, error } from "console";
import { Line } from "react-chartjs-2";
import {
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler
} from 'chart.js';
import Nav from "../Nav";
import Sidebar from "../Sidebar";

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

function Dashboard() {

  const [csvData, setCSVData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('csvData');
    const savedColumns = localStorage.getItem('csvColumns');
    if(savedData && savedColumns){
      const parsedData = JSON.parse(savedData);
      const parsedColumns = JSON.parse(savedColumns);
      setCSVData(parsedData);
      setColumns(parsedColumns);
      prepareChart(parsedData);
    }
  },[]);

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: any) => {
          const data = result.data.filter((row: any) => row.Close && row.Date);
          const firstRows = data.slice(0,5);
          const columnList = Object.keys(data[0]);
          setCSVData(firstRows);
          setColumns(columnList);
          localStorage.setItem('csvData', JSON.stringify(firstRows));
          localStorage.setItem('csvColumns', JSON.stringify(columnList));
          prepareChart(data);
        },
        error: (e: any) => {
          console.error("Parsing Error:", e);
        },
      });
    }
  };

  const prepareChart = (data) => {
    const labels = data.map((row:any) => row.Date);
    const closePrices = data.map((row:any) => parseFloat(row.Close));
    setChartData({
      labels,
      datasets: [
        {
          label: 'Close Price',
          data: closePrices,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
          tension: 0.1,
        },
      ],
    });
  }

  return (
    <>
      <Nav />
      <Container fluid className="d-flex p-lg-0" id="insidePage">
        <Sidebar />
        <div className={dashboard.main}>
          <Container className="p-4">
            <Row>
              <Col className="d-flex align-items-center justify-content-between">
                <form>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    name="upload_stock"
                    id="upload_stock"
                  />
                </form>
                {/* <Button variant="dark" id="export_report">
                  Export Report
                </Button> */}
              </Col>

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
                      {csvData.map((row,idx) => (
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

              {chartData && (
                <div>
                  <h5 className="text-lg font-semibold mb-2">Close Price Chart</h5>
                  <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' as const}}, maintainAspectRatio: true }} />
                </div>
              )}

            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default Dashboard;
