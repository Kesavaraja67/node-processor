# Node Processor - Hierarchical Analysis Engine

A full-stack application designed to parse, validate, and analyze hierarchical node structures. It processes directed edges, constructs independent trees, detects circular dependencies (cycles), and provides comprehensive statistics about the graph structure.

### 🌐 Live Links
- **Frontend (Web App):** [https://node-processor.netlify.app](https://node-processor.netlify.app)
- **Backend (API):** [https://node-processor.onrender.com/bfhl](https://node-processor.onrender.com)

---

## 🚀 Features

### Core API Engine
- **Robust Validation**: Ensures edges follow the strictly required `X->Y` pattern (single uppercase letters).
- **Graph Processing**: Efficiently identifies independent trees, isolates duplicate edges, and discards invalid entries.
- **Cycle Detection**: Employs deep-first search (DFS) to identify circular dependencies within components.
- **Tree Construction**: Accurately maps parent-child relationships and resolves multi-parent conflicts (first-parent-wins algorithm).
- **Depth Analysis**: Calculates the maximum depth of valid trees.

### Frontend UI
- **Clean Aesthetic**: A minimalist, paper-inspired interface with responsive components.
- **Interactive Visualization**: Collapsible tree views for easy exploration of deep hierarchies.
- **Real-Time Analysis**: Instantaneous feedback upon submitting node arrays.
- **Summary Metrics**: High-level statistical cards detailing total trees, cyclic groups, and the deepest root node.

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Hosting:** Render (Backend), Netlify (Frontend)

---

## 📚 API Specification

### `POST /bfhl`
Processes node edges and returns a structured hierarchical analysis.

**Request:**
```json
{
  "data": ["A->B", "A->C", "B->D", "hello", "X->Y", "Y->X"]
}
```

**Response:**
```json
{
  "user_id": "kesavarajaM_03052006",
  "email_id": "km0308@srmist.edu.in",
  "college_roll_number": "RA2311026050099",
  "hierarchies": [
    {
      "root": "A",
      "tree": {
        "A": {
          "B": { "D": {} },
          "C": {}
        }
      },
      "depth": 3
    },
    {
      "root": "X",
      "tree": {},
      "has_cycle": true
    }
  ],
  "invalid_entries": ["hello"],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 1,
    "total_cycles": 1,
    "largest_tree_root": "A"
  }
}
```

### `GET /bfhl`
Health check endpoint. Returns `{ "operation_code": 1 }`.

---

## 💻 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/Kesavaraja67/node-processor.git
cd node-processor
```

### 2. Run the Backend
```bash
cd backend
npm install
npm start
```
*The server will start on port 3000.*

### 3. Run the Frontend
Simply open `frontend/index.html` in any modern web browser. No build steps required.

*(Note: For local development, change the `API_URL` variable inside `frontend/index.html` to `http://localhost:3000`)*

---

## 📄 License
This project is for educational purposes. All logic and implementations are original.
