/**
 * the enumeration contains all available window states
 * SERVICEDETAILVIEW = old preview
 * SERVICEPREVIEW = new preview
 */
export const rootStates = {
  STARTPAGE: 0,
  USECASESELECTION: 1,
  PROJECTDESCRIPTION: 2,
  REGISTER: 3,
  SERVICEDETAILVIEW: 4,
  ADMINISTRATION: 5,
  ADDSERVICE: 6,
  MANAGESERVICES: 7,
  WAITING: 8,
  HTTPERROR: 9,
  SERVICEPREVIEW: 10,
  HTTPLOGINERROR: 11,
  PROJECTOVERVIEW: 12
};
/**
 * the enumeration contains all entity framework service classes
 */
export const efTypeMap = {
  DIRECTATTACHEDSTORAGE: "DirectAttachedStorag",
  OBJECTSTORAGE: "ObjectStorageService",
  KEYVALUESTORAGE: "KeyValueStoreService",
  ONLINEDRIVESTORAGE: "OnlineDriveStorageSe",
  RELATIONALDATABASE: "RelationalDatabaseSe",
  BLOCKSTORAGE: "BlockStorageService"
};
/**
 * the enumeration contains all entity framework metadata
 */
export const efTypes = [
  { "key": "DIRECTATTACHEDSTORAGE", "name": "Direct Attached Storage" },
  { "key": "OBJECTSTORAGE", "name": "Object Storage" },
  { "key": "KEYVALUESTORAGE", "name": "Key-Value Storage" },
  { "key": "ONLINEDRIVESTORAGE", "name": "Online Drive Storage" },
  { "key": "RELATIONALDATABASE", "name": "Relational Database Storage" },
  { "key": "BLOCKSTORAGE", "name": "Block Storage" }
];
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
export const viewStates = {
  DEFAULT: 0,
  WAITING: 1,
  READY: 2
};
/**
 * the backend's server location
 */
//export const serverLocation = "http://217.160.64.83:81"; // LIVE VERSION
export const serverLocation = "http://localhost:58021"; // LOCAL DEBUGGING