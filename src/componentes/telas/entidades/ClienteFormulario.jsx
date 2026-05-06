import { useContext } from "react";
import ClienteContext from "./ClienteContext";
import Alerta from "../../reutilizaveis/Alerta";
import Dialogo from "../../reutilizaveis/Dialogo";
import { Col, Form, FloatingLabel, Row, InputGroup } from "react-bootstrap";

function ClienteFormulario() {
    const {
        objeto, 
        handleChange, 
        acaoCadastrar, 
        alerta,
        exibirForm, 
        setExibirForm
    } = useContext(ClienteContext);

    return (
        <Dialogo
            id="formCliente"
            titulo="Cadastro de Cliente"
            acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm}
            setExibirForm={setExibirForm}
        >
            <Alerta alerta={alerta} />

            <Row>
                {/* Campo Código (Readonly) */}
                {objeto?.id_cliente && (
                    <Col xs={12}>
                        <FloatingLabel label="Código" className="mb-3">
                            <Form.Control 
                                type="number" 
                                value={objeto.id_cliente} 
                                readOnly 
                            />
                        </FloatingLabel>
                    </Col>
                )}

                {/* Nome do Cliente */}
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

                {/* CPF */}
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

                {/* Data de Nascimento */}
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

                {/* Valor da Multa */}
                <Col md={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>R$</InputGroup.Text>
                        <FloatingLabel label="Valor da Multa Acumulada">
                            <Form.Control 
                                name="multa" 
                                type="number" 
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                value={objeto.multa} 
                                onChange={handleChange} 
                            />
                        </FloatingLabel>
                    </InputGroup>
                </Col>
            </Row>
        </Dialogo>
    );
}

export default ClienteFormulario;