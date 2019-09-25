import { Component } from '@angular/core';
import { ProdutosApiService } from './api/produtos-api.service';
import { CategoriasApiService } from './api/categorias-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Preenchido com o NGMODEL
  public categoryID: number;
  public productCode: string;
  public productName: string;
  public listPrice: number;
  public categoryName: string;

  // vai ter minhas categorias
  public minhasCategorias: any;
  public minhaCategoria: any;

  // vai ter meus produtos
  public meusProdutos: any;
  public detalhesProduto: any;

  // Filtro de Preços
  public minPrice = null;
  public maxPrice = null;

  constructor(
    private produtosApiService: ProdutosApiService,
    private categoriasApiService: CategoriasApiService,
  ) {
    this.listaCategorias();
  }

  listaCategorias() {

    /**
     * API DE CATEGORIAS
     */
    this.categoriasApiService.GetCategorias()
      .then((categorias) => {
        // guardando no componente as categorias
        this.minhasCategorias = categorias;
      }).catch((error) => {
        console.log({ error });
      });
  }

  clicaCategoria(categoria) {
    const id = +categoria.categoryID;

    // MARCA NO FORMULÁRIO QUAL É A CATEGORIA
    this.minhaCategoria = categoria;
    this.categoryID = id;

    this.produtosApiService.GetProdutosByCategoria(id)
      .then((produtos) => {
        // guardando no componente os produtos da categoria
        this.meusProdutos = produtos;
      }).catch((error) => {
        console.log({ error });
      });

  }

  setRange(min, max) {
    this.minPrice = min;
    this.maxPrice = max;
  }

  filtrarPreco(lista) {
    const listaNova = [];

    const minPrice = this.minPrice;
    const maxPrice = this.maxPrice;

    console.log({
      minPrice,
      maxPrice
    });

    if (lista != null) {

      for (const produto of lista) {

        const listPrice = +produto.listPrice;

        // se tem algum definido
        if ( maxPrice != null || minPrice != null ) {

          // se tem um intervalo fechado
          if ( maxPrice != null && minPrice != null ) {
            if (listPrice >= minPrice && listPrice <= maxPrice) {
              listaNova.push(produto);
            }
          } else {
            if (maxPrice != null && listPrice <= maxPrice) {
              listaNova.push(produto);
              continue;
            } else if (minPrice != null && listPrice >= minPrice) {
              listaNova.push(produto);
            }
          }

        } else {
          return lista;
        }

      }

    }

    console.log(listaNova);

    return listaNova;
  }

  clicaProduto(produto) {
    const id = +produto.productID;

    this.produtosApiService.GetProdutoById(id)
      .then((detalhesProduto) => {
        // guardando no componente os produtos da categoria
        this.detalhesProduto = detalhesProduto;
      }).catch((error) => {
        console.log({ error });
      });
  }

  adiciona() {
    this.produtosApiService.PostProduto(
      this.categoryID,
      this.productCode,
      this.productName,
      this.listPrice,
    ).then(() => {
      this.clicaCategoria(this.minhaCategoria);
    }).catch((error) => {
      console.log({ error });
    });

    this.productCode = null;
    this.productName = null;
    this.listPrice = null;
  }

  adicionaCategoria() {

    this.categoriasApiService.PostCategoria(
      this.categoryName,
    ).then(() => {
      this.listaCategorias();
    }).catch((error) => {
      console.log({ error });
    });

    this.categoryName = null;

  }

}
