// Authentication & Role Management Service for OUR CAMPUS AI
// Provides session tracking, role checking, switching, and persistent mock identities

const AUTH_STORAGE_KEY = 'campus_auth_user';

export const ROLES = {
  STUDENT: 'student',
  FACULTY: 'faculty',
  ADMIN: 'admin'
};

export const MOCK_USERS = {
  student: {
    id: 'stu-1',
    name: 'Suhail S',
    email: 'student@example.edu',
    role: 'student',
    department: 'B.Sc Computer Science',
    semester: 'Semester IV'
  },
  faculty: {
    id: 'fac-1',
    name: 'Ms. Nandhini R',
    email: 'nandhini.r@example.edu',
    role: 'faculty',
    department: 'B.Sc Computer Science',
    designation: 'Associate Professor'
  },
  admin: {
    id: 'adm-1',
    name: 'Dr. K. Ramanathan',
    email: 'admin@example.edu',
    role: 'admin',
    department: 'Administration',
    designation: 'System Administrator'
  }
};

/**
 * Get the currently authenticated user from localStorage,
 * falling back to inferring role from active path if needed.
 */
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.role) {
        if (parsed.role === 'faculty' && parsed.name === 'Dr. Arvind Sharma') {
          parsed.name = 'Ms. Nandhini R';
          parsed.email = 'nandhini.r@example.edu';
          setCurrentUser(parsed);
        }
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading auth user from storage:', err);
  }

  // Infer based on current path if not stored
  const path = window.location.pathname;
  if (path.startsWith('/faculty')) {
    setCurrentUser(MOCK_USERS.faculty);
    return MOCK_USERS.faculty;
  }
  if (path.startsWith('/admin')) {
    setCurrentUser(MOCK_USERS.admin);
    return MOCK_USERS.admin;
  }

  // Default to student
  setCurrentUser(MOCK_USERS.student);
  return MOCK_USERS.student;
}

/**
 * Persist current user session to localStorage
 */
export function setCurrentUser(user) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('campus_auth_changed', { detail: user }));
  } catch (err) {
    console.warn('Error saving auth user to storage:', err);
  }
}

/**
 * Switch role during demo navigation or testing
 */
export function switchRole(role) {
  const user = MOCK_USERS[role] || MOCK_USERS.student;
  setCurrentUser(user);
  return user;
}

/**
 * Log out user and remove session
 */
export function logout() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('campus_auth_changed', { detail: null }));
  } catch (err) {
    console.warn('Error clearing auth user:', err);
  }
}

/**
 * Check if current user has permission for a specific role or list of roles
 */
export function hasRole(allowedRoles) {
  const user = getCurrentUser();
  if (!user || !user.role) return false;
  if (Array.isArray(allowedRoles)) {
    return allowedRoles.includes(user.role);
  }
  return user.role === allowedRoles;
}
