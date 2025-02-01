import React from "react"; // Importa biblioteca de React para realizar funciones de la misma
import '../styles/Home.css'; // Importa un archivo .css de la carpeta styles

function Home() { // Define una función llamada Home
    return ( 
        <div className="home-page">
            <p>Bienvenido</p> 
        </div>
    );
}
// Este tipo de funciones se llaman componentes funcionales
export default Home; // Exporta el componente Home para que pueda ser importado y utilizado en otros archivos