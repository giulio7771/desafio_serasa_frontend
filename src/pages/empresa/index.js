import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class Product extends Component {
  state = {
    empresa: {},
    debitos: 0,
    notas_fiscais: 0
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    const response = await api.get(`/empresas/${id}`);
    
    this.setState({
      empresa: response.data
    });
  }
  

  importaArquivoDadosFinanceiros = async () => {
    const enviarDadosFinanceiros = async(result) => {
      const arqJson = JSON.parse(result);
      const requestInfo = {
        id: this.state.empresa.id,
        notas_fiscais: arqJson.notas_fiscais,
        debitos: arqJson.debitos
      };
      await api.post('/dados-financeiros', requestInfo)
      .then(response => {
        alert("Arquivo enviado");
        this.setState({
          ...this.state,
          empresa: {
            ...this.state.empresa,
            pontuacao: response.data.pontuacao
          }
        })
      });
    }

    const arquivo = document.getElementById("arquivo").files[0];
    var reader = new FileReader();
    reader.readAsText(arquivo, "UTF-8");
    reader.onload = function(evt)
    {
      enviarDadosFinanceiros(evt.target.result);
    }
  }

  render() {
    const { empresa } = this.state;

    return (
      <div className="empresa-info">
        <h1>{empresa.nome}</h1>
        <p>Pontuação: {empresa.pontuacao}</p>
        <hr/>
        <h5>Importar dados financeiros (JSON)</h5>
        <p>
            <input type="file" id="arquivo" />
            <button onClick={this.importaArquivoDadosFinanceiros}>Enviar</button>
        </p>
      </div>
    );
  }  
}