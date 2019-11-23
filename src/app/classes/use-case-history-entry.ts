import { UseCase } from "../classes/use-case";

export class UseCaseHistoryEntry {

    time: number = Date.now();
    object: UseCase;

    constructor(object: UseCase){
        this.object = object;
    }

}