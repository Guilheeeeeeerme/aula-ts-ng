import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const host = '127.0.0.1';
// const host = 'ec2-18-222-134-19.us-east-2.compute.amazonaws.com';
const port = 8081;
const ApiUrl = `http://${host}:${port}/api`;

@Injectable({
  providedIn: 'root'
})
export class CategoriasApiService {

  path = 'categorias.php';

  constructor(private httpClient: HttpClient) { }

  GetCategorias() {
    return this.httpClient.get(`${ApiUrl}/${this.path}`).toPromise();
  }

  PostCategoria(categoryName: string){
    const body: any = { categoryName };
    return this.httpClient.post(`${ApiUrl}/${this.path}`, body).toPromise();
  }

  GetCategoriaById(id: number) {
    const params: any = { id };
    return this.httpClient.get(`${ApiUrl}/${this.path}`, { params }).toPromise();
  }

}
