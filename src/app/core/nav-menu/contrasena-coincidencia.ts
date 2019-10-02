import { AbstractControl } from '@angular/forms';

export function validarContrasena(control: AbstractControl) {
    const parent = control["_parent"];
    if (parent != undefined && control.value) {
        var contrasena = parent.value.contrasena;
        if (control.value.length >= 8 && contrasena === control.value) {
            return true;
        }
        if (control.value.length >= 8 && contrasena != control.value)
            return { validarContrasena: true };
    }
    return true;
}