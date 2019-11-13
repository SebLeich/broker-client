import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class UseCaseService {

    constructor(
        private http: HttpClient
    ) {

    }

    /**
     * the method returns all use-cases from the configuration file
     */
    getUseCases() {
        return this.http.get("../assets/usecases.json");
    }
    
}