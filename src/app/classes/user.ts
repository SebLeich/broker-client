/**
 * the class contains an application's user
 */
export class User {
    public id: string;
    public username: string;
    public password: string;
    public confirmPassword: string;
    /**
     * the constructor creates a new instance of an user
     */
    constructor(){
        this.id = "";
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
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