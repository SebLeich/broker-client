export class RoleRight {

    public isAllowed: boolean;
    public roles: Role[];
    public rule: Rule;
    public ruleId: number;

    constructor(object){
        this.isAllowed = object.isAllowed;
        this.roles = object.roles;
        this.rule = new Rule(object.rule);
        this.ruleId = object.ruleId;
    }

}

export class Role {

    public roleName: string;

    constructor(object){
        this.roleName = object.roleName;
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

/**
 * the class contains an application's user
 */
export class User {
    public id: string;
    public username: string;
    public password: string;
    public confirmPassword: string;
    public roles: string[] = [];
    /**
     * the constructor creates a new instance of an user
     */
    constructor(object?){
        if(object != null && typeof(object) != "undefined"){
            this.id = object.id;
            this.username = object.userName;
            this.password = object.password;
            this.confirmPassword = object.confirmPassword;
            for(var index in object.roles) this.roles.push(object.roles[index].roleName);
        }
    }
    /**
     * the method checks whether the user model is valid for registration
     */
    isLoginValid() {
        if (this.username.length < 4) return false;
        if (this.password.length < 6) return false;
        return true;
    }
    /**
     * the method checks whether the user model is valid for registration
     */
    isRegistrationValid() {
        if (this.username.length < 4) return false;
        if (this.password.length < 6) return false;
        if (this.password != this.confirmPassword) return false;
        return true;
    }
}