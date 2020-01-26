import { 
  Component, 
  OnInit, 
  Input
} from '@angular/core';
import { BackEndService } from "../../services/backend-service";
import { UseCase } from "../../classes/use-case";
import { MatTableDataSource } from '@angular/material/table';
import { ServiceType } from 'src/app/classes/service';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-use-case-management-view',
  templateUrl: './use-case-management-view.component.html',
  styleUrls: ['./use-case-management-view.component.css']
})
export class UseCaseManagementViewComponent implements OnInit {

  private _useCases: UseCase[] = [];

  protected pageIndex: number = 0;

  quillConfig = {
  };

  @Input() set useCases(useCases: UseCase[]) {
    this._useCases = useCases;
    this.dataSource = new MatTableDataSource<UseCase>(this._useCases);
  }

  @Input() serviceTypes: ServiceType[] = [];

  get useCases(): UseCase[]{
    return this._useCases;
  }

  currentUseCasePointer: number = null;

  public tempUseCase = new UseCase({});

  public readonly uCMgmCols: string[] = ["id", "options", "title", "creation"];

  public readonly useCaseServiceTypeColumns: string[] = ["isRelated", "text"];

  public dataSource: MatTableDataSource<UseCase> = new MatTableDataSource<UseCase>(this._useCases);

  constructor(private _service: BackEndService) { }

  get currentUseCase(): UseCase {
    var u = this.useCases.find(x => x.id == this.currentUseCasePointer);
    if(u == null || typeof(u) == "undefined") return this.tempUseCase;
    return u;
  }

  deleteUseCase(useCase: UseCase){
    if(!useCase.isNew){
      this._service.delete(UseCase.location + "/" + useCase.id).subscribe((result) => {
        var u = this.useCases.find(x => x.id == useCase.id);
        var i = this.useCases.indexOf(u);
        if(i > -1) this.useCases.splice(i, 1);
        this.currentUseCasePointer = null;
        this.pageIndex = 0;
        this.useCases = this.useCases;
        console.log(this.useCases);
      }, (error) => console.log(error));
    }
  }

  isRelated(element: ServiceType){
    if(this.currentUseCase.serviceClasses.filter(x => x.id == element.id).length > 0){
      return true;
    }
    return false;
  }

  get editMode(): boolean {
    if(this.currentUseCasePointer == null) return false;
    return true;
  }

  editUseCase(useCase: UseCase){
    this.currentUseCasePointer = useCase.id;
    this.pageIndex = 1;
  }

  log(t){
    console.log(t);
  }

  ngOnInit() {
    console.log(this); 
  }

  persistCurrentUseCase(){
    if(this.currentUseCase.isNew){
      this._service.post(UseCase.location, this.currentUseCase.toServerObject()).subscribe((result) => {
        this.useCases.push(new UseCase(result));
        this.tempUseCase = new UseCase({});
        this.pageIndex = 0;
        this.currentUseCasePointer = null;
        this.useCases = this.useCases;
      }, (error) => console.log(error));
    } else {
      this._service.put(UseCase.location, this.currentUseCase.toServerObject()).subscribe((result) => {
        this.currentUseCasePointer = null;
        this.pageIndex = 0;
        this.useCases = this.useCases;
      }, (error) => console.log(error));
    }
  }

  validateUseCaseServiceTypeMapping(type: ServiceType){
    var existing = this.currentUseCase.serviceClasses.filter(x => x.id == type.id);
    if(existing.length > 0){
      var i = this.currentUseCase.serviceClasses.indexOf(existing[0]);
      this.currentUseCase.serviceClasses.splice(i, 1);
    } else {
      this.currentUseCase.serviceClasses.push(type);
    }
  }

  validateTabs(event: MatTabChangeEvent){
    this.pageIndex = event.index;
    if(this.pageIndex == 0){
      this.currentUseCasePointer = null;
    }
  }

}