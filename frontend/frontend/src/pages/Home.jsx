import { getUser } from '../utils/auth';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import UserDashboard from '../components/Dashboard/UserDashboard';
import OwnerDashboard from '../components/Dashboard/OwnerDashboard';

const Home = () => {
  const user = getUser();

  if (!user) return <p>Unauthorized</p>;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'owner':
      return <OwnerDashboard />;
    case 'user':
      return <UserDashboard />;
    default:
      return <p>Unknown role</p>;
  }
};

export default Home;
