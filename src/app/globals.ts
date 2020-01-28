/**
 * the enumeration contains all available window states
 * SERVICEDETAILVIEW = old preview
 * SERVICEPREVIEW = new preview
 */
export const rootStates = {
  STARTPAGE: 0,
  USECASESELECTION: 1,
  PROJECTDETAILVIEW: 2,
  REGISTER: 3,
  SERVICEDETAILVIEW: 4,
  ADMINISTRATION: 5,
  ADDSERVICE: 6,
  MANAGESERVICES: 7,
  WAITING: 8,
  HTTPERROR: 9,
  MATCHINGRESPONSEOVERVIEW: 10,
  HTTPLOGINERROR: 11,
  PROJECTOVERVIEW: 12,
  PROJECTEDITVIEW: 13,
  MATCHINGRESPONSEDETAILVIEW: 14,
  MANAGEUSECASES: 15,
  IMPRINT: 16
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
export const serverLocation = "https://vibros.isih.wiwi.tu-dresden.de:444"; // LIVE VERSION

//export const serverLocation = "http://localhost:58021"; // LOCAL DEBUGGING

export const designColors = [
  { full: "rgb(186, 6, 48)", med: "rgba(186, 6, 48, .6)", light: "rgba(186, 6, 48, .3)" },
  { full: "rgb(255, 108, 10)", med: "rgba(255, 108, 10, .6)", light: "rgba(255, 108, 10, .3)" },
  { full: "rgb(17, 70, 135)", med: "rgba(17, 70, 135, .6)", light: "rgba(17, 70, 135, .3)" },
  { full: "rgb(46, 148, 87)", med: "rgba(46, 148, 87, .6)", light: "rgba(46, 148, 87, .3)" },
  { full: "rgb(124, 232, 74)", med: "rgba(124, 232, 74, .6)", light: "rgba(124, 232, 74, .3)" },
  { full: "rgb(156, 19, 194)", med: "rgba(156, 19, 194, .6)", light: "rgba(156, 19, 194, .3)" },
  { full: "rgb(194, 19, 98)", med: "rgba(194, 19, 98, .6)", light: "rgba(194, 19, 98, .3)" },
  { full: "rgb(28, 189, 167)", med: "rgba(28, 189, 167, .6)", light: "rgba(28, 189, 167, .3)" }
];

export class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}