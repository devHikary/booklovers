import { Injectable } from '@angular/core';
import * as Crypto from 'crypto-js';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
const { NG_APP_SECRET, NG_APP_KEY, NG_APP_IV } = import.meta.env;

@Injectable({
  providedIn: 'root',
})
export class LocalService {

  constructor() {}

  public saveToken(value: string) {
    localStorage.setItem('token', value);
  }

  public getToken(): string {
    return localStorage.getItem('token') || '';
  }

  public getUserId(): string {
    let data = localStorage.getItem('id') || '';
    return this.decrypt(data).substring(1, this.decrypt(data).length - 1);
  }

  public getUsername(): string {
    let data = localStorage.getItem('username') || '';
    return this.decrypt(data).substring(1, this.decrypt(data).length - 1);
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string): string {
    let data = localStorage.getItem(key) || '';
    return this.decrypt(data);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearStorage() {
    localStorage.clear();
  }

  public encryptPWD(txt: string): string {
    var key = Crypto.enc.Hex.parse(NG_APP_KEY);

    var iv = Crypto.enc.Hex.parse(NG_APP_IV);
    var encrypted = Crypto.AES.encrypt(txt, key, { iv: iv });


    return encrypted.toString();
  }

  public encrypt(txt: string): string {
    return Crypto.AES.encrypt(txt, NG_APP_SECRET).toString();
  }

  public decrypt(txt: string): string {
    return Crypto.AES.decrypt(txt, NG_APP_SECRET).toString(Crypto.enc.Utf8);
  }

  public decryptBase64(token: string): any {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  public decodePayloadJWT(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
