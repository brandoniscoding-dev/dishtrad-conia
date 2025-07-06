import { Navigate } from 'react-router-dom';

const Index = () => {
  // Rediriger vers la landing page
  return <Navigate to="/" replace />;
};

export default Index;
