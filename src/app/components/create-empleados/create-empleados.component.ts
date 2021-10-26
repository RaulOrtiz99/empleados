import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmpleadoService} from "../../services/empleado.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted=false;
  loading=false;

  constructor(

    private fb:FormBuilder,
    private _empleadoService:EmpleadoService,
    private router:Router,
    private toastr: ToastrService
  ) {
    this.createEmpleado=this.fb.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      documento:['',Validators.required],
      salario:['',Validators.required],
    })
  }

  ngOnInit(): void {
  }

  //Este medoto agrega empleados o mas bien los crea en firebase
  agregarEmpleado():void{
    this.submitted=true;
    if (this.createEmpleado.invalid){
      return;
    }
    //este es el objeto que se le envia a firebase
    const empleado:any={
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento:this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading=true;
    this._empleadoService.agregarEmpleado(empleado).then(()=>{
     // console.log("Empleado registrado con exito");
      this.toastr.success('El empleado fue registrado con exito','Empleado registrado',{
        positionClass:'toast-bottom-right',
      });
      //redireccionar con router
      this.loading=false;
      this.router.navigate(['/list-empleados']);
    }).catch(error=>{
      console.log(error);
    })
  }




}
