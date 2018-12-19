import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {DataTableDirective} from "angular-datatables";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../../shared/services/data.service";
import {HTTPService} from "../../../shared/services/http.service";
import {saveAs} from 'file-saver';
import {NgbdModalBasic} from "../../component/modal/modal.component";
import {DropzoneComquestionsArrayponent, DropzoneConfigInterface} from "ngx-dropzone-wrapper";
import {environment} from "../../../../environments/environment";
import {Form, NgForm, NgModel} from "@angular/forms";
import {HttpHeaders} from "@angular/common/http";
import {ToastrService} from "../../../shared/toastr/toastr.service";
import * as _ from 'lodash';

@Component({
    selector: 'app-security-questions',
    templateUrl: './security-questions.component.html',
    styleUrls: ['./security-questions.component.css'],
    providers: [ToastrService]
})
export class SecurityQuestionsComponent extends NgbdModalBasic implements OnInit {
    gridConfig: DataTables.Settings;
    gridTrigger: Subject<any> = new Subject();
    securityQuestionsList: Array<any> = [];
    tcmID: string;
    eQuestion: string;
    eAnswer: string;
    record: any;
    questionsArray: Array<any>;

    folderLevelsValid: boolean;
    modalCreateQuestionsRef: NgbModalRef;
    modalEditQuestionsRef: NgbModalRef;
    @ViewChild(DataTableDirective) grid: DataTableDirective;
    titleMetadata: string;

    constructor(private http: HTTPService,
                private modalServiceInstance: NgbModal,
                private route: ActivatedRoute,
                private ds: DataService,
                public _toastrService: ToastrService) {
        super(modalServiceInstance);
    }

    ngOnInit() {
        this.folderLevelsValid = true;
        this.titleMetadata = '';
        this.gridConfig = {
            initComplete: (settings, json) => console.log('Table initialized'),
            pagingType: 'full_numbers',
            searching: true,
            ordering: true,
            stateSave: true,
            order: [0, 'desc']
        };

        this.tcmID = this.route.snapshot.params.id;
        this.questionsArray = [{question: 'Hello', answer: ''}]
        this.getProductSecurityQuestions(true);
    }

    spinnerOff() {
        $(() => {
            $("#innerLoader").fadeOut();
        });
    }

    reRender(): void {
        this.grid.dtInstance.then((gridInstance: DataTables.Api) => {
            gridInstance.destroy();
            setTimeout(() => {
                this.gridTrigger.next();
            }, 0);
        });
    }

    getProductSecurityQuestions = (isInit: boolean) => {
        this.questionsArray = [{question: '', answer: ''}];
        const selQuery = "SELECT * FROM security_questions WHERE tcm_id = ?";
        this.http.postSecureAdminGenricApi(environment.endpoints.generic, selQuery, [this.tcmID], 'Getting All License Keys', 'FETCH')
            .subscribe(
                (data: { data: any, response: string, response_message: Array<any> }) => {
                    if (data.response === 'success') {
                        if (data.data) {// instanceof Array
                            this.securityQuestionsList = data.data;
                            if (isInit)
                                this.gridTrigger.next();
                            else if (!isInit)
                                this.reRender();
                        }
                        $(() => {
                            $(".preloader").fadeOut();
                        });
                    } else {
                        $(() => {
                            $("#innerLoader").fadeOut();
                        });
                        this._toastrService.typeError(data.response_message);
                    }
                },
                (error) => {
                    $(() => {
                        $("#innerLoader").fadeOut();
                    });
                    this._toastrService.typeError(error.error.response_message || error.status_text);
                });
    }

    addQuestion = () => {
        console.log(this.questionsArray);
        this.questionsArray.push({question: '', answer: ''});
    }

    indexTracker(index: number, value: any) {
        console.log(index, value);
        return index;
    }

    removeQuestion = (qustion) => {
        if (this.questionsArray.length === 1) {
            this._toastrService.typeError('Product saving failed');
            return;
        }
        const index = _.findIndex(this.questionsArray, (ques) => {
            return qustion.question === ques.question;
        })
        this.questionsArray.splice(index, 1);
    }

    deleteQuestion = (i: number, modalTemplate: ElementRef): void => {
        this.open(modalTemplate);
        this.record = JSON.parse(JSON.stringify(this.securityQuestionsList[i]));

    }

    okayCB = (reason: boolean) => {
        const sqID = this.record.id;
        const delQuery = "DELETE FROM security_questions WHERE tcm_id = ? AND id = ?";
        this.http.postSecureAdminGenricApi(environment.endpoints.generic, delQuery, [this.tcmID, sqID], 'Deleting security_questions ', 'DELETE')
            .subscribe((data: { response: string, response_message: Array<any> }) => {
                if (data.response === 'success') {
                    $(() => {
                        $("#innerLoader").fadeOut();
                    });
                    this._toastrService.typeSuccess(data.response_message);
                    this.getProductSecurityQuestions(false);
                } else {
                    this._toastrService.typeError(data.response_message);
                    this.getProductSecurityQuestions(false);
                }
                $(() => {
                    $(".preloader").fadeOut();
                });
            }, err => {
                console.log(err);
                this._toastrService.typeError('Question deletion failed');
                $(() => {
                    $(".preloader").fadeOut();
                });
            });
    }

    cancelCB = (reason: boolean) => {
        reason;
    }

    createQuestionModal = (modalCreateQuestions: ElementRef): void => {
        this.modalCreateQuestionsRef = this.modalServiceInstance.open(modalCreateQuestions, {
            size: 'lg'
        });
    }

    editQuestionModal = (i: number, modalEditQuestions: ElementRef): void => {
        this.modalEditQuestionsRef = this.modalServiceInstance.open(modalEditQuestions, {
            size: 'lg'
        });
        this.record = JSON.parse(JSON.stringify(this.securityQuestionsList[i]));
        this.eQuestion = this.record.question;
        this.eAnswer = this.record.answer;
    }

    editQuestion = () => {
        const body = {
            questionID: this.record.id,
            tcmID: this.tcmID,
            eQuestion: this.eQuestion,
            eAnswer: this.eAnswer
        };
        this.http.postNonAdminSecure('/updateQuestions', body, 'Creating product questions ', 'Insert')
            .subscribe((data: { response: string, response_message: Array<any> }) => {
                if (data.response === 'success') {
                    $(() => {
                        $("#innerLoader").fadeOut();
                    });
                    this._toastrService.typeSuccess(data.response_message);
                    this.getProductSecurityQuestions(false);
                } else {
                    this._toastrService.typeError(data.response_message);
                    this.getProductSecurityQuestions(false);
                }
                this.modalEditQuestionsRef.close();
            });
    }

    createSecurityQuestions = () => {
        const body = {
            questionsArray: this.questionsArray,
            tcmID: this.tcmID
        };
        this.http.postNonAdminSecure('/createQuestions', body, 'Creating product questions ', 'Insert')
            .subscribe((data: { response: string, response_message: Array<any> }) => {
                if (data.response === 'success') {
                    $(() => {
                        $("#innerLoader").fadeOut();
                    });
                    this._toastrService.typeSuccess(data.response_message);
                    this.getProductSecurityQuestions(false);
                } else {
                    this._toastrService.typeError(data.response_message);
                    this.getProductSecurityQuestions(false);
                }
                this.modalCreateQuestionsRef.close();
            });
    }

    resetEditForm = (form: NgForm): void => {
        if (!!form)
            form.reset();

        this.titleMetadata = '';
    }
}
