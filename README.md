# Playwright MCP automation testing

Activate Venv:
python -m venv venv        # create virtual environment
source venv/bin/activate   # activate (Linux/Mac)
venv\Scripts\activate      # (Windows)

Run Frontend:
cd frontend
npm run dev

Run Backend:
cd backend
uvicorn main:app --reload --port 8000