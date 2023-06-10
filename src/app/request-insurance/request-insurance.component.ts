import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { InsuranceRequestModel } from '../model/insurance-request-model';
import { InsuranceService } from '../service/insurance.service';

@Component({
  selector: 'app-request-insurance',
  templateUrl: './request-insurance.component.html',
  styleUrls: ['./request-insurance.component.css']
})
export class RequestInsuranceComponent implements OnInit{

  insuranceForm!: FormGroup;
  isLoading = false;
  buttonLoading = false;

  model_list = [
    {
      text: 'Decision Tree',
      value: 'Decision Tree'
    },
    {
      text: 'Random Forest',
      value: 'Random Forest'
    },
    {
      text: 'Multilayer Perceptron',
      value: 'Multilayer Perceptron'
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private insuranceService: InsuranceService
  ){}

  createNotification(content: string, type: string): void {
    this.notification.create(type, content, '');
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.insuranceForm = this.formBuilder.group({
        Age: ['', [Validators.required]],
        Diabetes: [null, [Validators.required]],
        BloodPressureProblems: [null, [Validators.required]],
        AnyTransplants: [null, [Validators.required]],
        AnyChronicDiseases: [null, [Validators.required]],
        Height: ['', [Validators.required]],
        Weight: ['', [Validators.required]],
        KnownAllergies: [null, [Validators.required]],
        HistoryOfCancerInFamily: [null, [Validators.required]],
        NumberOfMajorSurgeries: ['', [Validators.required]],
        Model: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.buttonLoading = true;
    for (const i in this.insuranceForm.controls) {
        if (this.insuranceForm.controls[i]) {
            this.insuranceForm.controls[i].markAsDirty();
            this.insuranceForm.controls[i].updateValueAndValidity();
        }
    }

    if (this.insuranceForm.status === 'VALID') {
        const insuranceRequestModel = new InsuranceRequestModel();
        insuranceRequestModel.Age = this.insuranceForm.value.Age;
        insuranceRequestModel.Diabetes = this.insuranceForm.value.Diabetes === 'Yes' ? 1 : 0;
        insuranceRequestModel.BloodPressureProblems = this.insuranceForm.value.BloodPressureProblems === 'Yes' ? 1 : 0;
        insuranceRequestModel.AnyTransplants = this.insuranceForm.value.AnyTransplants === 'Yes' ? 1 : 0;
        insuranceRequestModel.AnyChronicDiseases = this.insuranceForm.value.AnyChronicDiseases === 'Yes' ? 1 : 0;
        insuranceRequestModel.Height = parseFloat(this.insuranceForm.value.Height);
        insuranceRequestModel.Weight = parseFloat(this.insuranceForm.value.Weight);
        insuranceRequestModel.KnownAllergies = this.insuranceForm.value.KnownAllergies === 'Yes' ? 1 : 0;
        insuranceRequestModel.HistoryOfCancerInFamily = this.insuranceForm.value.HistoryOfCancerInFamily === 'Yes' ? 1 : 0;
        insuranceRequestModel.NumberOfMajorSurgeries = this.insuranceForm.value.NumberOfMajorSurgeries

        console.log(insuranceRequestModel);

        this.router.navigate(['/result'], {queryParams: {result: 844.307}});

        if(this.insuranceForm.value.Model === 'Decision Tree') {
          this.insuranceService.decisionTree(insuranceRequestModel).subscribe(resp => {
            if (resp.data && resp.status === 'SUCCESS') {
              this.createNotification('Successfully added a new request.', 'success');
              this.buttonLoading = false;
              this.router.navigate(['/result'], {queryParams: {result: resp.data.prediction}});
            }
          });
        } else if(this.insuranceForm.value.Model === 'Random Forest'){
          this.insuranceService.randomForest(insuranceRequestModel).subscribe(resp => {
            if (resp.data && resp.status === 'SUCCESS') {
              this.createNotification('Successfully added a new request.', 'success');
              this.buttonLoading = false;
              this.router.navigate(['/result'], {queryParams: {result: resp.data.prediction}});
            }
          });
        } else if(this.insuranceForm.value.Model === 'Multilayer Perceptron'){
          this.insuranceService.mlp(insuranceRequestModel).subscribe(resp => {
            if (resp.data && resp.status === 'SUCCESS') {
              this.createNotification('Successfully added a new request.', 'success');
              this.buttonLoading = false;
              this.router.navigate(['/result'], {queryParams: {result: resp.data.prediction}});
            }
          });
        } else {
          this.createNotification('Please select the model given.', 'error');
        }
    } else {
        this.createNotification('Form validation error.', 'error');
        this.buttonLoading = false;
    }
    this.buttonLoading = false;
  }
}
