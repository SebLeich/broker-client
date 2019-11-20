import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as globals from "../globals";
import { UseCaseHistoryEntry } from '../classes/use-case-history-entry';
import { Service, BlockStorageService } from '../classes/service';
import { User } from '../classes/user';
import { URLSearchParams } from 'url';

/**
 * the service provides access to the backend's API
 */
@Injectable()
export class BackEndService {

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
    /**
     * the method logs an user in
     */
    loginUser(credentials: User) {
        console.log(credentials);
        return this.http.post(
            globals.serverLocation + "/token",
            "grant_type=password&username=" + encodeURIComponent(credentials.username) + "&password=" + encodeURIComponent(credentials.password)
        );
    }
    /**
     * the method persists a service
     */
    persistService(input: Service) {
        return this.http.put<Service>(globals.serverLocation + "/" + input.location, input);
    }
    /**
     * the method regiters a new User
     */
    registerUser(credentials: User) {
        return this.http.post<User>(globals.serverLocation + "/api/account/register", credentials)
    }
    /**
     * the method sends the search request to the server
     */
    sendSearch(input: UseCaseHistoryEntry[]) {
        return this.http.get<BlockStorageService[]>(globals.serverLocation + "/" + BlockStorageService.location);
    }
}