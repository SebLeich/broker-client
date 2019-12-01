import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { BackEndService } from 'src/app/services/backend-service';
import * as globals from "../../globals";
import { ServicePreview, DirectAttachedService, KeyValueStorageService, ObjectStorageService, BlockStorageService, OnlineDriveStorageService, RelationalDatabaseService, IService } from "../../classes/service";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ManageServicesComponent implements OnInit {

  public _ser: ServicePreview[];
  public readonly serviceMgmCols: string[] = ["id", "serviceName", "discriminator"];

  public dataSource: MatTableDataSource<ServicePreview> = new MatTableDataSource<ServicePreview>(this._ser);

  @Output() stateEmitter = new EventEmitter();
  @Output() serviceEmitter = new EventEmitter();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: BackEndService) {

  }

  editService(o: ServicePreview) {
    var url = "";
    var t: IService;
    switch (o.discriminator) {
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
    this.dataSource.paginator = this.paginator;
    this.service.get("api/service").subscribe((result) => {
      this._ser = [];
      for (var index in result) {
        this._ser.push(new ServicePreview(result[index]));
      }
      this.dataSource = new MatTableDataSource<ServicePreview>(this._ser);
      this.dataSource.paginator = this.paginator;
    });
  }
}
