export class User {
    public id: string;
    public username: string;
    public password: string;
    public confirmPassword: string;
    /**
     * the method checks whether the user model is valid for registration
     */
    isRegistrationValid(){
        if(this.username.length < 6) return false;
        if(this.password.length < 6) return false;
        if(this.password != this.confirmPassword) return false;
        return true;
    }
}