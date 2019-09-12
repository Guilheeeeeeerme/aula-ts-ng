"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pessoa = /** @class */ (function () {
    function Pessoa() {
    }
    Pessoa.prototype.Anda = function () {
        console.log('Estou andando, ' + this.Nome);
    };
    return Pessoa;
}());
exports.Pessoa = Pessoa;
