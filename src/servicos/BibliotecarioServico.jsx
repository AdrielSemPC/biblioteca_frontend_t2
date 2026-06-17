import { getToken } from '../seguranca/Autenticacao';

export const getBibliotecariosAPI = async () => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/bibliotecarios`,
        {
            method:"GET",
            headers:{"Content-Type": "application/json", "authorization": getToken()}
        }
    )
    const d = await r.json();
    return d;
}

export const getBibliotecarioPorCodigoAPI = async codigo => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/bibliotecarios/${codigo}`,
        {
            method:"GET",
            headers:{"Content-Type": "application/json", "authorization": getToken()}
        }
    )
    const d = await r.json();
    return d;
}   

export const deleteBibliotecarioPorCodigoAPI = async codigo => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/bibliotecarios/${codigo}`,
        {
            method:"DELETE",
            headers:{"Content-Type": "application/json", "authorization": getToken()}
        }
    )
    const d = await r.json();
    return d;
}  

export const cadastrarBibliotecarioAPI = async (objeto) => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/bibliotecarios`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
            body: JSON.stringify(objeto)
        }
    )
    const d = await r.json();
    return d;
}

export const alterarBibliotecarioAPI = async (objeto) => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/bibliotecarios/${objeto.id_bibliotecario}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
            body: JSON.stringify(objeto)
        }
    )
    const d = await r.json();
    return d;
}