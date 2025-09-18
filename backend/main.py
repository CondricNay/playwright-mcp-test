from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_CONFIG = {
    "host": "mysqldb_dev",
    "user": "dgdev",
    "password": "dg@dev",
    "database": "mcp_db"
}

# Request model
class TodoRequest(BaseModel):
    title: str
    completed: bool = False

# Utility to connect
def get_connection():
    return mysql.connector.connect(**DB_CONFIG)

# Create table if missing
def init_table():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS todos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                completed BOOLEAN DEFAULT FALSE
            )
        """)
        conn.commit()
        print("Table created or already exists.")
    except mysql.connector.Error as e:
        print("Error creating table:", e)
    finally:
        cursor.close()
        conn.close()

init_table()  # call once on startup

# CRUD endpoints
@app.get("/")
def root():
    return {"message": "Server is running!"}

@app.get("/todos")
def list_todos():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, title, completed FROM todos ORDER BY id DESC")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return rows
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/todos")
def add_todo(req: TodoRequest):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO todos (title, completed) VALUES (%s, %s)",
            (req.title, req.completed)
        )
        conn.commit()
        inserted_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return {"id": inserted_id, "title": req.title, "completed": req.completed}
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, req: TodoRequest):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE todos SET title=%s, completed=%s WHERE id=%s",
            (req.title, req.completed, todo_id)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return {"id": todo_id, "title": req.title, "completed": req.completed}
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM todos WHERE id=%s", (todo_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return {"deleted": todo_id}
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
