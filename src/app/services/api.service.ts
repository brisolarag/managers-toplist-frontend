import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManagerModel } from '../models/manager.model';
import { firstValueFrom } from 'rxjs';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly URL = 'http://localhost:5050/Manager'

  constructor(private http: HttpClient) { }

  // get managers:
  async getManagers(): Promise<ResponseModel<ManagerModel[]>> {
    return await firstValueFrom(this.http.get<ResponseModel<ManagerModel[]>>(this.URL))
      .then(response => response)
      .catch(error => {
        console.error('Error catching response for managers from api:', error);
        throw error;
      });
  }

  async changePosition(updates: { id: number; position: number }[]): Promise<ResponseModel<undefined>> {
    const url = `${this.URL}/changePosition`;

    try {
      const response = await firstValueFrom(
        this.http.patch<ResponseModel<undefined>>(url, updates)
      );
      return response;
    } catch (error) {
      console.error('Error catching response for managers from api:', error);
      throw error;
    }
  }

  async changeDescription(managerId: number, newDescription: string): Promise<ResponseModel<ManagerModel>> {
    const url = `${this.URL}/${managerId}`;
  
    const body = {
      description: newDescription
    };
  
    try {
      const response = await firstValueFrom(
        this.http.patch<ResponseModel<ManagerModel>>(url, body)
      );
      return response;
    } catch (error) {
      console.error('Error catching response for managers from api:', error);
      throw error;
    }
  }
}
