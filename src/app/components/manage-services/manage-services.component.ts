import { Component, EventEmitter, OnInit, ViewChild, Output, Input } from '@angular/core';
import { BackEndService } from 'src/app/services/backend-service';
import * as globals from "../../globals";
import { ServicePreview, DirectAttachedService, KeyValueStorageService, ObjectStorageService, BlockStorageService, OnlineDriveStorageService, RelationalDatabaseService, IService } from "../../classes/service";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ManageServicesComponent implements OnInit {

  public _ser: ServicePreview[];
  public readonly serviceMgmCols: string[] = ["id", "options", "serviceName", "creation", "lastModified", "discriminator"];

  public dataSource: MatTableDataSource<ServicePreview> = new MatTableDataSource<ServicePreview>(this._ser);

  @Input() canDeleteServices;

  @Output() stateEmitter = new EventEmitter();
  @Output() serviceEmitter = new EventEmitter();
  @Output() servicePreviewEmitter = new EventEmitter();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private service: BackEndService) {

  }

  showService(o: ServicePreview) {
    var url = "";
    var t: IService;
    switch (o.discriminatorNorm) {
      case globals.efTypeMap.DIRECTATTACHEDSTORAGE:
        t = DirectAttachedService;
        url = DirectAttachedService.location;
        break;
      case globals.efTypeMap.KEYVALUESTORAGE:
        t = KeyValueStorageService;
        url = KeyValueStorageService.location;
        break;
      case globals.efTypeMap.OBJECTSTORAGE:
        t = ObjectStorageService;
        url = ObjectStorageService.location;
        break;
      case globals.efTypeMap.BLOCKSTORAGE:
        t = BlockStorageService;
        url = BlockStorageService.location;
        break;
      case globals.efTypeMap.ONLINEDRIVESTORAGE:
        t = OnlineDriveStorageService;
        url = OnlineDriveStorageService.location;
        break;
      case globals.efTypeMap.RELATIONALDATABASE:
        t = RelationalDatabaseService;
        url = RelationalDatabaseService.location;
        break;
    }
    this.service.get(url + "/" + o.id).subscribe((result) => {
      this.servicePreviewEmitter.emit(new t(result));
    });
  }

  editService(o: ServicePreview) {
    var url = "";
    var t: IService;
    switch (o.discriminatorNorm) {
      case globals.efTypeMap.DIRECTATTACHEDSTORAGE:
        t = DirectAttachedService;
        url = DirectAttachedService.location;
        break;
      case globals.efTypeMap.KEYVALUESTORAGE:
        t = KeyValueStorageService;
        url = KeyValueStorageService.location;
        break;
      case globals.efTypeMap.OBJECTSTORAGE:
        t = ObjectStorageService;
        url = ObjectStorageService.location;
        break;
      case globals.efTypeMap.BLOCKSTORAGE:
        t = BlockStorageService;
        url = BlockStorageService.location;
        break;
      case globals.efTypeMap.ONLINEDRIVESTORAGE:
        t = OnlineDriveStorageService;
        url = OnlineDriveStorageService.location;
        break;
      case globals.efTypeMap.RELATIONALDATABASE:
        t = RelationalDatabaseService;
        url = RelationalDatabaseService.location;
        break;
    }
    this.service.get(url + "/" + o.id).subscribe((result) => {
      this.serviceEmitter.emit(new t(result));
    });
  }

  ngOnInit() {
    this.service.get("api/service").subscribe((result) => {
      this._ser = [];
      for (var index in result) {
        this._ser.push(new ServicePreview(result[index]));
      }
      this.dataSource = new MatTableDataSource<ServicePreview>(this._ser);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  removeService(o: ServicePreview) {
    var url = "";
    var t: IService;
    switch (o.discriminatorNorm) {
      case globals.efTypeMap.DIRECTATTACHEDSTORAGE:
        t = DirectAttachedService;
        url = DirectAttachedService.location;
        break;
      case globals.efTypeMap.KEYVALUESTORAGE:
        t = KeyValueStorageService;
        url = KeyValueStorageService.location;
        break;
      case globals.efTypeMap.OBJECTSTORAGE:
        t = ObjectStorageService;
        url = ObjectStorageService.location;
        break;
      case globals.efTypeMap.BLOCKSTORAGE:
        t = BlockStorageService;
        url = BlockStorageService.location;
        break;
      case globals.efTypeMap.ONLINEDRIVESTORAGE:
        t = OnlineDriveStorageService;
        url = OnlineDriveStorageService.location;
        break;
      case globals.efTypeMap.RELATIONALDATABASE:
        t = RelationalDatabaseService;
        url = RelationalDatabaseService.location;
        break;
    }
    this.service.delete(url + "/" + o.id).subscribe((result) => {
      this.ngOnInit();
    });
  }

  serviceMetaData(discriminator: string){
    var key = Object.keys(globals.efTypeMap).find(key => globals.efTypeMap[key] == discriminator.substr(0, 20).split("_")[0]);
    return globals.efTypes.find(x => x.key == key);
  }

}
