import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Form, FloatingLabel, Col, Button } from 'react-bootstrap';
import { gravaAutenticacao, getToken } from '../../../seguranca/Autenticacao';
import Carregando from '../../reutilizaveis/Carregando';
import Alerta from '../../reutilizaveis/Alerta';
import { cadastrarUsuarioAPI } from '../../../servicos/UsuarioServico';

function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [mostraCadastro, setMostraCadastro] = useState(false);
    const [cadastro, setCadastro] = useState({
        nome: "",
        email: "",
        telefone: "",
        senha: ""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'senha') {
            setSenha(value);
        }
    };

    const handleCadastroChange = e => {
        const { name, value } = e.target;
        setCadastro({ ...cadastro, [name]: value });
    };

    const alternarFormulario = () => {
        setAlerta({ status: "", message: "" });
        setMostraCadastro(!mostraCadastro);
    };

    const acaoLogin = async e => {

        e.preventDefault();

        try {
            const body = {
                email: email,
                senha: senha
            };
            setCarregando(true);
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }).then(response => response.json())
                .then(json => {
                    if (json.auth === false) {
                        setAlerta({ status: "error", message: json.message })
                    }
                    if (json.auth === true) {
                        setAutenticado(true);
                        gravaAutenticacao(json);
                    }
                });
        } catch (err) {
            console.error(err.message);
            setAlerta({ status: "error", message: err.message })
        } finally {
            setCarregando(false);
        }
    };

    const acaoCadastro = async e => {
        e.preventDefault();

        try {
            setCarregando(true);
            const resposta = await cadastrarUsuarioAPI(cadastro);
            setAlerta({ status: resposta.status, message: resposta.message });
            if (resposta.status === "success") {
                setMostraCadastro(false);
                setCadastro({
                    nome: "",
                    email: "",
                    telefone: "",
                    senha: ""
                });
            }
        } catch (err) {
            setAlerta({ status: "error", message: err.message || "Erro ao cadastrar usuario" });
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        try {
            const token = getToken();
            if (token != null) {
                setAutenticado(true);
            }
        } catch (err) {
            setAlerta({ status: "error", message: err != null ? err.message : "Erro na autenticação" });
        }
    }, []);

    if (autenticado === true) {
        return <Navigate to="/privado" />
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Carregando carregando={carregando}>
                        <Alerta alerta={alerta} />
                        {!mostraCadastro ? (
                            <>
                                <form onSubmit={acaoLogin}>
                                    <h1 className="h3 mb-3 fw-normal">Login de usuario</h1>
                                    <Col md={12}>
                                        <FloatingLabel label="E-mail" className="mb-3">
                                            <Form.Control
                                                name="email"
                                                type="email"
                                                placeholder="usuario@exemplo.com"
                                                value={email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={12}>
                                        <FloatingLabel label="Senha" className="mb-3">
                                            <Form.Control
                                                name="senha"
                                                type="password"
                                                placeholder="Senha"
                                                value={senha}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <button className="w-100 btn btn-lg btn-primary" type="submit">Efetuar login</button>
                                </form>

                                <div className="text-center my-4">
                                    <Button type="button" variant="outline-secondary" onClick={alternarFormulario}>
                                        Criar conta
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={acaoCadastro}>
                                <h2 className="h4 mb-3 fw-normal">Cadastro de usuario</h2>

                                <Col md={12}>
                                    <FloatingLabel label="Nome" className="mb-3">
                                        <Form.Control
                                            name="nome"
                                            type="text"
                                            placeholder="Nome"
                                            value={cadastro.nome}
                                            onChange={handleCadastroChange}
                                            required
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col md={12}>
                                    <FloatingLabel label="E-mail" className="mb-3">
                                        <Form.Control
                                            name="email"
                                            type="email"
                                            placeholder="usuario@exemplo.com"
                                            value={cadastro.email}
                                            onChange={handleCadastroChange}
                                            required
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col md={12}>
                                    <FloatingLabel label="Telefone" className="mb-3">
                                        <Form.Control
                                            name="telefone"
                                            type="text"
                                            placeholder="(00) 00000-0000"
                                            value={cadastro.telefone}
                                            onChange={handleCadastroChange}
                                            required
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col md={12}>
                                    <FloatingLabel label="Senha" className="mb-3">
                                        <Form.Control
                                            name="senha"
                                            type="password"
                                            placeholder="Senha"
                                            value={cadastro.senha}
                                            onChange={handleCadastroChange}
                                            required
                                        />
                                    </FloatingLabel>
                                </Col>

                                <button className="w-100 btn btn-lg btn-success" type="submit">Criar conta</button>

                                <div className="text-center my-4">
                                    <Button type="button" variant="outline-secondary" onClick={alternarFormulario}>
                                        Ja tenho uma conta
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Carregando>
                </div>
            </div>
        </div>
    )

}

export default Login;
