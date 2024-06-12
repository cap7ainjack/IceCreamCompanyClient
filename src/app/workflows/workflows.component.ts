import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

import { WorkflowsService } from '../services/workflow-service';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-workflows',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './workflows.component.html',
  styleUrl: './workflows.component.scss'
})
export class WorkflowsComponent {
  workflows: any[] = [];
  displayedColumns: string[] = ['workflowId', 'workflowName', 'isActive', 'multiExecBehavior', 'action'];
  message: string | null = null;

  constructor(private workflowsService: WorkflowsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchWorkflows();
  }

  private fetchWorkflows(): void {
    this.workflowsService.getWorkflows().pipe(
      catchError((error) => {
        console.error('Error fetching workflows:', error);
        return throwError(() => new Error('Unable to fetch workflows. Please try again later.'));
      })
    ).subscribe((response: any) => {
      this.workflows = response;
    });
  }

  runWorkflow(workflowId: number): void {
    this.workflowsService.runWorkflow(workflowId).pipe(
      catchError((error) => {
        console.error('Error executing workflow:', error);
        return throwError(() => new Error('Workflow execution failed. Please try again.'));
      }),
      map((response: any) => {
        console.log(response.success);
        if (response !== undefined && response.success) {
          this.openSnackBar("Success");
        } else {
          this.openSnackBar("Fail");
        }
      })
    ).subscribe();
  }

  openSnackBar(status: string): void {

    let message = status === 'Success' ? "Workflow run successfull!" : "Workflow run failed!";

    this._snackBar.open(message, '', {
      duration: 3000,
      panelClass: status === 'Success' ? ['success-snackbar'] : ['fail-snackbar']
    });
  }
}
