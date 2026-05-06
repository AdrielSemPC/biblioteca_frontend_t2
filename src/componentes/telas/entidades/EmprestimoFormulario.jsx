import { useContext } from "react";
import EmprestimoContext from "./EmprestimoContext";
import Alerta from "../../reutilizaveis/Alerta";
import Dialogo from "../../reutilizaveis/Dialogo";
import { Col, Form, FloatingLabel, Row } from "react-bootstrap";

function EmprestimoFormulario() {
    const {
        objeto, handleChange, acaoCadastrar, alerta,
        exibirForm, setExibirForm, clientes, livros, bibliotecarios,
    } = useContext(EmprestimoContext);

    const livrosDisponiveis = livros.filter(l => {
        if (objeto.id_livro === l.id_livro) return true;
        return l.disponivel !== false; 
    });

    return (
        <Dialogo
            id="formEmprestimo"
            titulo="Cadastro de Empréstimo"
            acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm}
            setExibirForm={setExibirForm}
        >
            <Alerta alerta={alerta} />

            <Row>
                {objeto?.id_emprestimo && (
                    <Col xs={12}>
                        <FloatingLabel label="Código do Empréstimo" className="mb-3">
                            <Form.Control type="number" value={objeto.id_emprestimo} readOnly />
                        </FloatingLabel>
                    </Col>
                )}

                <Col md={12}>
                    <FloatingLabel label="Cliente" className="mb-3">
                        <Form.Select 
                            name="id_cliente" 
                            value={objeto.id_cliente} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Selecione um cliente</option>
                            {clientes.map(c => (
                                <option key={c.id_cliente} value={c.id_cliente}>
                                    {c.nome} {c.multa > 0 ? `(Multa: R$ ${c.multa})` : ""}
                                </option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>

                <Col md={12}>
                    <FloatingLabel label="Livro (Apenas disponíveis)" className="mb-3">
                        <Form.Select 
                            name="id_livro" 
                            value={objeto.id_livro} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Selecione um livro</option>
                            {livrosDisponiveis.map(l => (
                                <option key={l.id_livro} value={l.id_livro}>
                                    {l.titulo}
                                </option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>

                <Col md={6}>
                    <FloatingLabel label="Bibliotecário Responsável" className="mb-3">
                        <Form.Select 
                            name="id_bibliotecario" 
                            value={objeto.id_bibliotecario} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Selecione</option>
                            {bibliotecarios.map(b => (
                                <option key={b.id_bibliotecario} value={b.id_bibliotecario}>
                                    {b.nome}
                                </option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                
                {/* Status exibido apenas como informativo (Read Only) */}
                <Col md={6}>
                    <FloatingLabel label="Status Atual" className="mb-3">
                        <Form.Control 
                            type="text" 
                            name="status" 
                            value={objeto.status} 
                            readOnly 
                            disabled
                        />
                    </FloatingLabel>
                </Col>
            </Row>
        </Dialogo>
    );
}

export default EmprestimoFormulario;