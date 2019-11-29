import { IService } from './service';
import { StartpageComponent } from '../components/startpage/startpage.component';

export class CloudServiceType {
    public name: string = "";
    public type: IService;
    constructor(object){
        this.name = object.name;
        this.type = object.type;
    }
}

export class SessionState {
    public isNew: boolean = true;
    constructor(){

    }
}
/**
 * the class contains a tile for option selection
 */
export class StartPageTitle {
    public cols: number = 1;
    public rows: number = 1;
    public bgColor: string = "#ffffffc5";
    public headColor: string = "#262678";
    public text: string = "[NO_TEXT]";
    public subtitle: string = "[NO_SUBTITLE]";
    public subColor: string = "rgb(233, 233, 233)";
    public click;
    public condition: { (data: StartpageComponent): boolean; } = null;
    /**
     * the constructor creates a new instance of a start page tile
     */
    constructor(object?){
        if(typeof(object) != "undefined" && object != null){
            this.cols = object.cols;
            this.rows = object.rows;
            this.bgColor = object.bgColor;
            this.headColor = object.headColor;
            this.text = object.text;
            this.subtitle = object.subtitle;
            this.click = object.click;
            if(typeof(object.ngIf) == "function") this.condition = object.ngIf;
        }
    }
    ngIf(input: StartpageComponent){
        if(this.condition == null) return true;
        else {
            console.log(this, this.condition(input), input);
            return this.condition(input);
        }
    }
}