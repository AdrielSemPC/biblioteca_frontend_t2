import { useContext } from "react";
import EmprestimoContext from "./EmprestimoContext";
import Alerta from "../../reutilizaveis/Alerta";
import Table from "react-bootstrap/Table";
import { Button, Badge } from "react-bootstrap";

function EmprestimoTabela() {
  const {
    alerta,
    listaObjetos,
    remover,
    novoObjeto,
    editarObjeto,
    finalizar
  } = useContext(EmprestimoContext);

  return (
    <div style={{ padding: "20px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Gerenciamento de Empréstimos</h1>
        <Button variant="primary" onClick={() => novoObjeto()}>
          Novo Empréstimo <i className="bi bi-calendar-plus"></i>
        </Button>
      </div>

      <Alerta alerta={alerta} />

      {listaObjetos.length === 0 && !alerta.message && (
        <h3 className="text-center mt-5">Nenhum empréstimo encontrado</h3>
      )}

      {listaObjetos.length > 0 && (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th style={{ textAlign: "center", width: "150px" }}>Ações</th>
              <th>ID</th>
              <th>Cliente</th>
              <th>Livro</th>
              <th>Bibliotecário</th>
              <th>Período (Início - Fim)</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {listaObjetos.map((obj) => (
              <tr key={obj.id_emprestimo}>
                <td align="center">
                  <Button
                    variant="info"
                    className="me-2"
                    onClick={() => editarObjeto(obj.id_emprestimo)}
                    title="Editar"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  {obj.status === 'ATIVO' && (
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => {
                        if (window.confirm(`Deseja finalizar o empréstimo do livro "${obj.livro_titulo}"?`)) {
                          finalizar(obj.id_emprestimo);
                        }
                      }}
                      title="Finalizar Empréstimo"
                    >
                      <i className="bi bi-check-lg"></i>
                    </Button>
                  )}

                  <Button
                    variant="danger"
                    onClick={() => remover(obj.id_emprestimo)}
                    title="Remover"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>

                <td>{obj.id_emprestimo}</td>
                <td>{obj.cliente_nome}</td>
                <td>{obj.livro_titulo}</td>
                <td>{obj.bibliotecario_nome}</td>
                <td>
                  <div>
                    <strong>{formatarData(obj.data_inicio)}</strong> até <strong>{formatarData(obj.data_fim)}</strong>
                  </div>
                  {/* Se houver data de devolução registrada no banco, ela é exibida aqui[cite: 4, 8] */}
                  {obj.data_devolucao && (
                    <small className="text-success fw-bold">
                      Devolvido em: {formatarData(obj.data_devolucao)}
                    </small>
                  )}
                </td>
                <td>
                  {renderizarStatus(obj.status)}
                </td>
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

function renderizarStatus(status) {
  let cor = "secondary";
  const s = status?.toUpperCase();

  switch (s) {
    case "ATIVO":
      cor = "warning";
      break;
    case "DEVOLVIDO":
    case "FINALIZADO":
      cor = "success";
      break;
    case "ATRASADO":
      cor = "danger";
      break;
    default:
      cor = "secondary";
  }

  return <Badge bg={cor}>{status}</Badge>;
}

export default EmprestimoTabela;