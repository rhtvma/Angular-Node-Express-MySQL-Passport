// import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Injectable} from '@angular/core';

@Injectable()
export class ToastrService {

    constructor() {
        // public toastr: ToastsManager
    }

    // Success Type
    typeSuccess(message) {
        // this.toastr.success(message, 'Success!');
    }

    // Error Type
    typeError(message) {
        // this.toastr.error(message, 'Error!');
    }

    //Dismiss toastr on Click
    dismissToastOnClick(val1, val2) {
        // this.toastr.info(val1, val2, {dismiss: 'click', enableHTML: true});
    }

    // Custom Type
    typeCustom() {
        // this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
    }

    // Remove current toasts using animation
    clearToast() {
        // this.toastr.clearAllToasts();
    }


}
