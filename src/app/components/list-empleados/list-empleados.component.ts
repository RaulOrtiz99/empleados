import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {EmpleadoService} from "../../services/empleado.service";

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {

  empleados:any[]=[];
  //este items es de firebase
items: Observable<any[]>
  constructor(
    private _empleadoService: EmpleadoService,
    firestore:AngularFirestore
  ) {
    this.items=firestore.collection('items').valueChanges();
  }

  ngOnInit(): void {
    this.getEmpleados()
  }
  getEmpleados(){
    this._empleadoService.getEmpleados().subscribe(data =>{
      this.empleados=[];
      data.forEach((element:any)=>{
        //console.log(element.payload.doc.data())
        this.empleados.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data(),
        })
      });
      console.log(this.empleados);
    })
  }

}
