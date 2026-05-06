import { useContext } from "react";
import BibliotecarioContext from "./BibliotecarioContext";
import Alerta from "../../reutilizaveis/Alerta";
import Dialogo from "../../reutilizaveis/Dialogo";
import { Col, Form, FloatingLabel, Row } from "react-bootstrap";

function BibliotecarioFormulario() {
    const {
        objeto, 
        handleChange, 
        acaoCadastrar, 
        alerta,
        exibirForm, 
        setExibirForm
    } = useContext(BibliotecarioContext);

    return (
        <Dialogo
            id="formBibliotecario"
            titulo="Cadastro de Bibliotecário"
            acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm}
            setExibirForm={setExibirForm}
        >
            <Alerta alerta={alerta} />

            <Row>
                {objeto?.id_bibliotecario && (
                    <Col xs={12}>
                        <FloatingLabel label="Código" className="mb-3">
                            <Form.Control 
                                type="number" 
                                value={objeto.id_bibliotecario} 
                                readOnly 
                            />
                        </FloatingLabel>
                    </Col>
                )}

                <Col md={12}>
                    <FloatingLabel label="Nome Completo" className="mb-3">
                        <Form.Control 
                            name="nome" 
                            type="text" 
                            placeholder="Digite o nome"
                            value={objeto.nome} 
                            onChange={handleChange} 
                            required 
                            maxLength="50"
                        />
                    </FloatingLabel>
                </Col>

                <Col md={6}>
                    <FloatingLabel label="CPF (somente números)" className="mb-3">
                        <Form.Control 
                            name="cpf" 
                            type="text" 
                            placeholder="00000000000"
                            value={objeto.cpf} 
                            onChange={handleChange} 
                            required 
                            maxLength="11"
                        />
                    </FloatingLabel>
                </Col>

                <Col md={6}>
                    <FloatingLabel label="Data de Nascimento" className="mb-3">
                        <Form.Control 
                            name="data_nascimento" 
                            type="date" 
                            value={objeto.data_nascimento} 
                            onChange={handleChange} 
                            required 
                        />
                    </FloatingLabel>
                </Col>
            </Row>
        </Dialogo>
    );
}

export default BibliotecarioFormulario;