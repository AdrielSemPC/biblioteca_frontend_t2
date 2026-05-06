import { useState, useEffect } from "react";
import {
  getEmprestimosAPI,
  getEmprestimoPorCodigoAPI,
  deleteEmprestimoPorCodigoAPI,
  cadastrarEmprestimoAPI,
  finalizarEmprestimoAPI,
  alterarEmprestimoAPI
} from '../../../servicos/EmprestimoServico';
import { getClientesAPI } from '../../../servicos/ClienteServico';
import { getBibliotecariosAPI } from '../../../servicos/BibliotecarioServico';
import { getLivrosAPI } from '../../../servicos/LivroServico';

import Carregando from "../../reutilizaveis/Carregando";
import EmprestimoContext from "./EmprestimoContext";
import EmprestimoTabela from "./EmprestimoTabela";
import EmprestimoFormulario from "./EmprestimoFormulario";

function Emprestimo() {
    const estadoInicial = {
        id_emprestimo: 0, // Padronizado para id_emprestimo
        id_cliente: "",
        id_livro: "",
        id_bibliotecario: "",
        status: "ATIVO",
        data_inicio: "",
        data_fim: "",
        data_devolucao: null
    };

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState(estadoInicial);
    const [carregando, setCarregando] = useState(true);
    const [clientes, setClientes] = useState([]);
    const [livros, setLivros] = useState([]);
    const [bibliotecarios, setBibliotecarios] = useState([]);

    useEffect(() => {
        async function carregarDadosIniciais() {
            try {
                const [listaClientes, listaLivros, listaBiblio] = await Promise.all([
                    getClientesAPI(),
                    getLivrosAPI(),
                    getBibliotecariosAPI()
                ]);
                setClientes(listaClientes);
                setLivros(listaLivros);
                setBibliotecarios(listaBiblio);
                await recuperaEmprestimos();
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao carregar dados auxiliares." });
            } finally {
                setCarregando(false);
            }
        }
        carregarDadosIniciais();
    }, []);

    const recuperaEmprestimos = async () => {
        try {
            const dados = await getEmprestimosAPI();
            setListaObjetos(dados);
        } catch (err) {
            setAlerta({ status: "error", message: err.message || err });
        }
    };

    const remover = async (id) => {
        if (window.confirm('Deseja remover este empréstimo?')) {
            try {
                const respostaAPI = await deleteEmprestimoPorCodigoAPI(id);
                setAlerta({ status: "success", message: respostaAPI.message });
                await recuperaEmprestimos();
            } catch (err) {
                setAlerta({ status: "error", message: err.message || err });
            }
        }
    };

    const finalizar = async (id) => {
        try {
            const respostaAPI = await finalizarEmprestimoAPI(id);
            setAlerta({ status: respostaAPI.status, message: respostaAPI.message });
            await carregarDadosIniciais(); // Recarrega para atualizar multas e status
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao finalizar: " + (err.message || err) });
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
            const dados = await getEmprestimoPorCodigoAPI(id);
            setObjeto(dados);
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setExibirForm(true);
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao buscar dados do empréstimo." });
        }
    };

    const acaoCadastrar = async (e) => {
        e.preventDefault();

        // Conversão de tipos para garantir integridade no banco
        const objetoParaEnvio = {
            ...objeto,
            id_cliente: Number(objeto.id_cliente),
            id_livro: Number(objeto.id_livro),
            id_bibliotecario: Number(objeto.id_bibliotecario)
        };

        try {
            let respostaAPI;
            
            if (editar) {
                respostaAPI = await alterarEmprestimoAPI(objetoParaEnvio);
            } else {
                respostaAPI = await cadastrarEmprestimoAPI(objetoParaEnvio);
            }

            setAlerta({ status: respostaAPI.status, message: respostaAPI.message });

            if (respostaAPI.status === "success") {
                setExibirForm(false);
                await recuperaEmprestimos();
            }
            
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao processar: " + (err.message || err) });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };

    return (
        <EmprestimoContext.Provider value={{
                exibirForm, alerta, listaObjetos, remover, objeto,
                editarObjeto, acaoCadastrar, handleChange, novoObjeto,
                setExibirForm, clientes, livros, bibliotecarios, finalizar
        }}>
            <Carregando carregando={carregando}>
                <EmprestimoTabela />
            </Carregando>
            <EmprestimoFormulario />
        </EmprestimoContext.Provider>
    );
}

export default Emprestimo;
