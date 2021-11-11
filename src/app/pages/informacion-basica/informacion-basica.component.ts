import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators, AbstractControl } from '@angular/forms';
import { RequestManager } from '../services/requestManager';
import Swal from 'sweetalert2';
import { UserService } from '../services/userService';
import { UtilService } from '../services/utilService';
import { DatosIdentificacion } from '../../@core/models/datos_identificacion';
import { environment } from './../../../environments/environment'
import { InfoComplementariaTercero } from '../../@core/models/info_complementaria_tercero';
import { Tercero } from '../../@core/models/tercero';
import { Vinculacion } from '../../@core/models/vinculacion';
import { CargaAcademica } from '../../@core/models/carga_academica';
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
  tercero: Tercero;
  datosIdentificacion: DatosIdentificacion;
  datosGenero: InfoComplementariaTercero;
  datosLocalidad: InfoComplementariaTercero;
  isVacunacion: number;
  vinculacionesDocente: Vinculacion[];
  vinculacionesEstudiante: Vinculacion[];
  cargaAcademica: CargaAcademica[];
  vinculacionesOtros: Vinculacion[];
  datosEstadoCivil: InfoComplementariaTercero;
  vinculaciones: Vinculacion[];
  edad: number;
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
    this.cargarEps()
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

  public cargarEps(){
    this.request.get(environment.PARAMETROS_SERVICE,"parametro/?limit=-1&query=TipoParametroId.Id:34&order=asc&sortby=Nombre")
    .subscribe((res:any)=>{
      var lista=res.Data
      lista.forEach(reg=>{
        this.epsLista.push(reg.Nombre)
      })
    })
  }

  public calcularEdad(fechaNacimientoStr: string): number {
    if (fechaNacimientoStr) {
      const actual = new Date();
      const fechaNacimiento = new Date(fechaNacimientoStr);
      let edad = actual.getFullYear() - fechaNacimiento.getFullYear();
      const mes = actual.getMonth() - fechaNacimiento.getMonth();

      if (mes < 0 || (mes === 0 && actual.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
      return edad;
    } else {
      return null
    }
  }

  public asignarVinculacion(vinculacion: Vinculacion) {
    let idRol: number = vinculacion.TipoVinculacion.Id;


    if (idRol != 293 && idRol != 294 && vinculacion.TipoVinculacion.ParametroPadreId != null) {
      vinculacion.TipoVinculacion.Nombre = vinculacion.TipoVinculacion.ParametroPadreId.Nombre;
    }

    if (idRol == 293 || idRol == 294 || (idRol >= 296 && idRol <= 299)) {
      let dateObj = new Date();
      let weekdayNumber = dateObj.getDay();
      this.vinculacionesDocente.push(vinculacion);
      this.request.get(environment.ACADEMICA_JBPM_SERVICE, `carga_academica/${new Date().getFullYear()}/1/${this.datosIdentificacion.Numero}/${weekdayNumber}`)
        .subscribe((carga: any) => {
          if (carga) {
            this.cargaAcademica = carga['carga_academica']['docente'];
            let datosCarga = this.cargaAcademica.map((carga) =>
              new Object({
                Vinculacion: `${carga.VINCULACION}`,
                Proyecto: `${carga.FACULTAD} - ${carga.PROYECTO}`,
                Horario: `${carga.SALON} - ${carga.DIA} - ${carga.HORA}`,
                Asignatura: `${carga.CODIGO_ASIGNATURA} - ${carga.ASIGNATURA} - GR ${carga.GRUPO}`,
              }))
            this.source.load(datosCarga)

          }
        }, (error) => {
          console.log(error);
          Swal.close();
        })

    } else if (vinculacion.TipoVinculacion.ParametroPadreId) {
      if (vinculacion.TipoVinculacion.ParametroPadreId.Id == 346) {
        this.vinculacionesEstudiante.push(vinculacion);
      } else {
        this.vinculacionesOtros.push(vinculacion);
      }
    } else if (vinculacion.TipoVinculacion.Id == 346) {
      this.vinculacionesEstudiante.push(vinculacion);
    } else {
      this.vinculacionesOtros.push(vinculacion);
    }
  }

  consultarInfoVacunacion() {
    combineLatest(
      this.request.get(environment.TERCEROS_SERVICE, `/info_complementaria?query=GrupoInfoComplementariaId.Id:50&limit=0&order=asc&sortby=Id&fields=Id,Nombre`),
      //------------------------------------------------------- formData -----------------------------------------------
      this.request.get(environment.TERCEROS_SERVICE,
        '/info_complementaria_tercero?limit=0&order=asc&sortby=Id&query=InfoComplementariaId.GrupoInfoComplementariaId.Id:50,TerceroId.Id:'
        + this.tercero.Id)
    )
      .subscribe(
        ([consultaInfoVacunacion, datosInfoVacunacion, datosOtros]: any) => {
          if (consultaInfoVacunacion) {
            if (datosInfoVacunacion && JSON.stringify(datosInfoVacunacion) !== '[{}]') {
              datosInfoVacunacion.sort((a, b) => (a.InfoComplementariaId.Id < b.InfoComplementariaId.Id ? -1 : 1));
              this.isPost = false;
              this.infoVacunacion = consultaInfoVacunacion.map((itemVacunacion, index) => ({
                ...itemVacunacion,
                ...{ form: datosInfoVacunacion[index] },
                label: itemVacunacion['Nombre'],
                dato: index == 1 ? this.corregirFecha((JSON.parse(datosInfoVacunacion[index].Dato)).dato) : JSON.parse(datosInfoVacunacion[index].Dato).dato,
                name: itemVacunacion['Nombre']
              }))
              this.formVacunacion.get('radioVacunacion').setValue(this.infoVacunacion[0].dato);
              this.formVacunacion.get('fechaVacunacion').setValue(this.infoVacunacion[1].dato);
              this.formVacunacion.get('empresaVacunacion').setValue(this.infoVacunacion[2].dato);
              this.formVacunacion.get('eps').setValue(this.infoVacunacion[3].dato);
            } else {
              this.isPost = true;
              this.infoVacunacion = consultaInfoVacunacion.map((itemVacunacion, index) => ({
                ...itemVacunacion,
                label: itemVacunacion['Nombre'],
                dato: "",
                name: itemVacunacion['Nombre']
              }))
              Swal.close();
            }
          }
        });
  }

  radioVacunacionActualizado() {
    this.formVacunacion.get('fechaVacunacion').setValue("");
    this.formVacunacion.get('empresaVacunacion').setValue("");
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

        if (this.tercero && result.value) {
          Swal.fire({
            title: this.isPost ? 'Guardando' : 'Actualizando' + ' caracterización',
            html: `<b></b> de ${this.infoVacunacion.length} registros ${this.isPost ? 'almacenados' : 'actualizados'}`,
            timerProgressBar: true,
            willOpen: () => {
              Swal.showLoading();
            },
          });

          let updated = 0;

          from(this.infoVacunacion)
            .subscribe((itemVacunacion: any) => {

              let itemVacunacionTercero = {
                TerceroId: { Id: this.tercero.Id },
                InfoComplementariaId: {
                  Id: itemVacunacion.Id,
                },
                Dato: JSON.stringify({ dato: itemVacunacion.dato }),
                Activo: true,
              };

              if (this.isPost) {
                this.request
                  .post(environment.TERCEROS_SERVICE, 'info_complementaria_tercero/', itemVacunacionTercero)
                  .subscribe((data: any) => {
                    updated += 1;
                    const content = Swal.getContent();
                    if (content) {
                      const b = content.querySelector('b');
                      if (b) {
                        b.textContent = `${updated}`;
                      }
                    }

                    if (updated === (this.infoVacunacion.length)) {
                      Swal.close();
                      Swal.fire({
                        title: `Registro correcto`,
                        text: `Se ingresaron correctamente ${this.infoVacunacion.length} registros`,
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
              } else {

                this.request
                  .put(environment.TERCEROS_SERVICE, 'info_complementaria_tercero', itemVacunacionTercero, itemVacunacion.form.Id)
                  .subscribe((data: any) => {
                    updated += 1;
                    const content = Swal.getContent();
                    if (content) {
                      const b = content.querySelector('b');
                      if (b) {
                        b.textContent = `${updated}`;
                      }
                    }

                    if (updated === (this.infoVacunacion.length)) {
                      Swal.close();
                      Swal.fire({
                        title: `Actualización correcta`,
                        text: `Se actualizaron correctamente ${this.infoVacunacion.length} registros`,
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
    this.formVacunacion.get('radioVacunacion').valueChanges
        .subscribe(value => {
            this.formVacunacion.get('fechaVacunacion').setValue("");
            this.formVacunacion.get('fechaVacunacion').updateValueAndValidity();
            this.formVacunacion.get('empresaVacunacion').setValue("");
            this.formVacunacion.get('empresaVacunacion').updateValueAndValidity();
    });
    
    this.cargarCampos();
    this.source.load(this.elementosEntrada);
    this.cargarCamposSalida();
    this.sourceSalida.load(this.elementosSalida);
    this.cargarElementos();
    this.sourceElementos.load(this.elementos);
    this.userService.user$.subscribe((data) => {
      this.request.get(environment.TERCEROS_SERVICE, `datos_identificacion/?query=Numero:` + data['userService']['documento'])
        .subscribe((datosInfoTercero: any) => {
          this.datosIdentificacion = {
            ...datosInfoTercero[0],
            ...{ FechaExpedicion: datosInfoTercero[0].FechaExpedicion ? this.corregirFecha(datosInfoTercero[0].FechaExpedicion) : '' }
          }
          this.tercero = this.datosIdentificacion.TerceroId;

          if (this.tercero) {
            this.tercero.FechaNacimiento = this.corregirFecha(this.tercero.FechaNacimiento);

            this.edad = this.calcularEdad(this.tercero ? this.tercero.FechaNacimiento ? this.tercero.FechaNacimiento : null : null);
            this.request.get(environment.TERCEROS_SERVICE, `info_complementaria_tercero/?query=TerceroId.Id:${!!this.tercero ? this.tercero.Id ? this.tercero.Id : '' : ''}`
              + `,InfoComplementariaId.GrupoInfoComplementariaId.Id:6`)
              .subscribe((datosInfoGenero: any) => {
                this.datosGenero = datosInfoGenero[0];
              }, (error) => {
                console.log(error);
              })

            this.request.get(environment.TERCEROS_SERVICE, `info_complementaria_tercero/?query=TerceroId.Id:${!!this.tercero ? this.tercero.Id ? this.tercero.Id : '' : ''}`
              + `,InfoComplementariaId.GrupoInfoComplementariaId.Id:2`)
              .subscribe((datosInfoEstadoCivil: any) => {
                this.datosEstadoCivil = datosInfoEstadoCivil[0];
              }, (error) => {
                console.log(error);
              })

            this.request.get(environment.TERCEROS_SERVICE, `info_complementaria_tercero/?query=TerceroId.Id:${!!this.tercero ? this.tercero.Id ? this.tercero.Id : '' : ''}`
              + `,InfoComplementariaId.GrupoInfoComplementariaId.CodigoAbreviacion:LOCBOG`)
              .subscribe((datosInfoLocalidad: any) => {
                this.datosLocalidad = datosInfoLocalidad[0];
              }, (error) => {
                console.log(error);
              })

            this.consultarInfoVacunacion();

            this.request.get(environment.TERCEROS_SERVICE, `vinculacion/?query=Activo:true,TerceroPrincipalId.Id:${!!this.tercero ? this.tercero.Id ? this.tercero.Id : '' : ''}`)
              .subscribe((datosInfoVinculaciones: any) => {
                this.vinculaciones = datosInfoVinculaciones;
                this.vinculacionesDocente = [];
                this.vinculacionesEstudiante = [];
                this.vinculacionesOtros = [];
                for (let i = 0; i < this.vinculaciones.length; i++) {
                  this.vinculaciones[i] = {
                    ...datosInfoVinculaciones[i],
                    ...{ FechaInicioVinculacion: this.vinculaciones[i].FechaInicioVinculacion ? this.corregirFecha(this.vinculaciones[i].FechaInicioVinculacion) : '' },
                    ...{ FechaFinVinculacion: this.vinculaciones[i].FechaFinVinculacion ? this.corregirFecha(this.vinculaciones[i].FechaFinVinculacion) : '' }
                  }
                  if (JSON.stringify(this.vinculaciones[i]) !== '{}') {
                    this.request.get(environment.PARAMETROS_SERVICE, `parametro/?query=Id:` + this.vinculaciones[i].TipoVinculacionId)
                      .subscribe((vinculacion: any) => {
                        this.vinculaciones[i].TipoVinculacion = vinculacion['Data'][0];
                        if (this.vinculaciones[i].DependenciaId) {
                          this.request.get(environment.OIKOS_SERVICE, `dependencia/` + this.vinculaciones[i].DependenciaId)
                            .subscribe((dependencia: any) => {
                              this.vinculaciones[i].Dependencia = dependencia;
                            }, (error) => {
                              console.log(error);
                            })
                        }
                        this.asignarVinculacion(this.vinculaciones[i]);
                      })
                  }
                }

              })
          }
        }, (error) => {
          console.log(error);
          Swal.close();
        })
    })



  }
  public buscarEntrada() {
    this.request.get(environment.ACADEMICA_JBPM_SERVICE, 'cargarEntrada/'+this.vigencia+'/'+this.entrada_id)
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
