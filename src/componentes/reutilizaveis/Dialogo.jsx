import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Dialogo(props) {
    const [validado, setValidado] = useState(false);

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if(form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidado(true);
        if(form.checkValidity() === true) {
            props.acaoCadastrar(e);
        }
    };

    return (
        <Modal show={props.exibirForm} onHide={() => props.setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{props.titulo}</Modal.Title>
            </Modal.Header>
            <Form id={props.id} onSubmit={handleSubmit} noValidate validated={validado}>
                <Modal.Body>
                    <Container>
                        <Row>{props.children}</Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setExibirForm(false)}>Fechar</Button>
                    <Button variant="success" type="submit">Salvar<i className="bi bi-save"></i></Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default Dialogo;