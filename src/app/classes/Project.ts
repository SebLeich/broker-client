import { SessionState } from './metadata';
import { MatchingResponse } from './search';

export class Project {
  id: number;
  projectTitle: string;
  projectDescription: string;
  matchingResponse: MatchingResponse[] = [];
  sessionState: SessionState = new SessionState();
  userId: string;

  constructor(object?) {
    this.matchingResponse = [];
    if (object != null && typeof (object) != "undefined") {
      this.sessionState.isNew = false;
      this.id = object.projectId;
      this.projectTitle = object.projectTitle;
      this.projectDescription = object.projectDescription;
      for (var index in object.matchingResponse) {
        var o = object.matchingResponse[index];
        this.matchingResponse.push(new MatchingResponse(o, null, null));
      }
    } else {
      this.sessionState.isNew = true;
    }
  }

  toServerObject(): any {
    var matchingResponses = [];
    return {
      "projectId": this.id,
      "projectTitle": this.projectTitle,
      "projectDescription": this.projectDescription,
      "userId": this.userId,
      "matchingResponse": matchingResponses
    };
  }
}
