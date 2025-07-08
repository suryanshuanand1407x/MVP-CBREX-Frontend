# Recruitment Platform MVP

A modern, responsive recruitment platform built with React, featuring job posting, candidate management, and application tracking for both recruiters and vendors.

## 🚀 Live Demo

**Deployed Application:** [https://sbgamvpj.manus.space](https://sbgamvpj.manus.space)

### Demo Credentials

- **Admin:** `admin` / `admin123`
- **Vendor:** `vendor` / `vendor123`

## ✨ Features

### Admin Features
- **Job Description Management**
  - Create, edit, and delete job postings
  - Assign jobs to specific vendors
  - Put jobs on hold (hidden from vendors)
  - Open/close job status management
  - Comprehensive job details (location, CTC, experience, skills, etc.)

- **Candidate Management**
  - View all submitted candidates across all jobs
  - Review candidate details and qualifying question answers
  - Reject candidates with confirmation
  - Track candidate submissions per job

- **Vendor Management**
  - Assign multiple vendors to jobs
  - Track vendor performance and submissions

### Vendor Features
- **Job Viewing**
  - View only assigned and active jobs
  - See detailed job requirements and specifications
  - Track submission count per job

- **Candidate Submission**
  - Two-step candidate submission process
  - Comprehensive candidate information form
  - Qualifying questions for each submission
  - Resume link submission
  - Real-time validation and feedback

## 🛠 Technology Stack

- **Frontend:** React 18 with Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **State Management:** React Context API (in-memory)
- **Build Tool:** Vite
- **Package Manager:** pnpm

## 🏗 Architecture

### Component Structure
```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── AdminDashboard.jsx  # Admin interface
│   ├── VendorDashboard.jsx # Vendor interface
│   ├── CandidateForm.jsx   # Candidate submission form
│   ├── JobForm.jsx         # Job creation/editing form
│   ├── Layout.jsx          # Common layout wrapper
│   └── Login.jsx           # Authentication component
├── context/
│   └── AppContext.jsx      # Global state management
└── App.jsx                 # Main application component
```

### State Management
- **Global Context:** Manages jobs, candidates, and vendors
- **In-Memory Storage:** All data persists during session only
- **Shared State:** Synchronized between admin and vendor views

## 🚦 User Flows

### Admin Workflow
1. Login with admin credentials
2. View/manage job descriptions
3. Create new jobs with vendor assignments
4. Review submitted candidates
5. Manage job status and vendor assignments

### Vendor Workflow
1. Login with vendor credentials
2. View assigned active jobs
3. Submit candidates with detailed information
4. Answer qualifying questions
5. Track submission status

## 🎨 Design Features

- **Responsive Design:** Works seamlessly on desktop and mobile
- **Modern UI:** Clean, professional interface with shadcn/ui
- **Interactive Elements:** Hover states, transitions, and feedback
- **Accessibility:** Proper form labels and keyboard navigation
- **Professional Styling:** Consistent color scheme and typography

## 🔧 Development

To set up and run the project locally, follow these steps:

### Prerequisites
Before you begin, ensure you have the following installed on your system:

- **Node.js:** Version 18 or higher. You can download it from [nodejs.org](https://nodejs.org/).
- **pnpm (recommended) or npm:**
  - To install pnpm: `npm install -g pnpm`
  - npm comes bundled with Node.js.

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url> # Replace with the actual repository URL if available
    cd recruitment-platform
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    # or if using npm
    # npm install
    ```

### Running the Application

To start the development server and run the application locally:

```bash
pnpm run dev
# or if using npm
# npm run dev
```

This command will start the Vite development server. You will see output in your terminal indicating the local URL where the application is running.

### Accessing the Application

Once the development server is running, open your web browser and navigate to the address provided in the terminal (e.g., `http://localhost:5173`). The application will be accessible there.

### Available Scripts
- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop:** Full-featured interface with multi-column layouts
- **Tablet:** Adapted layouts with touch-friendly interactions
- **Mobile:** Single-column layouts with optimized forms

## 🔐 Authentication

- **Hardcoded Credentials:** As per MVP requirements
- **Role-Based Access:** Admin and Vendor roles with different permissions
- **Session Management:** Login state persists during browser session
- **Route Protection:** Automatic redirection based on user role

## 📊 Data Structure

### Job Description
```javascript
{
  id: number,
  title: string,
  description: string,
  skills: string,
  location: string,
  ctc: string,
  experience: string,
  noticePeriod: string,
  status: 'Open' | 'Closed',
  isOnHold: boolean,
  assignedVendors: number[],
  candidates: Candidate[]
}
```

### Candidate
```javascript
{
  id: number,
  name: string,
  email: string,
  phone: string,
  resumeLink: string,
  experience: string,
  currentCtc: string,
  expectedCtc: string,
  noticePeriod: string,
  answers: string[],
  submittedAt: string
}
```

## 🚀 Deployment

The application is deployed using static hosting and is accessible at:
**https://sbgamvpj.manus.space**

### Deployment Process
1. Build the application: `pnpm run build`
2. Deploy the `dist` folder to static hosting
3. Configure routing for SPA (Single Page Application)

## 🔮 Future Enhancements

- **Backend Integration:** Replace in-memory storage with API
- **Database:** Persistent data storage
- **File Upload:** Resume upload functionality
- **Email Notifications:** Automated candidate notifications
- **Advanced Filtering:** Search and filter capabilities
- **Analytics Dashboard:** Recruitment metrics and insights
- **Multi-tenant Support:** Multiple company support

## 📝 License

This project is built as an MVP demonstration and is available for educational and evaluation purposes.

## 🤝 Contributing

This is an MVP project. For production use, consider implementing:
- Proper authentication and authorization
- Backend API integration
- Data persistence
- File upload capabilities
- Email notifications
- Advanced search and filtering

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies.**

# MVP-CBREX-Frontend
