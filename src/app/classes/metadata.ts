import { IService } from './service';
import { StartpageComponent } from '../components/startpage/startpage.component';
import { UseCase } from './use-case';
import {
    FormGroup,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';

export class CloudServiceType {
    public name: string = "";
    public type: IService;
    constructor(object) {
        this.name = object.name;
        this.type = object.type;
    }
}

/**
 * the class contains the servers meta data object
 */
export class MetaData {

    public serviceCount: number;
    public providerCount: number;
    public userCount: number;
    public searchCount: number;
    public time: number;

    constructor(object){
        this.serviceCount = object.serviceCount;
        this.searchCount = object.searchCount;
        this.providerCount = object.providerCount;
        this.userCount = object.userCount;
        this.time = object.time;
    }

    static get location(): string {
        return "api/metadata";
    }
}

export function atLeastOneValidator(): ValidatorFn {
    return function validate(formGroup: FormGroup) {
        var checked = 0;
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.controls[key];
            if (control.value === true) {
                checked++;
            }
        });
        if (checked == 0) {
            return {
                requireCheckboxesToBeChecked: true
            };
        }
        return null;
    };
}

export function exactlyOneValidator(): ValidatorFn {
    return function validate(formGroup: FormGroup) {
        var checked = 0;
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.controls[key];
            if (control.value === true) {
                checked++;
            }
        });
        if (checked != 1) {
            return {
                requireCheckboxesToBeChecked: true
            };
        }
        return null;
    };
}

export class SessionState {
    public isNew: boolean = true;
    public isChanged: boolean = false;
    constructor() {

    }
}
/**
 * the class contains a tile for option selection
 */
export class StartPageTile {
    public cols: number = 1;
    public rows: number = 1;
    public bgColor: string = "rgba(255, 255, 255, 0.5)";
    public headColor: string = "#262678";
    public text: string = "[NO_TEXT]";
    public subtitle: string = "[NO_SUBTITLE]";
    public subColor: string = "rgb(233, 233, 233)";
    public icon: string = null;
    public click;
    public condition: { (data: StartpageComponent): boolean; } = null;
    public class: string = "";
    public counter;
    /**
     * the constructor creates a new instance of a start page tile
     */
    constructor(object?) {
        if (typeof (object) != "undefined" && object != null) {
            this.cols = object.cols;
            this.rows = object.rows;
            this.bgColor = object.bgColor;
            this.headColor = object.headColor;
            this.text = object.text;
            this.subtitle = object.subtitle;
            this.click = object.click;
            if (typeof (object.ngIf) == "function") this.condition = object.ngIf;
            if (typeof (object.icon) != "undefined" && object.icon != null) {
                this.icon = object.icon;
            }
            if (typeof (object.class) != "undefined" && object.class != null) {
                this.class = object.class;
            }
            if (typeof (object.counter) != "undefined" && object.counter != null) {
                this.counter = object.counter;
            }
        }
    }
    ngIf(input: StartpageComponent) {
        if (this.condition == null) return true;
        else {
            return this.condition(input);
        }
    }
}

export class UseCaseSelecionStep {
    public id: number;
    public headline: string;
    public options: UseCaseSelectionOption[] = [];
    public fg: FormGroup;
    public isServiceEditComponent: boolean = false;
    constructor(object: any) {
        this.id = object.id;
        this.headline = object.headline;
        this.options = object.options;
        this.fg = object.fg;
        if(object != null && typeof(object) != "undefined"){
            if(object.isServiceEditComponent != null && typeof(object.isServiceEditComponent) == "boolean"){
                this.isServiceEditComponent = object.isServiceEditComponent;
            }
        }
    }
}

export class SelectionComponent {
    public id: number;
    public index: number;
    public icon: string;
    public text: string;
    public desc: string;
    public isActive: boolean;
    public condition: { (data: StartpageComponent): boolean; } = function () {
        return true;
    };
    public uC: UseCase = null;
    public hasPriority: boolean = false;
    public priority: number;
    constructor(object: any) {
        this.id = object.id;
        this.index = object.index;
        this.text = object.text;
        this.icon = object.icon;
        this.desc = object.desc;
        this.isActive = object.isActive;
        this.uC = object.uC;
        if (typeof (object.ngIf) == "function") this.condition = object.ngIf;
        if (typeof (object.hasPriority) == "boolean") this.hasPriority = object.hasPriority;
        if (typeof (object.priority) == "number") this.priority = object.priority;
    }
}

export class UseCaseMultipleSelectionOption extends SelectionComponent {
    public list;
    constructor(object: any) {
        super(object);
        this.list = object.list;
    }
}

export class UseCaseSelectionOption extends SelectionComponent {
    constructor(object: any) {
        super(object);
    }
}


export class PreviewOption extends SelectionComponent {
    customClass: string;
    constructor(object: any) {
        super(object);
        this.customClass = "";
        if(typeof(object.customClass) == "string") this.customClass = object.customClass;
    }
}