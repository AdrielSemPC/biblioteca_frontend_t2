import { getToken } from '../seguranca/Autenticacao';

export const getUsuariosAPI = async () => {
    const r = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/usuarios`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": getToken()
            }
        }
    );

    if (!r.ok) {
        throw new Error(`Erro HTTP ${r.status}`);
    }

    return await r.json();
}

export const getUsuarioPorEmailAPI = async email => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuarios/${email}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": getToken()
            }
        }
    );

    const d = await r.json();
    if (!r.ok) {
        throw new Error(d.message || `Erro HTTP ${r.status}`);
    }
    return d;
}

export const deleteUsuarioPorEmailAPI = async email => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuarios/${email}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": getToken()
            }
        }
    );
    const d = await r.json();
    if (!r.ok) {
        throw new Error(d.message || `Erro HTTP ${r.status}`);
    }
    return d;
}

export const cadastrarUsuarioAPI = async (objeto) => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuarios`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objeto)
        }
    );
    const d = await r.json();
    if (!r.ok) {
        throw new Error(d.message || `Erro HTTP ${r.status}`);
    }
    return d;
}

export const alterarUsuarioAPI = async (objeto, emailOriginal) => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuarios/${emailOriginal || objeto.email}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
            body: JSON.stringify(objeto)
        }
    );
    const d = await r.json();
    if (!r.ok) {
        throw new Error(d.message || `Erro HTTP ${r.status}`);
    }
    return d;
}
