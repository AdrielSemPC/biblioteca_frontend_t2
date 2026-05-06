import { useContext } from "react";
import LivroContext from "./LivroContext";
import Alerta from "../../reutilizaveis/Alerta";
import Dialogo from "../../reutilizaveis/Dialogo";
import { Col, Form, FloatingLabel, Row } from "react-bootstrap";

function LivroFormulario() {
    const {
        objeto, 
        handleChange, 
        acaoCadastrar, 
        alerta,
        exibirForm, 
        setExibirForm
    } = useContext(LivroContext);

    return (
        <Dialogo
            id="formLivro"
            titulo="Manutenção de Livros"
            acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm}
            setExibirForm={setExibirForm}
        >
            <Alerta alerta={alerta} />

            <Row>
                {/* Campo ID - Aparece apenas na Edição */}
                {objeto?.id_livro && (
                    <Col xs={12}>
                        <FloatingLabel label="Código" className="mb-3">
                            <Form.Control 
                                type="number" 
                                value={objeto.id_livro} 
                                readOnly 
                            />
                        </FloatingLabel>
                    </Col>
                )}

                {/* Título do Livro */}
                <Col md={12}>
                    <FloatingLabel label="Título" className="mb-3">
                        <Form.Control 
                            name="titulo" 
                            type="text" 
                            placeholder="Título do livro"
                            value={objeto.titulo} 
                            onChange={handleChange} 
                            required 
                        />
                    </FloatingLabel>
                </Col>

                {/* Edição */}
                <Col md={4}>
                    <FloatingLabel label="Edição" className="mb-3">
                        <Form.Control 
                            name="edicao" 
                            type="number" 
                            placeholder="Ex: 1"
                            value={objeto.edicao} 
                            onChange={handleChange} 
                            required 
                        />
                    </FloatingLabel>
                </Col>

                {/* Ano de Lançamento */}
                <Col md={4}>
                    <FloatingLabel label="Ano" className="mb-3">
                        <Form.Control 
                            name="ano" 
                            type="number" 
                            placeholder="Ex: 2024"
                            value={objeto.ano} 
                            onChange={handleChange} 
                            required 
                        />
                    </FloatingLabel>
                </Col>

                {/* ISBN */}
                <Col md={4}>
                    <FloatingLabel label="ISBN (13 dígitos)" className="mb-3">
                        <Form.Control 
                            name="isbn" 
                            type="text" 
                            placeholder="Ex: 9780132350884"
                            value={objeto.isbn} 
                            onChange={handleChange} 
                            required 
                            maxLength="13"
                        />
                    </FloatingLabel>
                </Col>
            </Row>
        </Dialogo>
    );
}

export default LivroFormulario;