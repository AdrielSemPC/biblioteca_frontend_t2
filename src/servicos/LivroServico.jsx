export const getLivrosAPI = async () => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/livros`,
        {
            method:"GET",
            headers:{"Content-Type": "application/json"}
        }
    )
    const d = await r.json();
    return d;
}

export const getLivroPorCodigoAPI = async codigo => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/livros/${codigo}`,
        {
            method:"GET",
            headers:{"Content-Type": "application/json"}
        }
    )
    const d = await r.json();
    return d;
}   

export const deleteLivroPorCodigoAPI = async codigo => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/livros/${codigo}`,
        {
            method:"DELETE",
            headers:{"Content-Type": "application/json"}
        }
    )
    const d = await r.json();
    return d;
}  

export const cadastrarLivroAPI = async (objeto) => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/livros/`,
        {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(objeto)
        }
    )
    const d = await r.json();
    return d;
}

export const alterarLivroAPI = async (objeto) => {
    const r = await fetch(`${process.env.REACT_APP_ENDERECO_API}/livros/${objeto.id_livro}`,
        {
            method: "PUT",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(objeto)
        }
    )
    const d = await r.json();
    return d;
}