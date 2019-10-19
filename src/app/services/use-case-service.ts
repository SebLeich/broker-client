import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UseCaseService {

    constructor(
        private http: HttpClient
    ) {

    }

    getUseCases() {
        return this.http.get("../assets/usecases.json");
    }
}