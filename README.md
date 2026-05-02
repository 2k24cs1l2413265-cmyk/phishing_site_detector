# Phishing-site-detector

FastAPI backend + simple frontend to check URLs/text with a pretrained model.

Run locally:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirments.txt
uvicorn app:app --reload --port 8000
```

Place `phishing_mnb.pkl` and `vectorizer.pkl` in the project root before running.
