import {Observable} from 'rxjs';

export interface ListServiceFunction {
  observableFunction: Observable<any>;
  nameFunction: string;
}
