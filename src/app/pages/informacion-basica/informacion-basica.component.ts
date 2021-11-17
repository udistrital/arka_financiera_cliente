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


@Component({
  selector: 'app-informacion-basica',
  templateUrl: './informacion-basica.component.html',
  styleUrls: ['./informacion-basica.component.scss']
})
export class InformacionBasicaComponent implements OnInit {
  isPost: boolean = true;
  infoVacunacion: any[] = [{ dato: '' }, { dato: '' }, { dato: '' }, { dato: '' }];
  elemento: any=
  {
    Descripcion:'COMPUTADOR PORTATIL LATITUDE 100 CON:ADAPTADOR:113383,MEMORIA:113384',
    TipoBien:'Devolutivo',
    Placa: '113385',
    Cantidad:1,
    Unidad:'UND'

  };
  elementos: any[]=[{
    Descripcion:'COMPUTADOR PORTATIL LATITUDE 100 CON:ADAPTADOR:113383,MEMORIA:113384',
    TipoBien:'Devolutivo',
    Placa: '113385',
    Cantidad:1,
    Unidad:'UND'

  },
  {
    Descripcion:'COMPUTADOR PORTATIL LATITUDE 100 CON:ADAPTADOR:113383,MEMORIA:113384',
    TipoBien:'Devolutivo',
    Placa: '113385',
    Cantidad:1,
    Unidad:'UND'

  },
  {
    Descripcion:'COMPUTADOR PORTATIL LATITUDE 100 CON:ADAPTADOR:113383,MEMORIA:113384',
    TipoBien:'Devolutivo',
    Placa: '113385',
    Cantidad:1,
    Unidad:'UND'

  },
  {
    Descripcion:'COMPUTADOR PORTATIL LATITUDE 100 CON:ADAPTADOR:113383,MEMORIA:113384',
    TipoBien:'Devolutivo',
    Placa: '113385',
    Cantidad:1,
    Unidad:'UND'

  },
  {
    Descripcion:'COMPUTADOR PORTATIL LATITUDE 100 CON:ADAPTADOR:113383,MEMORIA:113384',
    TipoBien:'Devolutivo',
    Placa: '113385',
    Cantidad:1,
    Unidad:'UND'

  },
]
  entrada: any={Id: 7262,
    Vigencia: 2021,
    Consecutivo: 1,
    TipoContrato: 9,
    NumeroContrato: 1840,
    Proveedor: 800217462,
    FechaRegistro:  '2021-03-01',
    NumeroFactura: 'FE 66'};
    salida: any={Id: 7262,
      Vigencia: 2021,
      Consecutivo: 1,
      Sede: 'FICC',
      Dependencia: 'PRO700',
      Funcionario: 79853581,
      FechaRegistro:  '2021-03-01',
      Ubicacion: 'FICC010427'};

    elementosEntrada:any[]=[{
      Id: 7262,
      Grupo:19050501,
      TipoBien: 1,
      Nivel: 63,
      Cantidad: 50,
      Descripcion: 'Referencia: Arquitecto de red neuro-convolucional para aplicaciones de robotica asistencial',
      Unidad: 'Unidad',
      Valor: 93587,
      FechaRegistro:  '2021-03-01',
      Iva: '19%',
      SubTotalSinIva:4679350,
      TotalIva:889076.5,
      TotalIvaCon:5568426.5
    },
    {
      Id: 7262,
      Grupo:19050501,
      TipoBien: 1,
      Nivel: 63,
      Cantidad: 50,
      Descripcion: 'Referencia: Tiempos migratorios',
      Unidad: 'Unidad',
      Valor: 45075,
      FechaRegistro:  '2021-03-01',
      Iva: '19%',
      SubTotalSinIva:2253750,
      TotalIva:428212.5,
      TotalIvaCon:2681962.5
    },
    {
      Id: 7262,
      Grupo:19050501,
      TipoBien: 1,
      Nivel: 63,
      Cantidad: 50,
      Descripcion: 'Referencia: Los recursos distribuidos de bioenergia en colombia',
      Unidad: 'Unidad',
      Valor: 239123,
      FechaRegistro:  '2021-03-01',
      Iva: '19%',
      SubTotalSinIva:11956150,
      TotalIva:2271668.5,
      TotalIvaCon:14227818.5
    }
  ]  
    elementosSalida:any[]=[{
      Id: 7262,
      Grupo: 51112102,
      Descripcion: 'Referencia: Arquitecto de red neuro-convolucional para aplicaciones de robotica asistencial',
      TipoBien: 'Consumo',
      Unidad: 'Unidad',
      Cantidad: 50,
      Valor: '93587',
      FechaRegistro:  '2021-03-01',
      Iva: '19%',
      SubTotalSinIva:4679350,
      TotalIva:889076.5,
      TotalIvaCon:5568426.5,
      Funcionario: 79853581, 
      Ubicacion: 'FICC010427'
    },
    {
      Id: 7262,
      Grupo: 51112102,
      Descripcion: 'Referencia: Tiempos migratorios',
      TipoBien: 'Consumo',
      Cantidad: 50,
      Unidad: 'Unidad',
      Valor: 45075,
      FechaRegistro:  '2021-03-01',
      Iva: '19%',
      SubTotalSinIva:2253750,
      TotalIva:428212.5,
      TotalIvaCon:2681962.5,
      Funcionario: 79853581, 
      Ubicacion: 'FICC010427'
    },
    {
      Id: 7262,
      Grupo: 51112102,
      Descripcion: 'Referencia: Los recursos distribuidos de bioenergia en colombia',
      TipoBien: 'Consumo',
      Cantidad: 50,
      Unidad: 'Unidad',
      Valor: 239123,
      FechaRegistro:  '2021-03-01',
      Iva: '19%',
      SubTotalSinIva:11956150,
      TotalIva:2271668.5,
      TotalIvaCon:14227818.5,
      Funcionario: 79853581, 
      Ubicacion: 'FICC010427'
    }]  
  maxDate: Date = new Date();
  minDate: Date = new Date(2021, 0, 1);
 
  source: LocalDataSource = new LocalDataSource();
  sourceSalida: LocalDataSource = new LocalDataSource();
  sourceElementos: LocalDataSource = new LocalDataSource();
  settings: any;
  settingsSalida: any;
  settingsElementos: any;
  epsLista: string[] = [];
  vigencia: BigInteger;
  entrada_id:BigInteger;
  formVacunacion: FormGroup;

  constructor(
    private request: RequestManager,
    private userService: UserService,
    private utilService: UtilService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
 
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

  cargarCampos() {
    this.settings = {
      edit: {
        confirmSave: true,
      },
      
      columns: {
        Grupo: {
          title: 'GRUPO',
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
        Descripcion: {
          title: 'DESCRIPCION',
          filter: false,
          editable: false,
          valuePrepareFunction: (value) => value,
        },
        Valor: {
          title: 'VALOR UNITARIO',
          filter: false,
          editable: false,
          valuePrepareFunction: (value) => value,
        },
        SubTotalSinIva: {
          title: 'SUBTOTAL',
          filter: false,
          editable: false,
          valuePrepareFunction: (value) => value,
        }, Iva: {
          title: 'IVA',
          filter: false,
          editable: false,
          valuePrepareFunction: (value) => value,
        },
        TotalIva: {
          title: 'TOTAL IVA',
          filter: false,
          editable: false,
          valuePrepareFunction: (value) => value,
        },
        TotalIvaCon: {
          title: 'TOTAL CON IVA',
          filter: false,
          editable: false,
          valuePrepareFunction: (value) => value,
        }, FechaRegistro: {
          title: 'FECHA DE INGRESO',
          filter: false,
          editable: false,
          valuePrepareFunction: (value) => value,
        },
        fecha_salida: {
          title: 'FECHA SALIDA',
          filter: false,
          valuePrepareFunction: (value) => value,
        }, 
        nuevo_valor: {
          title: 'NUEVO VALOR',
          filter: false,
          valuePrepareFunction: (value) => value,
        },
        nueva_vida_util: {
          title: 'NUEVA VIDA UTIL',
          filter: false,
          valuePrepareFunction: (value) => value,
        },
        nuevo_residuo: {
          title: 'NUEVO RESIDUO',
          filter: false,
          valuePrepareFunction: (value) => value,
        },
        depreciacion_mes: {
          title: 'DEPRECIACION MES',
          filter: false,
          valuePrepareFunction: (value) => value,
        },
        depreciacion_acumulada: {
          title: 'DEPRECIACION ACUMULADA',
          filter: false,
          valuePrepareFunction: (value) => value,
        },
      },
    };
  }
  cargarElementos() {
    this.settingsElementos = {
      edit: {
        confirmSave: true,
      },
      
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
          title: 'Placa',
          filter: false,
          editable: false,
          valuePrepareFunction: (value) => value,
        }
      }
    };
  }
  cargarCamposSalida() {
    this.settingsSalida = {
      actions: false,
      mode: 'external',
      columns: {
        Grupo: {
          title: 'GRUPO',
          filter: false,
          valuePrepareFunction: (value) => value,
        },
        Unidad: {
          title: 'UNIDAD',
          filter: false,
          valuePrepareFunction: (value) => value,
        },
        Funcionario: {
          title: 'FUNCIONARIO',
          filter: false,
          valuePrepareFunction: (value) => value,
        },
        Ubicacion: {
          title: 'UBICACION',
          filter: false,
          valuePrepareFunction: (value) => value,
        },
        Cantidad: {
          title: 'CANTIDAD ASIGNADA',
          filter: false,
          valuePrepareFunction: (value) => value,
        },
        TipoBien: {
          title: 'TIPO DE BIEN',
          filter: false,
          valuePrepareFunction: (value) => value,
        },
        Descripcion: {
          title: 'DESCRIPCION DEL BIEN ',
          filter: false,
          valuePrepareFunction: (value) => value,
        },
        Valor: {
          title: 'VALOR VOLUNTARIO ',
          filter: false,
          valuePrepareFunction: (value) => value,
        }, SubTotalSinIva: {
          title: 'SUBTOTAL',
          filter: false,
          valuePrepareFunction: (value) => value,
        },
        Iva: {
          title: '% IVA',
          filter: false,
          valuePrepareFunction: (value) => value,
        }, TotalIva: {
          title: 'TOTAL IVA',
          filter: false,
          valuePrepareFunction: (value) => value,
        },
        TotalIvaCon: {
          title: 'TOTAL',
          filter: false,
          valuePrepareFunction: (value) => value,
        }, 
       
      },
    };
  }
  public corregirFecha(fecha: string): Date {
    let fechaHora = new Date(fecha);
    fechaHora.setHours(fechaHora.getHours() + 5);
    return fechaHora;
  }

  
  
  

 
  async save() {
    this.infoVacunacion[0].dato = this.formVacunacion.get('radioVacunacion').value;
    this.infoVacunacion[1].dato = this.infoVacunacion[0].dato=='true'?this.formVacunacion.get('fechaVacunacion').value:"";
    this.infoVacunacion[2].dato = this.infoVacunacion[0].dato=='true'?this.formVacunacion.get('empresaVacunacion').value:"";
    this.infoVacunacion[3].dato = this.formVacunacion.get('eps').value

    const isValidTerm = await this.utilService.termsAndConditional();

    if (isValidTerm) {
      Swal.fire({
        title: 'Información de vacunación',
        text: `Se ${this.isPost ? 'almacenará' : 'actualizará'} la información correspondiente al esquema de vacunación`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: this.isPost ? 'Guardar' : 'Actualizar',
      }).then(result => {


        
              

            
        
      });
    }
  }

  ngOnInit(): void {
    this.formVacunacion = this.formBuilder.group({
      radioVacunacion: ['', Validators.required],
      eps: ['', Validators.required],
      fechaVacunacion: ['', this.conditionallyRequiredValidator],
      empresaVacunacion: ['', this.conditionallyRequiredValidator]
    });
    this.cargarCampos();
    this.source.load(this.elementosEntrada);
    this.cargarCamposSalida();
    this.sourceSalida.load(this.elementosSalida);
    this.cargarElementos();
    this.sourceElementos.load(this.elementos);
      
    



  }
  public buscarEntrada() {
    this.request.get(environment.ADMINISTRATIVA_JBPM_SERVICE, 'cargarEntrada/'+this.vigencia+'/'+this.entrada_id)
    .subscribe((documentos: any) => {
      if (documentos) {
        //this.documento = documentos['documentos'];
        //var info_documentos=[];
        //info_documentos.push(this.documento);
        //let datosDocumentos = info_documentos.map((doc) =>
          /*new Object({
            Codigo: `${doc.codigo}`,
            Nombre: `${doc.nombre}`,
            Identificacion: `${doc.identificacion}`,
            Nota: `${doc.nota}`,
            FechaGrado: `${doc.fechaGrado}`,
            Fecha: `${doc.fecha}`,
            TipoDocumento:`${doc.tipoDocumento}`,
            NumeroActa: `${doc.numeroActa}`,
            Proyecto: `${doc.proyecto}`,
          
          }))
        this.source.load(datosDocumentos);
          console.log(this.source);*/
      }
    }, (error) => {
      console.log(error);
      //Swal.close();
    })
  }
  onSaveConfirm(event) {
    if (window.confirm('Desea Guardar?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
}
