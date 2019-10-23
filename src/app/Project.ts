export class Project {
  projectId: number;
  projectTitle: string;
  projectDescription: string;

  constructor() {}

  public setTitle(title: string) {
    this.projectTitle = title;
  }
  public setDescription(description: string) {
    this.projectDescription = description;
  }
  public setTitleAndDescription(obj: Array<string>) {
    this.projectTitle = obj[0];
    this.projectDescription = obj[1];
  }
}
