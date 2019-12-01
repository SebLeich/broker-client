import { Pipe, PipeTransform } from '@angular/core';
import { ServiceModel } from "../classes/service";

@Pipe({
  name: 'servicemodel'
})
export class ServiceModelPipe implements PipeTransform {

  transform(value: number, serviceModels: ServiceModel[]): string {
    var m = serviceModels.find(x => x.id == value);
    if(typeof(m) == "undefined") return null;
    return m.cloudServiceModelName;
  }
}
