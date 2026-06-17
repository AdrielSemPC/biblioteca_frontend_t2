import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/cjs/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MenuPublico from "./componentes/MenuPublico";
import MenuPrivado from "./componentes/MenuPrivado";
import Home from "./componentes/telas/Home";
import Bibliotecario from "./componentes/telas/entidades/Bibliotecario";
import Cliente from "./componentes/telas/entidades/Cliente";
import Livro from "./componentes/telas/entidades/Livro";
import Emprestimo from "./componentes/telas/entidades/Emprestimo";
import Usuario from "./componentes/telas/entidades/Usuario";
import Sobre from "./componentes/telas/Sobre";
import Login from "./componentes/telas/autenticacao/Login";

const r = createBrowserRouter([
    {
        path:"/",
        element:<MenuPublico/>,
        children:[
            {
                index: true, element: <Home/>,
            },
            {
                path: "bibliotecarios", element: <Bibliotecario/>,
            },
            {
                path: "clientes", element: <Cliente/>,
            },
            {
                path: "livros", element: <Livro/>,
            },
            {
                path: "emprestimos", element: <Emprestimo/>,
            },
            {
                path: "sobre", element: <Sobre/>,
            },
            {
                path: "login", element: <Login/>,
            },
        ]
    },
    {
        path: "/privado",
        element: <MenuPrivado/>,
        children:[
            {
                index: true, element: <Home/>,
            },
            {
                path: "bibliotecarios", element: <Bibliotecario/>,
            },
            {
                path: "clientes", element: <Cliente/>,
            },
            {
                path: "livros", element: <Livro/>,
            },
            {
                path: "emprestimos", element: <Emprestimo/>,
            },
            {
                path: "usuarios", element: <Usuario/>,
            },
            {
                path: "sobre", element: <Sobre/>,
            },
        ]
    }
])

function App(){
    return(
        <RouterProvider router={r}/>
    );
}

export default App;