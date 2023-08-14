//import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Injectable } from '@angular/core';
@Injectable()

export class AppService  {
 // Only Number Allowed
 numberOnly(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // Only Character Allowed
  charOnly(event: any) {
    const pattern = /[A-Z a-z\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // Only Number and Decimal Allowed
  allowOnlyNumberAndDecimals(event: any) {
    let str = event.target.value;
    //const pattern = /\d+\.?\d+/g;
    //const pattern = /^0$|^[1-9]\d*$|^\.\d+$|^0\.\d*$|^[1-9]\d*\.\d*$/;
    //const pattern = /^\d+(\.\d)?\d*$/;
    const pattern = /[0-9\./0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    let status = pattern.test(str) ? 'valid' : 'invalid';
    console.log("allowOnlyNumberAndDecimals -> status ->   " + status);
  }


}