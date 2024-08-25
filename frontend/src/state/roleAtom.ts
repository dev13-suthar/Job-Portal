import { jwtDecode } from 'jwt-decode';
import { atom, selector } from 'recoil';


// Atom to store the user role
export const userRoleState = atom({
  key: 'userRoleState',
  default: null, // Default value, will be set by the selector
});

// Selector to decode the token and assign the role
export const decodedUserRoleState = selector({
  key: 'decodedUserRoleState',
  get: ({ get }) => {
    const token = localStorage.getItem('token'); // Replace with your token storage method

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.role; // Assuming the role is in the `role` field
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }

    return null; // No token found, or token is invalid
  },
  set: ({ set }, newValue) => {
    set(userRoleState, newValue); // Allow manual override of the role if needed
  },
});
