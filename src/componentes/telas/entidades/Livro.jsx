import { useState, useEffect } from "react";
import {
  getLivrosAPI,
  getLivroPorCodigoAPI,
  deleteLivroPorCodigoAPI,
  cadastrarLivroAPI,
  alterarLivroAPI
} from '../../../servicos/LivroServico';

import Carregando from "../../reutilizaveis/Carregando";
import LivroContext from "./LivroContext";
import LivroTabela from "./LivroTabela";
import LivroFormulario from "./LivroFormulario";

import WithAuth from "../../../seguranca/WithAuth";

function Livro() {
    const estadoInicial = {
        id_livro: "",
        nome: "",
        cpf: "",
        data_nascimento: "",
        multa: 0.0
    };

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState(estadoInicial);
    const [carregando, setCarregando] = useState(true);

    const recuperaLivros = async () => {
        setCarregando(true);
        setListaObjetos(await getLivrosAPI());
        setCarregando(false);
    };

    const remover = async (id) => {
        if (window.confirm('Deseja remover este livro?')) {
            let respostaAPI = await deleteLivroPorCodigoAPI(id);
            setAlerta({ status: respostaAPI.status, message: respostaAPI.message });
            recuperaLivros();
        }
    };

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto(estadoInicial);
        setExibirForm(true);
    };

    const editarObjeto = async (id) => {
        const dados = await getLivroPorCodigoAPI(id);
        setObjeto(dados);
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    };

    const acaoCadastrar = async (e) => {
        e.preventDefault();
                
        try {
            let respostaAPI;
                    
            if (editar) {
                respostaAPI = await alterarLivroAPI(objeto);
            } else {
                respostaAPI = await cadastrarLivroAPI(objeto);
            }
        
            setAlerta({ status: respostaAPI.status, message: respostaAPI.message });
                    
            if (respostaAPI.status === "success") {
                setObjeto(respostaAPI.objeto);
                setExibirForm(false);
                recuperaLivros();
            }
                    
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao processar a requisição!" });
            console.error(err.message);
        }
    };

    useEffect(() => {
        recuperaLivros();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };

    return (
        <LivroContext.Provider value={{
            exibirForm, alerta, listaObjetos, remover, objeto,
            editarObjeto, acaoCadastrar, handleChange, novoObjeto,
            setExibirForm}}>
            <Carregando carregando={carregando}>
                <LivroTabela />
                <LivroFormulario />
            </Carregando>
        </LivroContext.Provider>
    );
}

export default WithAuth(Livro);