# BFHL Node Processor - Full Stack Application

A complete full-stack application for processing hierarchical node structures, detecting cycles, and visualizing tree relationships.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

The backend server will run on `http://localhost:3000` (or the port specified in the `PORT` environment variable).

### Frontend Setup

Simply open the frontend in your browser:

```bash
# Option 1: Direct file open
Open frontend/index.html in your web browser

# Option 2: Using a simple HTTP server (Python)
python -m http.server 8000
# Then navigate to http://localhost:8000/frontend/index.html

# Option 3: Using npx http-server
npx http-server
# Then navigate to http://localhost:8080/frontend/index.html
```

## 🔧 Configuration

### Environment Variables

**Backend:**
- `PORT` - Server port (default: 3000)

Example:
```bash
PORT=5000 npm start
```

### API URL Configuration

**Frontend:**
Edit `frontend/index.html` and change the `API_URL` constant at the top of the script section:

```javascript
const API_URL = 'http://localhost:3000'; // Change this for production
```

## 📚 API Documentation

### POST /bfhl

Process node edges and return hierarchical structure analysis.

**Request:**
```json
{
  "data": ["A->B", "A->C", "B->D", "X->Y", "Y->Z", "Z->X"]
}
```

**Response:**
```json
{
  "user_id": "fullname_ddmmyyyy",
  "email_id": "email@college.edu",
  "college_roll_number": "ROLLNO",
  "hierarchies": [
    {
      "root": "A",
      "tree": {
        "B": {"D": {}},
        "C": {}
      },
      "depth": 3
    },
    {
      "root": "X",
      "tree": {},
      "has_cycle": true
    }
  ],
  "invalid_entries": ["invalid"],
  "duplicate_edges": ["A->B"],
  "summary": {
    "total_trees": 1,
    "total_cycles": 1,
    "largest_tree_root": "A"
  }
}
```

### GET /bfhl

Health check endpoint.

**Response:**
```json
{
  "operation_code": 1
}
```

## 🎯 Features

### Backend Features
- ✅ Express.js REST API server
- ✅ CORS enabled for all origins
- ✅ JSON body parsing
- ✅ Input validation
- ✅ Duplicate edge detection
- ✅ Cycle detection using DFS
- ✅ Tree hierarchy building
- ✅ Depth calculation
- ✅ Multi-parent handling (first-parent-wins)
- ✅ Connected component analysis

### Frontend Features
- ✅ Modern dark theme with cyan/electric blue accents
- ✅ Animated gradient background
- ✅ Real-time form validation
- ✅ Beautiful result visualization
- ✅ Tree structure display with visual hierarchy
- ✅ Summary cards showing statistics
- ✅ Invalid entries highlighting
- ✅ Duplicate edges tracking
- ✅ Loading state with spinner
- ✅ Error toast notifications
- ✅ Responsive design
- ✅ Example data loader

## 📂 Project Structure

```
bajaj-finserve/
├── backend/
│   ├── package.json          # Backend dependencies
│   ├── index.js              # Express server
│   └── processor.js          # Core processing logic
├── frontend/
│   └── index.html            # Single-file frontend app
└── README.md                 # This file
```

## 🔍 Algorithm Details

### Processing Steps

1. **Validation**: Each edge is validated against the pattern `^[A-Z]->[A-Z]$`
2. **Duplicate Detection**: Duplicate edges are identified and removed
3. **Adjacency Building**: Creates parent-child and child-parent mappings
4. **Connected Components**: Groups related nodes using BFS
5. **Root Finding**: Identifies root nodes (nodes with no parent)
6. **Cycle Detection**: Uses DFS to detect cycles in each component
7. **Tree Building**: Constructs nested tree objects
8. **Depth Calculation**: Computes the depth for each tree
9. **Summary**: Generates summary statistics

### Rules

- **Valid Edge Format**: `X->Y` where X and Y are single uppercase letters
- **Self-Loop Rule**: Edges like `A->A` are invalid
- **Multi-Parent Handling**: If a node has multiple parents, only the first encountered is kept
- **Cycle Handling**: Cycles are detected and reported; cyclic components don't have tree structures
- **Root Selection**: If no root exists (pure cycle), the lexicographically smallest node is selected

## 🎨 UI/UX Design

The frontend features:
- **Dark Theme**: Professional dark background with electric blue/cyan accents
- **Monospace Terminal Aesthetic**: Uses Courier New for a modern terminal feel
- **Animated Gradients**: Smooth continuous background animation
- **Card-Based Layout**: Clean, organized sections
- **Visual Hierarchy**: Clear badges and colors for different data types
- **Responsive Design**: Works on desktop and mobile
- **Interactive Elements**: Hover effects, loading states, smooth transitions

## 🐛 Debugging

### Backend Debugging

```bash
# Run with verbose logging
DEBUG=* npm start

# Run on custom port
PORT=5000 npm start
```

### Frontend Debugging

1. Open browser Developer Tools (F12)
2. Check Console tab for errors
3. Check Network tab to see API requests
4. Verify `API_URL` is correctly set

## 📦 Deployment

### Backend (Node.js)

Deploy to services like Heroku, Railway, Replit, etc.:

```bash
npm install
npm start
```

### Frontend

Since the frontend is a single HTML file, you can:

1. Deploy to any static hosting (GitHub Pages, Netlify, Vercel, AWS S3, etc.)
2. Update the `API_URL` to point to your deployed backend
3. Serve from any web server

Example for GitHub Pages:
- Commit `frontend/index.html` to `docs/` folder
- Enable GitHub Pages in repository settings
- Update `API_URL` to your backend domain

## 🤝 Contributing

To extend this application:

1. Add new endpoints to `backend/index.js`
2. Add processing logic to `backend/processor.js`
3. Update frontend UI in `frontend/index.html`
4. Test thoroughly with various edge cases

## 📝 License

MIT

## 🎓 Educational Purpose

This application demonstrates:
- RESTful API design
- Graph algorithms (DFS, BFS, Union-Find)
- Cycle detection
- Tree traversal
- Modern frontend design
- CORS and HTTP concepts
- Full-stack development workflow

---

**Built with ❤️ for Node Hierarchy Processing**
