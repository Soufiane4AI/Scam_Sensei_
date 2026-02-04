import { useState } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import Home from './pages/Home';
import AIChecker from './pages/AIChecker';
import TrainingGame from './pages/TrainingGame';
import About from './pages/About';
import type { PageRoute } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'checker':
        return <AIChecker />;
      case 'game':
        return <TrainingGame />;
      case 'about':
        return <About />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout>
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </Layout>
  );
}

export default App;
