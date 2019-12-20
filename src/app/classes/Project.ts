import { SessionState } from './metadata';
import { MatchingResponse } from './search';

export class Project {
  projectId: number;
  projectTitle: string;
  projectDescription: string;
  matchingResponses: MatchingResponse[] = [];
  sessionState: SessionState;

  constructor() {
    this.sessionState = new SessionState();
  }

  public setTitle(title: string) {
    this.projectTitle = title;
  }
  public setDescription(description: string) {
    this.projectDescription = description;
  }
}
