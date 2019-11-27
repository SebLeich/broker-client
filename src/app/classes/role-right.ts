export class RoleRight {

    public isAllowed: boolean;
    public roles: [];
    public rule: Rule;

    constructor(object){
        this.isAllowed = object.isAllowed;
        this.roles = object.roles;
        this.rule = new Rule(object.rule);
    }

}

export class Rule {

    public id: number;
    public ruleCode: string;
    public ruleDesc: string;
    public ruleTitle: string;

    constructor(object){
        this.id = object.id;
        this.ruleCode = object.ruleCode;
        this.ruleDesc = object.ruleDesc;
        this.ruleTitle = object.ruleTitle;
    }
    
}