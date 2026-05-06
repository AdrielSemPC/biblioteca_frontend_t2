export const getClientesAPI = async () => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/clientes`,
        {
            method:"GET",
            headers:{"Content-Type": "application/json"}
        }
    )
    const d = await r.json();
    return d;
}

export const getClientePorCodigoAPI = async codigo => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/clientes/${codigo}`,
        {
            method:"GET",
            headers:{"Content-Type": "application/json"}
        }
    )
    const d = await r.json();
    return d;
}   

export const deleteClientePorCodigoAPI = async codigo => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/clientes/${codigo}`,
        {
            method:"DELETE",
            headers:{"Content-Type": "application/json"}
        }
    )
    const d = await r.json();
    return d;
}  

export const cadastrarClienteAPI = async (objeto) => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/clientes/`,
        {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(objeto)
        }
    )
    const d = await r.json();
    return d;
}

export const alterarClienteAPI = async (objeto) => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/clientes/${objeto.id_cliente}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objeto)
        }
    )
    const d = await r.json();
    return d;
}