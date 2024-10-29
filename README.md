# Kanban Board Application

A dynamic and interactive Kanban board built with React.js that allows users to visualize and organize tickets based on different grouping and sorting criteria.

## 🚀 Features

- **Dynamic Grouping Options:**
  - By Status (Todo, In Progress, Done, etc.)
  - By User (Assigned team members)
  - By Priority (Urgent, High, Medium, Low, No Priority)

- **Flexible Sorting:**
  - By Priority (Descending order)
  - By Title (Alphabetical order)

- **Persistent View State:** User's grouping and sorting preferences are saved across page reloads

- **Responsive Design:** Adapts seamlessly to different screen sizes

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kanban-board.git
```

2. Navigate to the project directory:
```bash
cd kanban-board
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`

## 🏗️ Project Structure

```
kanban-board/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   └── UserAvatar.js
│   │
│   ├── icons_FEtask/
│   │   ├── add.svg
│   │   ├── Display.svg
│   │   ├── Done.svg
│   │   └── ... (other icons)
│   │
│   ├── App.js
│   ├── index.js
│   └── dashboard.css
│
├── README.md
└── package.json
```

## 🎯 Core Functionality

### Grouping Options

1. **By Status**
   - Groups tickets based on their current status
   - Status categories: Todo, In Progress, Done, Backlog, Canceled

2. **By User**
   - Organizes tickets according to assigned team members
   - Includes an "Unassigned" group for tickets without assignees

3. **By Priority**
   - Groups tickets based on priority levels:
     - Urgent (Level 4)
     - High (Level 3)
     - Medium (Level 2)
     - Low (Level 1)
     - No Priority (Level 0)

### Sorting Options

- **Priority:** Sorts tickets in descending order of priority level
- **Title:** Sorts tickets alphabetically by title

## 💻 Technical Implementation

### API Integration

The application fetches data from:
```
https://api.quicksell.co/v1/internal/frontend-assignment
```

Response format:
```javascript
{
  tickets: [
    {
      id: string,
      title: string,
      tag: string[],
      userId: string,
      status: string,
      priority: number
    }
  ],
  users: [
    {
      id: string,
      name: string,
      available: boolean
    }
  ]
}
```

### State Management

- Uses React's built-in useState hook for local state management
- Implements localStorage for persisting user preferences

### Key Components

1. **Dashboard**
   - Main container component
   - Handles data fetching and state management
   - Implements grouping and sorting logic

2. **UserAvatar**
   - Displays user avatar and availability status
   - Used in ticket cards and column headers when grouped by user

## 🎨 Styling

- Uses pure CSS without any external libraries
- Implements custom styling for:
  - Kanban board layout
  - Ticket cards
  - Priority indicators
  - Status icons
  - User avatars
  - Display dropdown


## 🔍 Future Improvements

- Add drag-and-drop functionality
- Implement ticket creation and editing
- Add search and filter capabilities
- Enhance mobile responsiveness
- Add dark mode support

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing

Feel free to submit issues and enhancement requests.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

For major changes, please open an issue first to discuss what you would like to change.