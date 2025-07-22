// 📁 src/utils/auth.js

// ✅ Save token to localStorage
export const setToken = (token) => {
  if (token) localStorage.setItem('token', token);
};

// ✅ Get token from localStorage
export const getToken = () => localStorage.getItem('token');

// ✅ Remove token from localStorage
export const removeToken = () => localStorage.removeItem('token');

// ✅ Save user info and role to localStorage
export const setUser = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', user.role?.toLowerCase()); // Save role separately
  }
};

// ✅ Get user info from localStorage
export const getUser = () => {
  const user = localStorage.getItem('user');
  try {
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// ✅ Get user role from localStorage
export const getRole = () => {
  const role = localStorage.getItem('role');
  return role ? role.toLowerCase() : null;
};

// ✅ Remove user info and role from localStorage
export const removeUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('role');
};

// ✅ Logout utility — clear everything and redirect
export const logoutUser = () => {
  removeToken();
  removeUser();
  window.location.href = '/'; // Redirect to login or home
};

// ✅ Role-based checks (optional utilities)
export const isAdmin = () => getRole() === 'admin';
export const isUser = () => getRole() === 'user';
export const isOwner = () => getRole() === 'owner';
