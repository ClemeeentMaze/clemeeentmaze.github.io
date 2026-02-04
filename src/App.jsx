import { BrowserRouter as Router } from "react-router-dom";
import MainContent from "@framework/components/MainContent";
import { AnnotationProvider } from "@framework/context/AnnotationContext";
import { StatePlaygroundProvider } from "@framework/context/StatePlaygroundContext";

/**
 * Main App component
 * Uses React Router for prototype navigation
 * Tailwind CSS for styling (configured with Ariane design tokens)
 */
function App() {
  return (
    <AnnotationProvider>
      <Router>
        <StatePlaygroundProvider>
          <MainContent />
        </StatePlaygroundProvider>
      </Router>
    </AnnotationProvider>
  );
}

export default App;
