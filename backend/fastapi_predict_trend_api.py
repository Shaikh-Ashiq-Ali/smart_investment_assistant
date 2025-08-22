from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
import openai
from pydantic import BaseModel
from typing import List
import os

app = FastAPI()

# CORS middleware to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.get("/")
def read_root():
    return {"message": "Predict Trend API is running."}

@app.post("/predict-trend")
def predict_trend(file: UploadFile = File(...)):
    try:
    
        # Read uploaded CSV file
        contents = file.file.read()
        df = pd.read_csv(io.BytesIO(contents))

        # Ensure required columns exist
        if 'Close' not in df.columns or 'Date' not in df.columns:
            raise HTTPException(status_code=400, detail="CSV must contain 'Date' and 'Close' columns")

        # Simple prediction logic: Compare Close to mean
        mean_close = df['Close'].mean()
        predictions = ["Buy" if close > mean_close else "Sell" for close in df['Close']]

        return {"predictions": predictions}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
class SummaryRequest(BaseModel):
    stock_json: list

@app.post("/generate-summary")
def generate_summary(req: SummaryRequest):
    try:
        data_preview = "\n".join([
            f"Date: {item.get('Date')}, Close: {item.get('Close')}"
            for item in req.stock_json
        ])

        prompt = f"""
        Analyze this stock data and write a brief investment summary:

        {data_preview}

        Include: trend insights, potential risks, and suggestions for improvement.
        Make it simple and concise.
        """

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",  # fallback if no GPT-4 access
            messages=[
                {"role": "system", "content": "You are a financial investment assistant."},
                {"role": "user", "content": prompt}
            ]
        )

        summary = response.choices[0].message.content.strip()
        return {"summary": summary}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
