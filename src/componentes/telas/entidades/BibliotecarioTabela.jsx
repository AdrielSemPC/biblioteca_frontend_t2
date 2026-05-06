import { useContext } from "react";
import BibliotecarioContext from "./BibliotecarioContext"; // Certifique-se de que o Context existe
import Alerta from "../../reutilizaveis/Alerta";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

function BibliotecarioTabela() {
  const {
    alerta,
    listaObjetos,
    remover,
    novoObjeto,
    editarObjeto
  } = useContext(BibliotecarioContext);

  return (
    <div style={{ padding: "20px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Bibliotecarios</h1>
        <Button variant="primary" onClick={() => novoObjeto()}>
          Novo Bibliotecario <i className="bi bi-person-plus"></i>
        </Button>
      </div>

      <Alerta alerta={alerta} />

      {listaObjetos.length === 0 && !alerta.message && (
        <h3 className="text-center mt-5">Nenhum bibliotecario encontrado</h3>
      )}

      {listaObjetos.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ textAlign: "center", width: "120px" }}>Ações</th>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Nascimento</th>
            </tr>
          </thead>

          <tbody>
            {listaObjetos.map((obj) => (
              <tr key={obj.id_bibliotecario}>
                <td align="center">
                  <Button
                    variant="info"
                    className="me-2"
                    onClick={() => editarObjeto(obj.id_bibliotecario)}
                    title="Editar"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => remover(obj.id_bibliotecario)}
                    title="Remover"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>

                <td>{obj.id_bibliotecario}</td>
                <td>{obj.nome}</td>
                <td>{formatarCPF(obj.cpf)}</td>
                <td>{formatarData(obj.data_nascimento)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

function formatarData(data) {
  if (!data) return "-";
  const dataAjustada = new Date(data);
  dataAjustada.setMinutes(dataAjustada.getMinutes() + dataAjustada.getTimezoneOffset());
  return dataAjustada.toLocaleDateString("pt-BR");
}

function formatarCPF(cpf) {
  if (!cpf) return "-";
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export default BibliotecarioTabela;