/**
 * the enumeration contains all available window states
 */
export const rootStates = {
  STARTPAGE: 0,
  USECASESELECTION: 1,
  PROJECTDESCRIPTION: 2,
  REGISTER: 3,
  SERVICEDETAILVIEW: 4
};
/**
 * the enumeration contains all component codes
 */
export const components = {
  REGISTERCOMPONENT: 0,
  LOGINCOMPONENT: 1
};
/**
 * the enumeration contains all login states
 */
export const loginStates = {
  CLOSED: 0,
  REGISTER: 1,
  LOGIN: 2,
  FORGOTPASSWORD: 3
};
/**
 * the enumeration contains all detailview states
 */
export const detailViewStates = {
  DEFAULT: 0,
  CURRENTLYPERSISTING: 1,
  PERSISTREADY: 2
};
/**
 * the backend's server location
 */
export const serverLocation = "http://217.160.64.83:81";
