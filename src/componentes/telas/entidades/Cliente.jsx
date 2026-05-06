import { useState, useEffect } from "react";
import {
  getClientesAPI,
  getClientePorCodigoAPI,
  deleteClientePorCodigoAPI,
  cadastrarClienteAPI,
  alterarClienteAPI
} from '../../../servicos/ClienteServico';

import Carregando from "../../reutilizaveis/Carregando";
import ClienteContext from "./ClienteContext";
import ClienteTabela from "./ClienteTabela";
import ClienteFormulario from "./ClienteFormulario";

function Cliente() {
    const estadoInicial = {
        id_cliente: "",
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

    const recuperaClientes = async () => {
        setCarregando(true);
        setListaObjetos(await getClientesAPI());
        setCarregando(false);
    };

    const remover = async (id) => {
        if (window.confirm('Deseja remover este cliente?')) {
            let respostaAPI = await deleteClientePorCodigoAPI(id);
            setAlerta({ status: respostaAPI.status, message: respostaAPI.message });
            recuperaClientes();
        }
    };

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto(estadoInicial);
        setExibirForm(true);
    };

    const editarObjeto = async (id) => {
        const dados = await getClientePorCodigoAPI(id);
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
                respostaAPI = await alterarClienteAPI(objeto);
            } else {
                respostaAPI = await cadastrarClienteAPI(objeto);
            }
    
            setAlerta({ status: respostaAPI.status, message: respostaAPI.message });
                
            if (respostaAPI.status === "success") {
                setObjeto(respostaAPI.objeto);
                setExibirForm(false);
                recuperaClientes();
            }
                
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao processar a requisição!" });
            console.error(err.message);
        }
    };

    useEffect(() => {
        recuperaClientes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };

    return (
        <ClienteContext.Provider value={{
            exibirForm, alerta, listaObjetos, remover, objeto,
            editarObjeto, acaoCadastrar, handleChange, novoObjeto,
            setExibirForm}}>
            <Carregando carregando={carregando}>
                <ClienteTabela />
                <ClienteFormulario />
            </Carregando>
        </ClienteContext.Provider>
    );
}

export default Cliente;