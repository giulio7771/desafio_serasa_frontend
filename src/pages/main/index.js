import React, { Component } from 'react';
import api from '../../services/api';
import { Link }  from 'react-router-dom';

import "./styles.css";

export default class Main extends Component {
  state = {
    empresas: []
  }
  
  componentDidMount() {
    this.carregaEmpresas();
  }

  carregaEmpresas = async () => {
    const response = await api.get(`/empresas`);

    const empresas = response.data;

    this.setState({
      ...this.state,
      empresas
    });
  }

  

  render() {
      const { empresas } = this.state;
      
      return (
      <div className="empresa-list">
        {empresas.map(empresa => (
          <article key={empresa.id}>
            <strong>{empresa.nome}</strong>
            <p>Pontuação: {empresa.pontuacao}</p>
            <Link to={`/empresas/${empresa.id}`}>Acessar</Link>
          </article>
        ))}
      </div>
    );
  }
}