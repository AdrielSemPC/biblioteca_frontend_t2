import { useState, useEffect } from "react";
import {
  getBibliotecariosAPI,
  getBibliotecarioPorCodigoAPI,
  deleteBibliotecarioPorCodigoAPI,
  cadastrarBibliotecarioAPI,
  alterarBibliotecarioAPI
} from '../../../servicos/BibliotecarioServico';

import Carregando from "../../reutilizaveis/Carregando";
import BibliotecarioContext from "./BibliotecarioContext";
import BibliotecarioTabela from "./BibliotecarioTabela";
import BibliotecarioFormulario from "./BibliotecarioFormulario";

import WithAuth from "../../../seguranca/WithAuth";

function Bibliotecario() {
    const estadoInicial = {
        id_bibliotecario: "",
        nome: "",
        cpf: "",
        data_nascimento: ""
    };

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState(estadoInicial);
    const [carregando, setCarregando] = useState(true);

    const recuperaBibliotecarios = async () => {
        setCarregando(true);
        try {
            const dados = await getBibliotecariosAPI();
            setListaObjetos(dados);
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao recuperar bibliotecários!" });
        }
        setCarregando(false);
    };

    const remover = async (id) => {
        if (window.confirm('Deseja remover este bibliotecário?')) {
            try {
                let respostaAPI = await deleteBibliotecarioPorCodigoAPI(id);
                setAlerta({ status: respostaAPI.status, message: respostaAPI.message });
                recuperaBibliotecarios();
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao remover o bibliotecário!" });
            }
        }
    };

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto(estadoInicial);
        setExibirForm(true);
    };

    const editarObjeto = async (id) => {
        try {
            const dados = await getBibliotecarioPorCodigoAPI(id);
            setObjeto(dados);
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setExibirForm(true);
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao carregar dados do bibliotecário!" });
        }
    };

    const acaoCadastrar = async (e) => {
        e.preventDefault();
        
        try {
            let respostaAPI;
            
            if (editar) {
                // Chama a função PUT
                respostaAPI = await alterarBibliotecarioAPI(objeto);
            } else {
                // Chama a função POST
                respostaAPI = await cadastrarBibliotecarioAPI(objeto);
            }

            setAlerta({ status: respostaAPI.status, message: respostaAPI.message });
            
            // Se a operação foi bem sucedida
            if (respostaAPI.status === "success") {
                setObjeto(respostaAPI.objeto);
                setExibirForm(false); // Fecha o modal/formulário ao ter sucesso
                recuperaBibliotecarios(); // Atualiza a lista
            }
            
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao processar a requisição!" });
            console.error(err.message);
        }
    };

    useEffect(() => {
        recuperaBibliotecarios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };

    return (
        <BibliotecarioContext.Provider value={{
            exibirForm, alerta, listaObjetos, remover, objeto,
            editarObjeto, acaoCadastrar, handleChange, novoObjeto,
            setExibirForm, setAlerta }}>
            <Carregando carregando={carregando}>
                <BibliotecarioTabela />
            </Carregando>
            <BibliotecarioFormulario />
        </BibliotecarioContext.Provider>
    );
}

export default WithAuth(Bibliotecario);