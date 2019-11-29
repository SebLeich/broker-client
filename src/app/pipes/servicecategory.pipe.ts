import { Pipe, PipeTransform } from '@angular/core';
import { ServiceCategory } from '../classes/service';

@Pipe({
  name: 'servicecategory'
})
export class ServicecategoryPipe implements PipeTransform {

  transform(value: number, serviceCategories: ServiceCategory[]): string {
    var c = serviceCategories.find(x => x.id == value);
    if(typeof(c) == "undefined") return null;
    return c.cloudServiceCategoryName;
  }
  
}
