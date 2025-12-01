import os
import zipfile

base_dir = "MyTube"
structure = [
    "MyTube/client/public",
    "MyTube/client/src/components",
    "MyTube/client/src/pages",
    "MyTube/client/src",
    "MyTube/server/controllers",
    "MyTube/server/routes",
    "MyTube/server/models",
    "MyTube/server/middleware",
    "MyTube/server/config",
]

for folder in structure:
    os.makedirs(folder, exist_ok=True)

client_files = {
    "MyTube/client/package.json": '''
{
  "name": "mytube-client",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "axios": "^1.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.1",
    "tailwindcss": "^3.3.2",
    "video.js": "^8.6.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
''',
    "MyTube/client/src/main.jsx": '''
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
''',
    "MyTube/client/src/App.jsx": '''
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import WatchPage from "./pages/WatchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
''',
    "MyTube/client/src/pages/HomePage.jsx": '''
import React from "react";

function HomePage() {
  return <div className="text-center mt-10 text-xl">Welcome to MyTube!</div>;
}

export default HomePage;
''',
}

server_files = {
    "MyTube/server/package.json": '''
{
  "name": "mytube-server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "aws-sdk": "^2.1370.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
''',
    "MyTube/server/server.js": '''
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MyTube backend is running.");
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
''',
    "MyTube/server/.env": '''
PORT=5000
MONGO_URI=your-mongodb-connection-string
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=your-region
S3_BUCKET_NAME=your-s3-bucket
''',
}

for path, content in {**client_files, **server_files}.items():
    with open(path, "w") as f:
        f.write(content.strip())

zip_filename = "MyTube_Project.zip"
with zipfile.ZipFile(zip_filename, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, _, files in os.walk(base_dir):
        for file in files:
            filepath = os.path.join(root, file)
            arcname = os.path.relpath(filepath, base_dir)
            zipf.write(filepath, arcname=arcname)

print(f"Project zipped as {zip_filename}")
