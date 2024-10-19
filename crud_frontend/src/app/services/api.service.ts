import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  createStudent(data: any) {
    return this.http.post(`http://localhost:5000/Ecommerce/add-user`, data);
  }

  getUsser(): Observable<user[]> {
    return this.http.get<user[]>(`http://localhost:5000/Ecommerce/allusers`);
  }

  editstudent(id: any, newdata: user): Observable<user> {
    return this.http.put<user>(
      `http://localhost:5000/Ecommerce/updateuser/${id}`,
      newdata,
    );
  }

  deletestudent(id: any) {
    return this.http.delete(`http://localhost:5000/Ecommerce/deleteuser/${id}`);
  }
}
