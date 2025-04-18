import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import BlogListing from './pages/BlogListing';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Profile from './pages/Profile';
import BlogDetail from './pages/BlogDetail';
import Protected from './components/Protected';
import MyBlogs from './pages/MyBlogs';
import ArticlePage from './pages/ArticlePage';
import EditBlog from './pages/EditBlog';
import BlogEditor from './pages/BlogEditor';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />
          <Route path="/bloglisting" element={<Protected><BlogListing /></Protected>} />
          <Route path="/write" element={<Protected><BlogEditor /></Protected>} />
          <Route path="/myblogs" element={<Protected><MyBlogs /></Protected>} />
          <Route path="/blogs/:id" element={<Protected><BlogDetail /></Protected>} /> 
          <Route path="/article" element={<Protected><ArticlePage /></Protected>} />

        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;