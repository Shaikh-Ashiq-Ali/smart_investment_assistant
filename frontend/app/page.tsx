import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Container className="landingPage">
          <div className="w-100 text-end pt-3">
            <Link href="/dashboard" className="px-3 py-2 border rounded-1">
              Dashboard
            </Link>
          </div>
          <Row>
            <Col
              xs={12}
              className="landingHeading text-center py-5 border-1 border-bottom"
            >
              <h1 className="text-uppercase">Smart Investment Assistant</h1>
              <p>
                Harness the power of AI and machine learning to analyze your
                stock data, generate smart investment summaries, and predict
                market trends — all in one simple dashboard.
              </p>
            </Col>
          </Row>

          <Row className="landingFeatures p-5 g-5 justify-content-center">
            <Col sm={12} md={6} lg={4}>
              <h3>🔍 Data-Driven Insights</h3>
              <p>
                Upload your stock data and get meaningful, actionable analysis
                in seconds.
              </p>
            </Col>

            <Col sm={12} md={6} lg={4}>
              <h3>📈 AI-Powered Predictions</h3>
              <p>
                Let our machine learning model assess your data and provide
                trend forecasts — Buy, Sell, or Hold.
              </p>
            </Col>

            <Col sm={12} md={6} lg={4}>
              <h3>🧠 Intelligent Summaries</h3>
              <p>
                Leverage GPT-powered financial summaries to understand risk,
                volatility, and opportunities.
              </p>
            </Col>

            <Col sm={12} md={6} lg={4}>
              <h3>📊 Visual Analytics</h3>
              <p>
                Beautiful and interactive charts help you track and compare
                stock performance over time.
              </p>
            </Col>

            <Col sm={12} md={6} lg={4}>
              <h3>🔒 Secure & Private</h3>
              <p>
                Your data is processed securely. Nothing is stored without your
                permission.
              </p>
            </Col>
          </Row>
        </Container>
      </main>
      <footer className={styles.footer}>
        {/* <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a> */}
      </footer>
    </div>
  );
}
