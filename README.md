# 🚀 Smart Investment Assistant

A comprehensive web application that combines AI-powered financial analysis with interactive data visualization to help investors make informed decisions. Built with modern technologies including FastAPI, Next.js, and OpenAI integration.

![Smart Investment Assistant](https://img.shields.io/badge/Status-Active-brightgreen)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115.12-009688?logo=fastapi)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔍 **Data-Driven Insights**
- Upload CSV stock data with Date and Close price columns
- Real-time data validation and processing
- Interactive data preview with sample rows

### 📈 **AI-Powered Predictions**
- Machine learning-based trend analysis
- Buy/Sell recommendations based on price patterns
- Simple yet effective prediction algorithm using mean comparison

### 🧠 **Intelligent Summaries**
- GPT-3.5 Turbo powered financial analysis
- Comprehensive investment summaries with risk assessment
- Trend insights and improvement suggestions

### 📊 **Visual Analytics**
- Interactive line charts using Chart.js
- Real-time data visualization
- Responsive design for all devices

### 🔒 **Secure & Private**
- Client-side data processing
- No permanent data storage without permission
- CORS-enabled API for secure communication

## 🛠 Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Python 3.x** - Core programming language
- **Pandas** - Data manipulation and analysis
- **OpenAI API** - GPT-3.5 Turbo for financial summaries
- **Uvicorn** - ASGI server for FastAPI
- **Pydantic** - Data validation and settings management

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Bootstrap 5** - CSS framework for responsive design
- **Chart.js** - Interactive charts and graphs
- **Axios** - HTTP client for API communication
- **PapaParse** - CSV parsing library

## 📁 Project Structure

```
smart_investment_assistant/
├── backend/
│   ├── fastapi_predict_trend_api.py  # Main FastAPI application
│   ├── requirements.txt              # Python dependencies
│   ├── Command.txt                   # Setup commands
│   └── venv/                        # Virtual environment
├── frontend/
│   ├── app/
│   │   ├── dashboard/               # Dashboard page
│   │   ├── predict_trend/           # Trend prediction page
│   │   ├── summary/                 # AI summary page
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Landing page
│   │   ├── Nav.jsx                 # Navigation component
│   │   └── Sidebar.jsx             # Sidebar component
│   ├── package.json                # Node.js dependencies
│   └── tsconfig.json               # TypeScript configuration
└── data/                           # Data storage directory
```

## ⚙️ Prerequisites

Before running this application, make sure you have the following installed:

- **Python 3.8+**
- **Node.js 18+**
- **npm** or **yarn**
- **OpenAI API Key** (for AI summaries)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd smart_investment_assistant
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up OpenAI API key (optional - for AI summaries)
# Add your OpenAI API key to the environment or update the code
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Build the application
npm run build
```

## 🎯 Usage

### Starting the Backend Server

```bash
cd backend
# Activate virtual environment first
# uvicorn fastapi_predict_trend_api:app --reload
python -m uvicorn fastapi_predict_trend_api:app --reload
```

The API will be available at `http://127.0.0.1:8000`

### Starting the Frontend Development Server

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

### Using the Application

1. **Upload Data**: Navigate to the Dashboard and upload your CSV file containing stock data
2. **View Analytics**: Explore interactive charts and data visualization
3. **Get Predictions**: Visit the Predict Trend page for AI-powered buy/sell recommendations
4. **Generate Summary**: Use the Summary page to get comprehensive financial analysis

## 🔌 API Endpoints

### Base URL: `http://127.0.0.1:8000`

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/` | GET | Health check | - | `{"message": "Predict Trend API is running."}` |
| `/predict-trend` | POST | Generate trend predictions | CSV file (multipart/form-data) | `{"predictions": ["Buy", "Sell", ...]}` |
| `/generate-summary` | POST | Generate AI-powered summary | `{"stock_json": [...]}` | `{"summary": "Financial analysis..."}` |

### Example API Usage

```bash
# Predict trends
curl -X POST "http://127.0.0.1:8000/predict-trend" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@your_stock_data.csv"

# Generate summary
curl -X POST "http://127.0.0.1:8000/generate-summary" \
  -H "Content-Type: application/json" \
  -d '{"stock_json": [{"Date": "2024-01-01", "Close": "150.00"}]}'
```

## 📊 Data Format

The application expects CSV files with the following structure:

```csv
Date,Close,Open,High,Low,Volume
2024-01-01,150.00,148.50,151.20,147.80,1000000
2024-01-02,152.30,150.10,153.40,149.90,1200000
...
```

**Required Columns:**
- `Date`: Date in YYYY-MM-DD format
- `Close`: Closing price (numeric)

**Optional Columns:**
- `Open`, `High`, `Low`, `Volume`: Additional stock data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices for frontend code
- Use FastAPI conventions for backend development
- Ensure proper error handling and validation
- Add comprehensive tests for new features
- Update documentation for any API changes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/smart_investment_assistant/issues) page
2. Create a new issue with detailed information
3. Include error messages, steps to reproduce, and system information

## 🔮 Future Enhancements

- [ ] Advanced machine learning models for better predictions
- [ ] Real-time stock data integration
- [ ] Portfolio management features
- [ ] Risk assessment algorithms
- [ ] Mobile application
- [ ] User authentication and data persistence
- [ ] Multiple chart types and technical indicators

---

**Built with ❤️ using FastAPI, Next.js, and OpenAI**

*Disclaimer: This application is for educational and research purposes. Investment decisions should be made after consulting with financial advisors.*
