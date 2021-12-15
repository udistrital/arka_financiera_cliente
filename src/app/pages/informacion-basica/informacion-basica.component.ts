import { Component, OnInit, Input } from '@angular/core';
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
  @Input('username') username: any;
  isPost: boolean = true;
  elemento: Elemento;
  formularioBusqueda: any;
  elementos: Elemento[]  = [];
  selectedRows: any;
  entrada: any;
  salida: any;
		actualizar:boolean;
  elementoArka: any;
  elementotemp:any;
  elementotempdos:any;
		elementotemptres:any;
		elementotempcuatro:any;
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
  activo=new FormControl();
  cuentaSalida=new FormControl();
  constructor(
    private request: RequestManager,
    private userService: UserService,
    private utilService: UtilService,
    private router: Router,
    private formBuilder: FormBuilder,
				
  ) {
    this.elemento={Id:null,Cantidad:null,CuentaEntrada:null,CuentaSalida:null,Depreciacion:null,DepreciacionAcumulada:null,DepreciacionMes:null,Descripcion:null,Entrada:null
      ,FechaRegistro:null,FechaSalida:null,Iva:null,NuevaFechaSalida:null,NuevaVidaUtil:null,NuevoValor:null,NuevoValorResidual:null,Salida:null,Subtotal:null,TipoBien:null
      ,TotalConIva:null,TotalIva:null,Unidad:null,Valor:null,VidaUtil:null,Placa:null, ValorCuota:null, ValorLibros:null, FDA:null, Meses:null, NuevoFDA:null, NuevoValorCuota:null
					,NuevoValorLibros:null,NuevosMeses:null};  
      this.formBuscar = new FormGroup({
        id: new FormControl(),
        tipoBusqueda: new FormControl()
     });
     this.formElemento = new FormGroup({
      nuevafechasalida:new FormControl(),
      nuevovalor:new FormControl(),
      nuevavidautil:new FormControl(),
      nuevovalorresidual:new FormControl(),
      activo:new FormControl(),
      cuentasalida:new FormControl()
   });
   this.elementoArka={ Id: null,
    FechaSalida: null,
    Valor: null,
    VidaUtil:null, 
    ValorResidual: null,
    Usuario: null,
    Activo:null};
			
 
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
    let putElemento;
				let postElemento;
    console.log(this.formElemento.controls['cuentasalida']);
				console.log(this.formElemento.controls['cuentasalida'].value);
				console.log();
				let prueba=Date.parse(this.formElemento.get('nuevafechasalida').value).toString();
				console.log(prueba);
    if(this.formElemento.get('activo').value==null)
    {
      this.elementoArka.Activo=true;

    } else if(this.formElemento.get('activo').value)
				{
					this.elementoArka.Activo=false;
				}
				else
				{ 
					 this.elementoArka.Activo=true;
				}
				if(!this.actualizar)
				{
					  let fecha=new Date(this.formElemento.get('nuevafechasalida').value).toISOString();
							fecha=fecha.substring(0,10);
							postElemento='{"_post_elemento":{"id":'+
							this.elemento.Id+',"fecha_salida":"'+fecha
							+'","valor":'+
							this.formElemento.get('nuevovalor').value+',"vida_util":'+
							this.formElemento.get('nuevavidautil').value+',"valor_residual":'+ 
							this.formElemento.get('nuevovalorresidual').value+', "usuario":"'+
							this.username+'", "activo":'+this.elementoArka.Activo+
							', "cuenta_salida":"'+ 
							this.formElemento.get('cuentasalida').value+'"}}';
							console.log(this.formElemento.get('nuevafechasalida').value);
							console.log(fecha);
							console.log(new Date(this.formElemento.get('nuevafechasalida').value).toISOString());
							console.log(postElemento);
		 }
			else
			{
				let fecha=new Date(this.formElemento.get('nuevafechasalida').value).toISOString();
							fecha=fecha.substring(0,10);		
				 putElemento='{"_put_elemento_id":{"id":'+
							this.elemento.Id+',"fecha_salida":"'+
							fecha+'","valor":'+
							this.formElemento.get('nuevovalor').value+',"vida_util":'+
							this.formElemento.get('nuevavidautil').value+',"valor_residual":'+ 
							this.formElemento.get('nuevovalorresidual').value+', "usuario":"'+
							this.username+'", "activo":'+this.elementoArka.Activo+
							', "cuenta_salida":"'+ 
							this.formElemento.get('cuentasalida').value	+'"}}';
							console.log(putElemento);
							
			}

    const isValidTerm = await this.utilService.termsAndConditional();

    if (isValidTerm) {
      Swal.fire({
        title: 'Información del elemento',
        text: `Se ${!this.actualizar ? 'almacenará' : 'actualizará'} la información del elemento`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: !this.actualizar ? 'Guardar' : 'Actualizar',
      }).then(result => {

        if (!this.actualizar) {
									    this.request
            .post(environment.ELEMENTO_ARKA_JBPM_SERVICE, '/elemento', JSON.parse(postElemento))
            .subscribe((data: any) => {
              console.log(data);

              
              if (data) {
                Swal.close();
                Swal.fire({
                  title: `Registro correcto`,
                  text: `Se ingresaron correctamente los registros`,
                  icon: 'success',
                }).then((result) => {
                  if (result.value) {
                    this.isPost = false;
                    window.location.reload();
                  }
                })
                this.isPost = false;
              }

            }),
            error => {
              Swal.fire({
                title: 'error',
                text: `${JSON.stringify(error)}`,
                icon: 'error',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: `Aceptar`,
              });
            };
        
        }  else
								{
									
									this.request
									.put(environment.ELEMENTO_ARKA_JBPM_SERVICE,'/elemento/', JSON.parse(putElemento),this.elemento.Id)
            .subscribe((data: any) => {
              console.log(data);

              
              if (data) {
                Swal.close();
                Swal.fire({
                  title: `Registro correcto`,
                  text: `Se ingresaron correctamente los registros`,
                  icon: 'success',
                }).then((result) => {
                  if (result.value) {
                    this.isPost = false;
                    window.location.reload();
                  }
                })
                this.isPost = false;
              }

            }),
            error => {
              Swal.fire({
                title: 'error',
                text: `${JSON.stringify(error)}`,
                icon: 'error',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: `Aceptar`,
              });
            };

								} 

            
        
      });
    }
  }

  ngOnInit(): void {
    this.formBuscar = this.formBuilder.group({id: ['', Validators.required], tipoBusqueda:this.tipoBusqueda});
    this.cargarElementos();
    this.onChanges();
       
    



  }
  public buscarElemento() {
    this.formularioBusqueda = this.formBuscar.value;
    this.elemento=new Elemento();
				this.elementos=[];
				this.salida=new Salida();
				this.entrada=new Entrada();
    if( this.formularioBusqueda["tipoBusqueda"]==='PLACA')
    {
      this.request.get(environment.ADMINISTRATIVA_JBPM_SERVICE, '/elemento_placa/'+this.formularioBusqueda["id"])
    .subscribe((elementos: any) => {
      if (elementos) {
        
        this.elementotemp = elementos["elementos"];
        this.elementotempdos=this.elementotemp["elemento"];
        this.elemento.Id=this.elementotempdos[0]["id"];
        this.elemento.Placa=this.elementotempdos[0]["placa"];
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
        this.elemento.NuevaFechaSalida=this.elementotempdos[0]["fecha_salida"];
        this.elemento.NuevaVidaUtil=this.elementotempdos[0]["grupo_vidautil"];
        this.elemento.NuevoValorResidual=0;
								this.salida.FechaRegistro=this.salida.FechaRegistro.substring(0, 10);
							 console.log( new Date());
								this.request.get(environment.ELEMENTO_ARKA_JBPM_SERVICE, '/elemento/'+this.elementotempdos[0]["id"])
								.subscribe((elementosarka: any) => {
									if (elementosarka) {
										this.elementotemptres = elementosarka["elemento_arkaCollection"];
										this.elementotempcuatro=this.elementotemptres["elemento_arka"];
									if(this.elementotempcuatro)
										{
											this.formElemento.controls['nuevovalor'].setValue(this.elementotempcuatro[0]["valor"]);
											this.formElemento.controls['nuevavidautil'].setValue(this.elementotempcuatro[0]["vida_util"]);
											this.formElemento.controls['nuevovalorresidual'].setValue(this.elementotempcuatro[0]["valor_residual"]);
											this.formElemento.controls['cuentasalida'].setValue(this.elementotempcuatro[0]["cuenta_salida"]);
											this.elemento.NuevaFechaSalida=this.elementotempcuatro[0]["fecha_salida"]
											this.elemento.NuevaFechaSalida=this.elemento.NuevaFechaSalida.substring(0, 10);
											this.formElemento.controls['nuevafechasalida'].setValue(this.elemento.NuevaFechaSalida);
											this.actualizar=true;
										} else {
											this.actualizar=false;
											this.formElemento.controls['nuevovalor'].setValue(this.elementotempdos[0]["valor"]);
									this.formElemento.controls['nuevavidautil'].setValue(this.elementotempdos[0]["grupo_vidautil"]);
									this.formElemento.controls['nuevovalorresidual'].setValue(0);
									this.formElemento.controls['cuentasalida'].setValue(this.elementotempdos[0]["grupo_cuentasalida"]);
									this.formElemento.controls['nuevafechasalida'].setValue(this.salida.FechaRegistro);
	
										}
       
									}
									else {
										this.actualizar=false;
										this.formElemento.controls['nuevovalor'].setValue(this.elementotempdos[0]["valor"]);
								this.formElemento.controls['nuevavidautil'].setValue(this.elementotempdos[0]["grupo_vidautil"]);
								this.formElemento.controls['nuevovalorresidual'].setValue(0);
								this.formElemento.controls['cuentasalida'].setValue(this.elementotempdos[0]["grupo_cuentasalida"]);
								this.formElemento.controls['nuevafechasalida'].setValue(this.salida.FechaRegistro);
								

									}
								});
        this.calcularDepreciacion();
        
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
          this.elemento.NuevaFechaSalida=this.elementotempdos[0]["fecha_salida"];
        this.elemento.NuevoValor=this.elementotempdos[0]["valor"];
        this.elemento.NuevaVidaUtil=this.elementotempdos[0]["grupo_vidautil"];
        this.elemento.NuevoValorResidual=0;
        this.calcularDepreciacion();
          }
        
        }, (error) => {
        console.log(error);
        //Swal.close();
        })
    }
    
       
  }

  calcularDepreciacion()
  {
    let currentDate = new Date();
   
    let fsalida=new Date(this.salida.FechaRegistro);
    let meses= this.monthDiff(fsalida,currentDate );
				let nuevosmeses= this.monthDiff(new Date(this.elementoArka.FechaSalida),currentDate );
    console.log(meses);
    this.elemento.ValorCuota=this.elemento.Valor/this.elemento.VidaUtil;
    this.elemento.FDA=this.elemento.ValorCuota*meses;
    this.elemento.ValorLibros=this.elemento.Valor-this.elemento.FDA;
				this.elemento.Meses=meses;
				this.elemento.NuevosMeses=nuevosmeses;
				this.elemento.NuevoValorCuota=(this.elemento.NuevoValor-this.elemento.NuevoValorResidual)/this.elemento.NuevaVidaUtil;
				this.elemento.NuevoFDA=	this.elemento.NuevoValorCuota*nuevosmeses;
				this.elemento.NuevoValorLibros=this.elemento.NuevoValor-this.elemento.NuevoFDA;


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
  monthDiff(d1:Date, d2:Date) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    console.log(months);
    months -= d1.getMonth();
    console.log(months);
    months += d2.getMonth();
    return months <= 0 ? 0 : months;

  }
		onChanges(): void {
			this.formElemento.valueChanges.subscribe(val => {
				  
					 this.elementoArka.FechaSalida=val.nuevafechasalida;
						console.log(val.nuevafechasalida);
						console.log( this.elementoArka.FechaSalida);
						this.elemento.NuevoValor=val.nuevovalor;
						this.elemento.NuevoValorResidual=val.nuevovalorresidual;
						this.elemento.NuevaVidaUtil=val.nuevavidautil;
						this.calcularDepreciacion();
			});
	}
}
