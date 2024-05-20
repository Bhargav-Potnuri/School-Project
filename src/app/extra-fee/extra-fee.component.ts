import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FeeService } from '../services/fee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extra-fee',
  templateUrl: './extra-fee.component.html',
  styleUrl: './extra-fee.component.scss',
})
export class ExtraFeeComponent {
  extraFeeForm!: FormGroup;
  currentDate: string = new Date().toLocaleDateString();
  receiptNo: string = ''; // Fetch receipt no from API or set initial value as needed
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
    private userService: UserService,
    private feeService: FeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.extraFeeForm = this.createExtraFeeForm();
  }
  createExtraFeeForm() {
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
      total_fee: [{ value: null, disabled: true }, Validators.required],
      additional_technology_fee: [null, Validators.required],
      extra_coaching_fee: [null, Validators.required],
      bus_fee: [null, Validators.required],
    });
  }
  calculateTotal() {
    const ExtraCoachingFee =
      this.extraFeeForm.get('extra_coaching_fee')?.value || 0;
    const busFee = this.extraFeeForm.get('bus_fee')?.value || 0;
    const AdditionlTechnologyFee =
      this.extraFeeForm.get('additional_technology_fee')?.value || 0;

    const total = ExtraCoachingFee + busFee + AdditionlTechnologyFee;
    this.extraFeeForm.get('total_fee')?.setValue(total);
    return total;
  }
  populateBranchDetails() {
    const branchName = this.userService.getBranchName();
    const branchNumber = this.userService.getBranchNumber();
    if (branchName && branchNumber) {
      this.extraFeeForm.patchValue({
        branch_name: branchName,
        branch_number: branchNumber,
      });
    }
  }

  onSubmit() {
    if (this.extraFeeForm.valid) {
      this.extraFeeForm.get('total_fee')?.enable();
      let formData = { ...this.extraFeeForm.value };
      delete formData.date;
      // Convert date to ISO format
      const date = new Date();
      const isoDate = date.toISOString();
      formData = { ...formData, date: isoDate };

      this.feeService.submitExtraFeeData(formData).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
          const receiptNumber = response.id; // Assuming response contains the id
          this.router.navigate(['/success', 'extra', receiptNumber]);
        },
        error: (error: any) => {
          console.log('error submitting fee data:', error);
        },
      });
    }
  }
}
