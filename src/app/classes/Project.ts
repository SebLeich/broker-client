import { SessionState } from './metadata';
import { MatchingResponse, SearchVector } from './search';

export class Project {
  id: number;
  projectTitle: string;
  projectDescription: string;
  searchVector: SearchVector = null;
  created: string;
  lastModified: string;
  matchingResponse: MatchingResponse[] = [];
  sessionState: SessionState = new SessionState();
  userId: string;
  icon: string = "layers";

  constructor(object?) {
    this.matchingResponse = [];
    if (object != null && typeof (object) != "undefined") {
      this.sessionState.isNew = false;
      this.id = object.projectId;
      this.projectTitle = object.projectTitle;
      this.projectDescription = object.projectDescription;
      if(typeof(object.searchVector) != "undefined" && object.searchVector != null){
        this.searchVector = object.searchVector;
      }
      this.created = object.created;
      this.lastModified = object.lastModified;
      for (var index in object.matchingResponse) {
        var o = object.matchingResponse[index];
        this.matchingResponse.push(new MatchingResponse(o, null, null));
      }
    } else {
      this.sessionState.isNew = true;
      this.searchVector = new SearchVector();
    }
  }

  get location(): string{
    return Project.location;
  }

  static get location(): string {
    return "api/project";
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
