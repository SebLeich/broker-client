import { Pipe, PipeTransform } from '@angular/core';
import { ServiceProvider } from '../classes/service';

@Pipe({
  name: 'serviceprovider'
})
export class ServiceproviderPipe implements PipeTransform {

  transform(value: number, serviceProviders: ServiceProvider[]): string {
    var c = serviceProviders.find(x => x.id == value);
    if(typeof(c) == "undefined") return null;
    return c.providerName;
  }

}
