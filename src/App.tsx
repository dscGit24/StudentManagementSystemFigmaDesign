import { useState } from 'react';
import { SidebarProvider } from './components/ui/sidebar';
import { AppSidebar } from './components/AppSidebar';
import { Dashboard } from './components/Dashboard';
import { Students } from './components/Students';
import { Courses } from './components/Courses';
import { Attendance } from './components/Attendance';
import { Grades } from './components/Grades';
import { Teachers } from './components/Teachers';
import { Finance } from './components/Finance';
import { Settings } from './components/Settings';

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <Students />;
      case 'courses':
        return <Courses />;
      case 'attendance':
        return <Attendance />;
      case 'grades':
        return <Grades />;
      case 'teachers':
        return <Teachers />;
      case 'finance':
        return <Finance />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <main className="flex-1 overflow-auto bg-background">
          {renderModule()}
        </main>
      </div>
    </SidebarProvider>
  );
}
