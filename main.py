from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ethosus-frontend.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo para login
class LoginData(BaseModel):
    email: str
    password: str

# Endpoint raiz
@app.get("/")
def read_root():
    return {"message": "EthoSUS API online"}

# Endpoint de login
@app.post("/login")
def login(data: LoginData):
    if data.email == "admin@ethosus.com" and data.password == "admin123":
        return {"message": "Login bem-sucedido", "access_token": "token-fake"}
    raise HTTPException(status_code=401, detail="Credenciais inválidas")
