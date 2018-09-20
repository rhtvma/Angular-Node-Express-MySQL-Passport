import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';

@Injectable()
export class ToastrMessageService {

    constructor(private _toastrService: ToastrService) {
    }

    // Success Type
    typeSuccess(message) {
        this._toastrService.success(message, 'Success!');
    }

    // Error Type
    typeError(message) {
        this._toastrService.error(message, 'Error!');
    }

    //Dismiss toastr on Click
    dismissToastOnClick(val1, val2) {
        this._toastrService.info(val1, val2);
    }

    // Remove current toasts using animation
    clearToast() {
        this._toastrService.clear();
    }


}
