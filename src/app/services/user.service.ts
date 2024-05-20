import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private branchName: string | null = null;
  private branchNumber: number | null = null;

  setBranchDetails(branchName: string, branchNumber: number): void {
    this.branchName = branchName;
    this.branchNumber = branchNumber;
  }

  getBranchName(): string | null {
    return this.branchName;
  }

  getBranchNumber(): number | null {
    return this.branchNumber;
  }
}
