import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as globals from "../globals";
import { UseCaseHistoryEntry } from '../classes/use-case-history-entry';
import { Service, BlockStorageService } from '../classes/service';

@Injectable()
export class UseCaseService {

    constructor(
        private http: HttpClient
    ) {

    }
    /**
     * the method sends the search request to the server
     */
    sendSearch(input: UseCaseHistoryEntry[]){
        return this.http.get<BlockStorageService[]>(globals.serverLocation + "/" +  BlockStorageService.location);
    }
    /**
     * the method returns all use-cases from the configuration file
     */
    getUseCases() {
        return this.http.get("../assets/usecases.json");
    }
}