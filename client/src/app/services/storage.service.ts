import { Injectable } from "@angular/core";
import "rxjs/add/operator/share";
import { Observable } from "rxjs/Observable";


export abstract class StorageService {
  public abstract get(): Storage;
}

@Injectable()
export class LocalStorageServie {
  public get(): Storage {
    return localStorage;
  }
}