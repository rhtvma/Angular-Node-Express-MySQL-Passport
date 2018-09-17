import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Injectable} from '@angular/core';

@Injectable()
export class ToastrService {

    constructor(public toastr: ToastsManager) {
    }

    // Success Type
    typeSuccess(message) {
        this.toastr.success(message, 'Success!');
    }

    // Error Type
    typeError(message) {
        this.toastr.error(message, 'Error!');
    }
}
