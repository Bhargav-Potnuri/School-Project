import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeService } from '../services/fee.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent {
  feeType: string = '';
  receiptId: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private feeService: FeeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.feeType = params.get('type') || '';
      this.receiptId = params.get('id') || '';
    });
  }

  printForm() {
    if (this.feeType) {
      this.feeService.downloadReceipt(this.receiptId, this.feeType).subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = url;
          document.body.appendChild(iframe);
          iframe.contentWindow?.print();
          window.URL.revokeObjectURL(url);
        },
        error: (error: any) => {
          console.error('Error downloading receipt:', error);
        },
      });
    }
  }

  downloadPDF() {
    if (this.feeType) {
      this.feeService.downloadReceipt(this.receiptId, this.feeType).subscribe({
        next: (data: Blob) => {
          const blobUrl = URL.createObjectURL(data);
          window.open(blobUrl);
        },
        error: (error: any) => {
          console.error('Error downloading receipt:', error);
        },
      });
    }
  }

  returnHome() {
    // Navigate back to the home page
    this.router.navigate(['/']);
  }
}
