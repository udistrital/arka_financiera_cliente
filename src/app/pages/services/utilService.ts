import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class UtilService {

    constructor() { }

    submitAlert({ option, type, fn, data, info, fnReturn }) {
        Swal.fire({
            title: `Se ${option === 'update' ? 'actualizará' : 'creará'} ${type}`,
            text: info,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: `${option === 'update' ? 'Actualizar' : 'Crear'} ${type}`
        })
            .then((result) => {
                if (result.value) {
                    Swal.fire({
                        title: 'Por favor espere!',
                        html: `${option === 'update' ? 'Actualizando' : 'Creando'} ${type}`,
                        allowOutsideClick: false,
                        willOpen: () => {
                            Swal.showLoading()
                        },
                    });
                    fn(data)
                        .then((response) => {
                            Swal.close();
                            Swal.fire(
                                `${option === 'update' ? 'Actualizado' : 'Creado'}`,
                                `Se ha ${option === 'update' ? 'actualizado' : 'Creado'}  ${type} ${response} de forma exitosa`,
                                'success'
                            ).then((data2) => {
                                fnReturn();
                            })
                        })
                        .catch(err => {
                            Swal.close();
                            Swal.fire(
                                `No se ha podido ${option === 'update' ? 'Actualizar' : 'Crear'}  ${type}`,
                                `error: ${err}`,
                                'error'
                            )
                        })
                }
            })
    }
    async termsAndConditional() {
        const { value: accept } = await Swal.fire({
            input: 'checkbox',
            inputValue: 1,
            html:`
            <h3 class="title-term-conditional">Terminos y condiciones</h3>
            <p class="text-term-condional">La información registrada no modifica los datos registrados en el sistema arka, la información es almacenada de forma paralela a dicho sistema.</p>`,
            inputPlaceholder: "Acepto términos y condiciones",
            confirmButtonText:
                'Continue&nbsp;<i class="fa fa-arrow-right"></i>',
            inputValidator: (result) => {
                return !result && `Necesita aceptar términos y condiciones para continuar`
            }
        })

        if (accept) {
            Swal.fire('You agreed with T&C :)')
        }
        return !!accept;
    }
}

