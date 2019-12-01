/**
 * the enumeration contains all available window states
 */
export const rootStates = {
  STARTPAGE: 0,
  USECASESELECTION: 1,
  PROJECTDESCRIPTION: 2,
  REGISTER: 3,
  SERVICEDETAILVIEW: 4,
  ADMINISTRATION: 5,
  ADDSERVICE: 6,
  MANAGESERVICES: 7
};
/**
 * the enumeration contains all available window states
 */
export const efTypeMap = {
  DIRECTATTACHEDSTORAGE: "DirectAttachedStorag_D0A5DFB0B3772DF36A72D5925649B1433F0BA2814B30536F832EB74642B16AAA",
  OBJECTSTORAGE: "ObjectStorageService_8181285E6B769D412054DDFA5CC2FFC015CD36D2D5A4A637B9686EF02E584254",
  KEYVALUESTORAGE: "KeyValueStoreService_EBF3D02B0F548CDFE18C6A527837A6A8119A71F91F3C7C64BF0C5B447CA61459",
  ONLINEDRIVESTORAGE: "OnlineDriveStorageSe_CDC7AEE89CCA3E9DC8DFBD323469BD130CAA95BF7E2880B339E4162253BA21EB",
  RELATIONALDATABASE: "RelationalDatabaseSe_0A86E133397CE59C0310EDCA561D84A3151C0D9E926231C6ECA4469C389C03A5",
  BLOCKSTORAGE: "BlockStorageService_DA29CF128687B07ED9170B44972D7B8A3079E97D51BAB36673EFFB107557D521"
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