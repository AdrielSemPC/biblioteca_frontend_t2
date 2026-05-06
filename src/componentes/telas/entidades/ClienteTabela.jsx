import { useContext } from "react";
import ClienteContext from "./ClienteContext"; // Certifique-se de que o Context existe
import Alerta from "../../reutilizaveis/Alerta";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

function ClienteTabela() {
  const {
    alerta,
    listaObjetos,
    remover,
    novoObjeto,
    editarObjeto
  } = useContext(ClienteContext);

  return (
    <div style={{ padding: "20px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Clientes</h1>
        <Button variant="primary" onClick={() => novoObjeto()}>
          Novo Cliente <i className="bi bi-person-plus"></i>
        </Button>
      </div>

      <Alerta alerta={alerta}/>

      {listaObjetos.length === 0 && !alerta.message && (
        <h3 className="text-center mt-5">Nenhum cliente encontrado</h3>
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
              <th>Multa acumulada</th>
            </tr>
          </thead>

          <tbody>
            {listaObjetos.map((obj) => (
              <tr key={obj.id_cliente}>
                <td align="center">
                  <Button
                    variant="info"
                    className="me-2"
                    onClick={() => editarObjeto(obj.id_cliente)}
                    title="Editar"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => remover(obj.id_cliente)}
                    title="Remover"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>

                <td>{obj.id_cliente}</td>
                <td>{obj.nome}</td>
                <td>{formatarCPF(obj.cpf)}</td>
                <td>{formatarData(obj.data_nascimento)}</td>
                <td style={{ color: obj.multa > 0 ? "red" : "inherit" }}>
                  {formatarMoeda(obj.multa)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

// Funções Auxiliares de Formatação
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

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default ClienteTabela;