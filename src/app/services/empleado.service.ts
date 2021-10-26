//a traves de este services nos comunicamos con el backend

import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) {

  }

  agregarEmpleado(empleado:any):Promise<any>{
    return this.firestore.collection('empleados').add(empleado);
  }

  //servicio que retorna la lista de empleados
  getEmpleados():Observable<any>{
    return this.firestore.collection('empleados',ref=> ref.orderBy('fechaCreacion','desc')).snapshotChanges();
  }


}
