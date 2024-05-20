import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeeService } from '../services/fee.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-regular-fee',
  templateUrl: './regular-fee.component.html',
  styleUrls: ['./regular-fee.component.scss'],
})
export class RegularFeeComponent implements OnInit {
  regularFeeForm!: FormGroup;
  currentDate: string = new Date().toLocaleDateString();
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  standards: string[] = [
    'Nursery',
    'LKG',
    'UKG',
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
  ];
  section: string[] = ['A', 'B', 'C', 'D'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private feeService: FeeService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.regularFeeForm = this.createFeeForm();
    this.populateBranchDetails();
  }

  createFeeForm() {
    return this.fb.group({
      date: [this.currentDate],

      student_name: [null, Validators.required],
      father_name: [null, Validators.required],
      branch_name: [null, Validators.required],
      branch_number: [null, Validators.required],
      contact_number: [null, Validators.required],
      month_of_fee: [null, Validators.required],
      standard: [null, Validators.required],
      section: [null, Validators.required],
      admission_fee: [null, Validators.required],
      special_fee: [null, Validators.required],
      building_fee: [null, Validators.required],
      tuition_fee: [null, Validators.required],
      total_fee: [{ value: null, disabled: true }, Validators.required],
    });
  }

  calculateTotal() {
    const admissionFee = this.regularFeeForm.get('admission_fee')?.value || 0;
    const specialFees = this.regularFeeForm.get('special_fee')?.value || 0;
    const buildingFees = this.regularFeeForm.get('building_fee')?.value || 0;
    const tuitionFees = this.regularFeeForm.get('tuition_fee')?.value || 0;
    const total = admissionFee + specialFees + buildingFees + tuitionFees;
    this.regularFeeForm.get('total_fee')?.setValue(total);
    return total;
  }

  populateBranchDetails() {
    const branchName = this.userService.getBranchName();
    const branchNumber = this.userService.getBranchNumber();
    if (branchName && branchNumber) {
      this.regularFeeForm.patchValue({
        branch_name: branchName,
        branch_number: branchNumber,
      });
    }
  }

  onSubmit() {
    if (this.regularFeeForm.valid) {
      this.regularFeeForm.get('total_fee')?.enable();
      let formData = { ...this.regularFeeForm.value };
      delete formData.date;
      // Convert date to ISO format
      const date = new Date();
      const isoDate = date.toISOString();
      formData = { ...formData, date: isoDate };

      this.feeService.submitFeeData(formData).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
          const receiptNumber = response.id; // Assuming response contains the id
          this.router.navigate(['/success', 'regular', receiptNumber]);
        },
        error: (error: any) => {
          console.log('error submitting fee data:', error);
        },
      });
    }
  }
}
