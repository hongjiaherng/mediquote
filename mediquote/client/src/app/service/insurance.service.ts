import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InsuranceRequestModel } from "../model/insurance-request-model";
import { Observable } from "rxjs";
import { ResponseModel } from "../model/response.model";

@Injectable({
    providedIn: 'root'
})
export class InsuranceService {
    constructor(private http: HttpClient){}

    decisionTree(model: InsuranceRequestModel): Observable<ResponseModel<InsuranceRequestModel>> {
        return this.http.post<ResponseModel<InsuranceRequestModel>>('http://127.0.0.1:5000/predict/decision-tree', model, {});
    }

    randomForest(model: InsuranceRequestModel): Observable<ResponseModel<InsuranceRequestModel>> {
        return this.http.post<ResponseModel<InsuranceRequestModel>>('http://127.0.0.1:5000/predict/random-forest', model, {});
    }

    mlp(model: InsuranceRequestModel): Observable<ResponseModel<InsuranceRequestModel>> {
        return this.http.post<ResponseModel<InsuranceRequestModel>>('http://127.0.0.1:5000/predict/mlp', model, {});
    }

    xgboost(model: InsuranceRequestModel): Observable<ResponseModel<InsuranceRequestModel>> {
        return this.http.post<ResponseModel<InsuranceRequestModel>>('http://127.0.0.1:5000/predict/xgboost', model, {});
    }
}