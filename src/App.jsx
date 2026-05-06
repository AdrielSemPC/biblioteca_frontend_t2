import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/cjs/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Menu from "./componentes/Menu";
import Home from "./componentes/telas/Home";
import Bibliotecario from "./componentes/telas/entidades/Bibliotecario";
import Cliente from "./componentes/telas/entidades/Cliente";
import Livro from "./componentes/telas/entidades/Livro";
import Emprestimo from "./componentes/telas/entidades/Emprestimo";
import Sobre from "./componentes/telas/Sobre";

const r = createBrowserRouter([
    {
        path:"/",
        element:<Menu/>,
        children:[
            {
                index: true, element: <Home/>,
            },
            {
                path: "/bibliotecarios", element: <Bibliotecario/>,
            },
            {
                path: "/clientes", element: <Cliente/>,
            },
            {
                path: "/livros", element: <Livro/>,
            },
            {
                path: "/emprestimos", element: <Emprestimo/>,
            },
            {
                path: "/sobre", element: <Sobre/>,
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