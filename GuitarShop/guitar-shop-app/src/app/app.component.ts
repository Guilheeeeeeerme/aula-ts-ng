import { Component } from '@angular/core';
import { ProdutosApiService } from './api/produtos-api.service';
import { CategoriasApiService } from './api/categorias-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public categoryID: number;
  public productCode: string;
  public productName: string;
  public listPrice: number;
  public nomeDaCategoria: string;

  constructor(
    private produtosApiService: ProdutosApiService,
    private categoriasApiService: CategoriasApiService,
  ) {

    this.nomeDaCategoria = 'preencher aquiii';

    /**
     * API DE PRODUTOS
     */
    this.produtosApiService.GetProdutos().then((produtos) => {
      // todos os produtos vem na variavel 'produtos'
      console.log({ GetProdutos: produtos });
    }).catch((error) => {
      console.log({ error });
    });

    this.produtosApiService.GetProdutosByCategoria(1).then((produtos) => {
      // produtos da categoria vem na variavel 'produtos'
      console.log({ GetProdutosByCategoria: produtos });
    }).catch((error) => {
      console.log({ error });
    });

    this.produtosApiService.GetProdutoById(1).then((produto) => {
      // produtos do id 'x' vem na variavel 'produtos'
      console.log({ GetProdutoById: produto });
    }).catch((error) => {
      console.log({ error });
    });

    this.produtosApiService.PostProduto(1, '2', '3', 4).then((produto) => {
      // produto do id 'x' vem na variavel 'produto'
      console.log({ PostProduto: produto });
    }).catch((error) => {
      console.log({ error });
    });

    /**
     * API DE CATEGORIAS
     */
    this.categoriasApiService.GetCategorias().then((categorias) => {
      // todos as categorias vem na variavel 'categorias'
      console.log({ GetCategorias: categorias });
    }).catch((error) => {
      console.log({ error });
    });

    this.categoriasApiService.GetCategoriaById(1).then((categoria) => {
      // categoria do id 'x' vem na variavel 'categoria'
      console.log({ GetCategoriaById: categoria });
    }).catch((error) => {
      console.log({ error });
    });

  }
}
