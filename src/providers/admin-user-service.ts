import { APIService } from './api-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserAdminService extends APIService {
  constructor(
    protected http: HttpClient)
    {super(http);}



}
