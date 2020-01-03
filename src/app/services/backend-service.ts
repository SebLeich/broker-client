import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as globals from "../globals";
import { Service, IService } from '../classes/service';
import { User } from '../classes/account';
import { SearchVector, MatchingResponse } from "src/app/classes/search";
import { Project } from '../classes/project';

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
     * the method initiates a delete request to the backend
     */
    delete(url) {
        return this.http.delete(globals.serverLocation + "/" + url, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        });
    }
    /**
     * the method initiates a get request to the backend
     */
    get(url) {
        return this.http.get(globals.serverLocation + "/" + url, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        });
    }
    /**
     * the method returns all use-cases from the configuration file
     */
    getUseCases() {
        return this.http.get("./assets/usecases.json");
    }
    /**
     * the method logs an user in
     */
    loginUser(credentials: User) {
        return this.http.post(
            globals.serverLocation + "/token",
            "grant_type=password&username=" + encodeURIComponent(credentials.username) + "&password=" + encodeURIComponent(credentials.password)
        );
    }
    /**
     * the method persists a service
     */
    persistService(input: Service) {
        console.log(input, input.toServerObject());
        var config = {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        };
        if (input.sessionState.isNew) {
            return this.http.post<Service>(globals.serverLocation + "/" + input.location, input.toServerObject(), config);
        } else {
            return this.http.put<Service>(globals.serverLocation + "/" + input.location, input.toServerObject(), config);
        }
    }
    /**
     * the method persists a project
     */
    persistProject(input: Project) {
        console.log(input, input.toServerObject());
        var config = {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        };
        if (input.sessionState.isNew) {
            return this.http.post<Project>(globals.serverLocation + "/" + input.location + "/current", input.toServerObject(), config);
        } else {
            return this.http.put<Project>(globals.serverLocation + "/" + input.location + "/current", input.toServerObject(), config);
        }
    }
    /**
     * the method initiates a post request to the backend
     */
    post(url, data) {
        return this.http.post(globals.serverLocation + "/" + url, data, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
        });
    }
    /**
     * the method regiters a new User
     */
    registerUser(credentials: User) {
        return this.http.post<User>(globals.serverLocation + "/api/account/register", credentials);
    }
    /**
     * the method sends the search request to the server
     */
    sendSearch(type: IService, input: SearchVector, successcallback, errorCallback) {
        //if(!input.isSearchable()) return;
        return this.post(type.location + "/search", input).subscribe((result) => {
            var output = [];
            for (var index in result) {
                var r = result[index];
                output.push(new MatchingResponse(r.match));
            }
            successcallback(output);
        }, (error) => {
            errorCallback(error);
        });
    }
    /**
     * the method returns the current access token
     */
    get token() {
        return localStorage.getItem("access_token");
    }
    /**
     * the method returns the current access token
     */
    set token(token: string) {
        localStorage.setItem("access_token", token);
    }
}