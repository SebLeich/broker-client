import { IService } from './service';

/**
 * the class represents a search vector for service filtering
 */
export class SearchVector {

    /**
     * the type of the service
     */
    type: IService = null;
    /**
     * the constructor creates a new instance of a search vector
     */
    constructor(type: IService){
        this.type = type;
    }
    /**
     * the method checks whether the search can be executed
     */
    isSearchable(){
        if(this.type == null) return false;
        return true;
    }
}