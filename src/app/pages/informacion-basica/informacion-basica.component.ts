import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators, AbstractControl } from '@angular/forms';
import { RequestManager } from '../services/requestManager';
import Swal from 'sweetalert2';
import { UserService } from '../services/userService';
import { UtilService } from '../services/utilService';
import { environment } from './../../../environments/environment'
import { Vinculacion } from '../../@core/models/vinculacion';
import { LocalDataSource } from 'ng2-smart-table';
import { combineLatest, from } from 'rxjs';
import { Router } from '@angular/router';
import { Elemento } from '../../@core/models/elemento'
import { FormularioBusqueda } from '../../@core/models/formulario_busqueda'
import { analyzeAndValidateNgModules, NullTemplateVisitor } from '@angular/compiler';
import { Entrada } from 'src/app/@core/models/entrada';
import { Salida } from 'src/app/@core/models/salida';
import { ElementoArka } from 'src/app/@core/models/elemento_arka';


@Component({
  selector: 'app-informacion-basica',
  templateUrl: './informacion-basica.component.html',
  styleUrls: ['./informacion-basica.component.scss']
})
export class InformacionBasicaComponent implements OnInit {
  isPost: boolean = true;
  elemento: Elemento;
  formularioBusqueda: any;
  elementos: Elemento[]  = [];
  selectedRows: any;
  entrada: any;
  salida: any;
  elementoArka: any;
  elementotemp:any;
  elementotempdos:any;
  sourceElementos: LocalDataSource = new LocalDataSource();
  settingsElementos: any;
  formBuscar: FormGroup;
  formElemento: FormGroup;
  id = new FormControl();
  tipoBusqueda = new FormControl();
  nuevafechasalida=new FormControl();
  nuevovalor=new FormControl();
  nuevavidautil=new FormControl();
  nuevovalorresidual=new FormControl();
  constructor(
    private request: RequestManager,
    private userService: UserService,
    private utilService: UtilService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.elemento={Id:null,Cantidad:null,CuentaEntrada:null,CuentaSalida:null,Depreciacion:null,DepreciacionAcumulada:null,DepreciacionMes:null,Descripcion:null,Entrada:null
      ,FechaRegistro:null,FechaSalida:null,Iva:null,NuevaFechaSalida:null,NuevaVidaUtil:null,NuevoValor:null,NuevoValorResidual:null,Salida:null,Subtotal:null,TipoBien:null
      ,TotalConIva:null,TotalIva:null,Unidad:null,Valor:null,VidaUtil:null,Placa:null};  
      this.formBuscar = new FormGroup({
        id: new FormControl(),
        tipoBusqueda: new FormControl()
     });
     this.formElemento = new FormGroup({
      nuevafechasalida:new FormControl(),
      nuevovalor:new FormControl(),
      nuevavidautil:new FormControl(),
      nuevovalorresidual:new FormControl()
   });
   this.elementoArka=null;

 
    }

  
  conditionallyRequiredValidator(formControl: AbstractControl) {
    if (!formControl.parent) {
      return null;
    }
    if (formControl.parent.get('radioVacunacion').value === 'true') {
      return Validators.required(formControl); 
    }
    return null;
  }

  getErrorMessage(campo: FormControl) {
    if (campo.hasError('required', )) {
      return 'Campo requerido';
    } else {
      return 'Introduzca un valor válido';
    }
  }

  
  cargarElementos() {
    this.settingsElementos = {
      actions: {add: false,
      edit: false,
      delete: false},
      columns: {
        Descripcion: {
          title: 'DESCRIPCION',
          filter: false,
          editable: false,
          valuePrepareFunction: (value) => value,
        },
        Unidad: {
          title: 'UNIDAD',
          filter: false,
          editable: false,
          valuePrepareFunction: (value) => value,
        },
        Cantidad: {
          title: 'CANTIDAD',
          filter: false,
          editable: false,
          valuePrepareFunction: (value) => value,
        },
        
        TipoBien: {
          title: 'TIPO BIEN',
          filter: false,
          editable: false,
          valuePrepareFunction: (value) => value,
        },
        Placa: {
          title: 'PLACA',
          filter: false,
          editable: false,
          valuePrepareFunction: (value) => value,
        },
        FechaRegistro: {
          title: 'FECHA REGISTRO',
          filter: false,
          editable: false,
          valuePrepareFunction: (value) => value,
        }
      }
    };
  }
  
  public corregirFecha(fecha: string): Date {
    let fechaHora = new Date(fecha);
    fechaHora.setHours(fechaHora.getHours() + 5);
    return fechaHora;
  }

  
  
  

 
  async save() {
   let postElemento='{"_post_elemento":{"id":'+this.elemento.Id+',"fecha_salida":"'+this.formElemento.get('nuevafechasalida').value+
   '"valor":'+ +this.formElemento.get('nuevovalor').value+',"vida_util":'+ this.formElemento.get('nuevavidautil').value+'",valor_residual":'+ this.formElemento.get('nuevovalorresidual').value+', "usuario":"jgcastellanosj@correo.udistrital.edu.co"}}';

   console.log(postElemento);
    const isValidTerm = await this.utilService.termsAndConditional();

    if (isValidTerm) {
      Swal.fire({
        title: 'Información del elemento',
        text: `Se ${this.isPost ? 'almacenará' : 'actualizará'} la información del elemento`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: this.isPost ? 'Guardar' : 'Actualizar',
      }).then(result => {


        
              

            
        
      });
    }
  }

  ngOnInit(): void {
    this.formBuscar = this.formBuilder.group({id: ['', Validators.required], tipoBusqueda:this.tipoBusqueda});
    this.cargarElementos();
   
       
    



  }
  public buscarElemento() {
    this.formularioBusqueda = this.formBuscar.value;
    if( this.formularioBusqueda["tipoBusqueda"]==='PLACA')
    {
      this.request.get(environment.ADMINISTRATIVA_JBPM_SERVICE, '/elemento_placa/'+this.formularioBusqueda["id"])
    .subscribe((elementos: any) => {
      if (elementos) {
        
        this.elementotemp = elementos["elementos"];
        this.elementotempdos=this.elementotemp["elemento"];
        this.elemento.Id=this.elementotempdos[0]["id"];
        this.elemento.Cantidad=this.elementotempdos[0]["cantidad_asignada"];
        this.elemento.CuentaEntrada=this.elementotempdos[0]["grupo_cuentaentrada"];
        this.elemento.CuentaSalida=this.elementotempdos[0]["grupo_cuentasalida"];
        this.elemento.Descripcion=this.elementotempdos[0]["descripcion_elemento"];
        this.elemento.FechaRegistro=this.elementotempdos[0]["fecha_registro"];
        this.elemento.Iva=this.elementotempdos[0]["iva"];
        this.elemento.TotalIva=this.elementotempdos[0]["total_iva"];
        this.elemento.VidaUtil=this.elementotempdos[0]["grupo_vidautil"];
        this.elemento.TotalConIva=this.elementotempdos[0]["total_iva_con"];
        this.elemento.Unidad=this.elementotempdos[0]["unidad"];
        this.elemento.Valor=this.elementotempdos[0]["valor"];
        this.elemento.Subtotal=this.elementotempdos[0]["subtotal_sin_iva"];
        this.elemento.TipoBien=this.elementotempdos[0]["tipo_bien"];
        this.entrada=new Entrada();
        this.entrada.Vigencia=this.elementotempdos[0]["vigencia"];
        this.entrada.Consecutivo=this.elementotempdos[0]["consecutivo_entrada"];
        this.entrada.FechaRegistro=this.elementotempdos[0]["fecha_entrada"];
        this.entrada.Proveedor=this.elementotempdos[0]["proveedor"];
        this.entrada.TipoContrato=this.elementotempdos[0]["tipo_contrato"];
        this.entrada.Factura=this.elementotempdos[0]["numero_factura"];
        this.entrada.NumeroContrato=this.elementotempdos[0]["numero_contrato"];
        this.salida=new Salida();
        this.salida.CuentaSalida=this.elementotempdos[0]["grupo_cuentasalida"];
        this.salida.Vigencia=this.elementotempdos[0]["vigencia"];
        this.salida.Consecutivo=this.elementotempdos[0]["consecutivo_salida"];
        this.salida.Sede=this.elementotempdos[0]["sede"];
        this.salida.Funcionario=this.elementotempdos[0]["funcionario"];
        this.salida.Ubicacion=this.elementotempdos[0]["ubicacion"];
        this.salida.Dependencia=this.elementotempdos[0]["dependencia"];
        this.salida.FechaRegistro=this.elementotempdos[0]["fecha_salida"];
       
        
        }
      
      }, (error) => {
      console.log(error);
      //Swal.close();
      })
    } else if (this.formularioBusqueda["tipoBusqueda"]==='DESCRIPCION')
    {
      this.elementos=[];
      this.request.get(environment.ADMINISTRATIVA_JBPM_SERVICE, '/elemento_descripcion/'+this.formularioBusqueda["id"].toLowerCase())
      .subscribe((elementos: any) => {
        if (elementos) {
          this.elementotemp = elementos["elementos"];
        this.elementotempdos=this.elementotemp["elemento"];
            this.elementotempdos.forEach(elemento => {
              this.elemento = new Elemento();
              this.elemento.Placa=elemento["placa"];
              this.elemento.Cantidad=elemento["cantidad_asignada"];
              this.elemento.Descripcion=elemento["descripcion_elemento"];
              this.elemento.Unidad=elemento["unidad"];
              this.elemento.TipoBien=elemento["tipo_bien"];
              this.elemento.FechaRegistro=elemento["fecha_registro"];
              this.elemento.Id=elemento["id"];
              this.elementos.push(this.elemento);
            });
        }
        
        this.sourceElementos.load(this.elementos);
        });
        
    } else
    {
      this.request.get(environment.ADMINISTRATIVA_JBPM_SERVICE, '/elemento_id/'+this.elemento.Id)
      .subscribe((elementos: any) => {
        if (elementos) {
          
          this.elementotemp = elementos["elementos"];
          this.elementotempdos=this.elementotemp["elemento"];
          this.elemento.Id=this.elementotempdos[0]["id"];
          this.elemento.Cantidad=this.elementotempdos[0]["cantidad_asignada"];
          this.elemento.CuentaEntrada=this.elementotempdos[0]["grupo_cuentaentrada"];
          this.elemento.CuentaSalida=this.elementotempdos[0]["grupo_cuentasalida"];
          this.elemento.Descripcion=this.elementotempdos[0]["descripcion_elemento"];
          this.elemento.FechaRegistro=this.elementotempdos[0]["fecha_registro"];
          this.elemento.Iva=this.elementotempdos[0]["iva"];
          this.elemento.TotalIva=this.elementotempdos[0]["total_iva"];
          this.elemento.VidaUtil=this.elementotempdos[0]["grupo_vidautil"];
          this.elemento.TotalConIva=this.elementotempdos[0]["total_iva_con"];
          this.elemento.Unidad=this.elementotempdos[0]["unidad"];
          this.elemento.Valor=this.elementotempdos[0]["valor"];
          this.elemento.Subtotal=this.elementotempdos[0]["subtotal_sin_iva"];
          this.elemento.TipoBien=this.elementotempdos[0]["tipo_bien"];
          this.entrada=new Entrada();
          this.entrada.Vigencia=this.elementotempdos[0]["vigencia"];
          this.entrada.Consecutivo=this.elementotempdos[0]["consecutivo_entrada"];
          this.entrada.FechaRegistro=this.elementotempdos[0]["fecha_entrada"];
          this.entrada.Proveedor=this.elementotempdos[0]["proveedor"];
          this.entrada.TipoContrato=this.elementotempdos[0]["tipo_contrato"];
          this.entrada.NumeroFactura=this.elementotempdos[0]["numero_factura"];
          this.entrada.NumeroContrato=this.elementotempdos[0]["numero_contrato"];
          this.entrada.CuentaEntrada=this.elementotempdos[0]["grupo_cuentaentrada"];
          this.salida=new Salida();
          this.salida.CuentaSalida=this.elementotempdos[0]["grupo_cuentasalida"];
          this.salida.Vigencia=this.elementotempdos[0]["vigencia"];
          this.salida.Consecutivo=this.elementotempdos[0]["consecutivo_salida"];
          this.salida.Sede=this.elementotempdos[0]["sede"];
          this.salida.Funcionario=this.elementotempdos[0]["funcionario"];
          this.salida.Ubicacion=this.elementotempdos[0]["ubicacion"];
          this.salida.Dependencia=this.elementotempdos[0]["dependencia"];
          this.salida.FechaRegistro=this.elementotempdos[0]["fecha_salida"];
         
          
          }
        
        }, (error) => {
        console.log(error);
        //Swal.close();
        })
    }
  }

  calcularDepreciacion()
  {
    

  }
  onRowSelect(event) {
    this.formularioBusqueda["tipoBusqueda"]="ID";
    this.selectedRows = event.selected;
    this.elemento=this.selectedRows[0];
    this.buscarElemento();
    console.log(this.selectedRows);
  }
  onSaveConfirm(event) {
    if (window.confirm('Desea Guardar?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;

  }
}
