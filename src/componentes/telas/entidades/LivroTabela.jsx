import { useContext } from "react";
import LivroContext from "./LivroContext";
import Alerta from "../../reutilizaveis/Alerta";
import Table from "react-bootstrap/Table";
import { Button, Badge } from "react-bootstrap";

function LivroTabela() {
  const {
    alerta,
    listaObjetos,
    remover,
    novoObjeto,
    editarObjeto
  } = useContext(LivroContext);

  return (
    <div style={{ padding: "20px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Livros</h1>
        <Button variant="primary" onClick={() => novoObjeto()}>
          Novo Livro <i className="bi bi-book-half"></i>
        </Button>
      </div>

      <Alerta alerta={alerta} />

      {listaObjetos.length === 0 && !alerta.message && (
        <h3 className="text-center mt-5">Nenhum livro encontrado no acervo</h3>
      )}

      {listaObjetos.length > 0 && (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th style={{ textAlign: "center", width: "120px" }}>Ações</th>
              <th>ID</th>
              <th>Título</th>
              <th style={{ textAlign: "center" }}>Edição</th>
              <th style={{ textAlign: "center" }}>Ano</th>
              <th>ISBN</th>
            </tr>
          </thead>

          <tbody>
            {listaObjetos.map((obj) => (
              <tr key={obj.id_livro}>
                <td align="center">
                  <Button
                    variant="info"
                    className="me-2"
                    onClick={() => editarObjeto(obj.id_livro)}
                    title="Editar Livro"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => remover(obj.id_livro)}
                    title="Excluir Livro"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>

                <td>{obj.id_livro}</td>
                <td>
                  <strong>{obj.titulo}</strong>
                </td>
                <td align="center">
                  <Badge bg="secondary">{obj.edicao}ª Ed.</Badge>
                </td>
                <td align="center">{obj.ano}</td>
                <td>
                  <code className="text-dark">{formatarISBN(obj.isbn)}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

function formatarISBN(isbn) {
  if (!isbn) return "-";
  const str = String(isbn);
  if (str.length === 13) {
    return `${str.substring(0, 3)}-${str.substring(3)}`;
  }
  return str;
}

export default LivroTabela;