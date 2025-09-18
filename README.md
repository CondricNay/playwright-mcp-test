## Playwright MCP Automation Testing

### 1. Setup Virtual Environment
> python -m venv venv

### Activate environment
#### On Linux/Mac
> source venv/bin/activate

#### On Windows
> venv\Scripts\activate

### 2. Install Backend Dependencies
> cd backend
>
> pip install -r requirements.txt

### 3. Install Frontend Dependencies
> cd ..frontend
>
> npm install

### 4. Run Frontend
> npm run dev

### 5. Run Backend
> cd ../backend
>
> uvicorn main:app --reload --port 8000

### 6. Run Playwright Tests
> cd ../tests
>
> npx playwright test
>
> npx playwright test example.spec.ts   # run specific test
>
> npx playwright test --headed          # run in headed mode

### 7. MCP Integration Notes
- Ensure your MCP client (e.g., ChatGPT, Copilot, Claude) is connected.  
- Tests should be saved in the `tests/` folder for MCP to access them.  
- Use your terminal to execute commands, since MCP will rely on the environment being set up.
