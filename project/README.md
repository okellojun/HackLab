# RebornTechHackLab

RebornTechHackLab is a modern web platform designed to connect companies with global hackers. It facilitates hackathon management, problem browsing, analytics, and user profile management for both companies and hackers.

## Features

- Dashboard with role-based views for companies and hackers
- Company problem management and hacker problem browsing
- Hackathon management tools
- Analytics dashboard
- User profile management
- Responsive navigation and user role switching

## Technologies Used

- React 18 with TypeScript
- Vite as the build tool
- Tailwind CSS for styling
- PostCSS for CSS processing
- ESLint for code linting
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm (comes with Node.js)

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Running the Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the URL shown in the terminal).

### Building for Production

Build the optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check for code quality and style issues:

```bash
npm run lint
```

## Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── Analytics.tsx
│   │   ├── CompanyProblems.tsx
│   │   ├── Dashboard.tsx
│   │   ├── HackathonManagement.tsx
│   │   ├── HackerBrowse.tsx
│   │   ├── HackerProfile.tsx
│   │   └── Navigation.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
