import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if(value == 0){
      return "LUNES"
    } else if(value == 1){
      return "MARTES"
    }else if(value == 2){
      return "MIERCOLES"
    }else if(value == 3){
      return "JUEVES"
    }else if(value == 4){
      return "VIERNES"
    }else if(value == 5){
      return "SABADO"
    }else if(value == 6){
      return "DOMINGO"
    }
    return null;
  }

}
