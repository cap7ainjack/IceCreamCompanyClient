import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workflow } from '../models/workflow-model';

@Injectable({
  providedIn: 'root'
})
export class WorkflowsService {

  private apiUrl = 'https://localhost:7238/api';

  constructor(private http: HttpClient) { }

  getWorkflows(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`${this.apiUrl}/workflows`);
  }

  runWorkflow(workflowId: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/workflows/${workflowId}/run`, {});
  }
}