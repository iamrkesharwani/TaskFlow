# TaskFlow - Your Productivity Companion

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.javascript.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)

A modern, feature-rich todo application built with vanilla JavaScript, HTML5, and CSS3. TaskFlow provides an intuitive interface for managing your daily tasks with advanced filtering, sorting, and organization capabilities.

## 🚀 Features

### Core Functionality
- **Task Management**: Create, edit, delete, and complete tasks
- **Real-time Editing**: Double-click task titles for inline editing
- **Task Descriptions**: Add detailed descriptions to your tasks
- **Persistent Storage**: All data stored locally in browser localStorage

### Organization & Filtering
- **Priority Levels**: High, Medium, and Low priority categorization
- **Categories**: Personal, Shopping, Health, Work, and Other
- **Status Filtering**: View All, Active, Completed, or Overdue tasks
- **Advanced Search**: Real-time search across task titles and descriptions
- **Smart Sorting**: Sort by due date, priority, or title (ascending/descending)

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Date & Time Picker**: Intuitive date selection with Flatpickr integration
- **Keyboard Shortcuts**: Quick access with keyboard commands
- **Visual Feedback**: Toast notifications for all actions
- **Empty States**: Helpful guidance when no tasks are present

### Technical Features
- **Modular Architecture**: Clean separation of concerns with ES6 modules
- **Debounced Search**: Optimized search performance
- **Accessibility**: ARIA labels and keyboard navigation support
- **Cross-browser Compatibility**: Works on all modern browsers

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Tailwind CSS), Vanilla JavaScript (ES6+)
- **Icons**: Font Awesome 7.0
- **Fonts**: Google Fonts (Poppins)
- **Date Picker**: Flatpickr
- **Storage**: Browser localStorage API
- **Build Tools**: No build process required - runs directly in browser

## 📁 Project Structure

```
TaskFlow/
├── index.html                      
├── README.md                       
├── css/
│   ├── custom.css                 
│   ├── input.css                  
│   └── output.css                 
├── js/
│   ├── app.js                     
│   ├── handlers/
│   │   ├── FlatPickr.js
│   │   ├── Mobile.js
│   │   ├── TaskHandler.js
│   │   └── ThemeHandler.js
│   └── services/
│       ├── KeyboardService.js    
│       ├── ShowText.js          
│       └── StorageService.js
├── .prettierrc
├── package.json
├── package-lock.json
├── postcss.config.js
└── tailwind.config.js
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome 70+, Firefox 65+, Safari 12+, Edge 79+)
- Local web server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/taskflow.git
   cd taskflow
   ```

2. **Open in browser**
   ```bash
   # Option 1: Direct file opening
   open index.html
   
   # Option 2: Using Python's built-in server
   python -m http.server 8000
   
   # Option 3: Using Node.js serve
   npx serve .
   ```

3. **Start using TaskFlow**
   - Navigate to `http://localhost:8000` (if using a server)
   - Or simply open `index.html` in your browser

## 💡 Usage

### Creating Tasks
- Click the "Add New Task" button or use `Ctrl + K`
- Fill in the task details:
  - **Title**: Required field for task identification
  - **Priority**: High, Medium, or Low
  - **Category**: Personal, Shopping, Health, Work, or Other
  - **Due Date**: Optional date and time selection
  - **Description**: Additional task details

### Managing Tasks
- **Complete**: Check the checkbox to mark tasks as done
- **Edit**: Click the three-dot menu and select "Edit", or double-click the title for inline editing
- **Delete**: Use the three-dot menu to permanently remove tasks
- **Search**: Use the search bar to find tasks by title or description

### Filtering & Sorting
- **Status Filters**: Click sidebar buttons to filter by completion status
- **Priority Filters**: View tasks by priority level
- **Category Filters**: Organize tasks by category
- **Advanced Filtering**: Use the Filter button for complex queries
- **Sorting**: Sort tasks by date, priority, or alphabetically

### Keyboard Shortcuts
- `Ctrl + K`: Open new task modal
- `Enter`: Save current editing
- `Escape`: Cancel current action or close modals

## 🎨 Customization

### Themes
TaskFlow supports both light and dark themes:
- **Auto-detection**: Respects system preference by default
- **Manual Toggle**: Click the theme button in the header
- **Persistent**: Theme choice is saved to localStorage

### Categories & Priorities
Modify the available categories and priorities by editing the respective arrays in `TaskHandler.js`:

```javascript
const categoryIcons = {
  Personal: "fa-solid fa-house",
  Shopping: "fa-solid fa-cart-shopping",
  Health: "fa-solid fa-heart-pulse",
  Work: "fa-solid fa-briefcase",
  Other: "fa-solid fa-ellipsis"
}
```

## 🔧 Development

### Code Organization
The application follows a modular architecture:

- **Handlers**: Manage specific functionality (tasks, mobile, themes)
- **Services**: Provide utility functions (storage, UI updates)
- **Separation of Concerns**: Clear boundaries between data, logic, and presentation

### Key Design Patterns
- **Module Pattern**: ES6 modules for code organization
- **Event Delegation**: Efficient event handling
- **Observer Pattern**: UI updates based on data changes
- **Factory Pattern**: Dynamic DOM element creation

### Browser Compatibility
- Uses modern JavaScript features (ES6+)
- Graceful degradation for older browsers
- No transpilation required for modern browsers

## 📱 Mobile Experience

TaskFlow is fully responsive with mobile-optimized features:
- **Touch-friendly Interface**: Large tap targets and intuitive gestures
- **Mobile Search**: Expandable search overlay
- **Floating Action Button**: Easy access to task creation
- **Sidebar Navigation**: Collapsible sidebar for better screen real estate
- **Adaptive Typography**: Optimized text sizes for different screen sizes

## 🔐 Privacy & Security

- **Local Storage Only**: All data remains on your device
- **No Server Communication**: Complete offline functionality
- **No Analytics**: No tracking or data collection
- **No Dependencies on External Services**: Works completely offline

## 👨‍💻 Author

**Rahul Kesharwani**
- GitHub: [@iamrkesharwani](https://github.com/iamrkesharwani)
- Email: Will Share Later!

## 🙏 Acknowledgments

- [Font Awesome](https://fontawesome.com/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Flatpickr](https://flatpickr.js.org/) for the date picker component
- [Google Fonts](https://fonts.google.com/) for the Poppins font family

---

**TaskFlow** - Simplifying productivity, one task at a time. ✅