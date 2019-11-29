import { Service } from './service';

/**
 * the class represents a search vector for service filtering
 */
export class SearchVector {

    /**
     * the type of the service
     */
    searchType: Service = null;

    /**
     * the constructor creates a new instance of a search vector
     */
    constructor(object?){
        if(typeof(object) != "undefined"){
            this.searchType = object.type;
        }
    }
    /**
     * the method checks whether the search can be executed
     */
    isSearchable(){
        if(this.searchType == null) return false;
        return true;
    }
}