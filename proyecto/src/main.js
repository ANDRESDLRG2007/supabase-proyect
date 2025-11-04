import './style.css'

import { mostrarRegistro } from './register.js';
import { mostrarLogin } from './login.js';
import { mostrarMVP } from './mvp.js';
import { mostrarUser } from "./user.js";
import { mostrarAdmin } from "./admin.js";
import { supabase } from "./supabase.js";

// Funciones de navegación disponibles para ser llamadas
const routes = {
    'registro': mostrarRegistro,
    'login': mostrarLogin,
    'actividades': mostrarMVP,
    'usuarios': mostrarUser,
    'admin': mostrarAdmin
};

async function CerrarSesion() {
    await supabase.auth.signOut();
    // Después de cerrar sesión, recargar el menú y mostrar el registro
    await cargarMenu(); 
    mostrarLogin(); 
}

// 🧩 Control de navegación según el estado del usuario
export async function cargarMenu() {
    const menu = document.getElementById("menu");
    const { data: { user } } = await supabase.auth.getUser();

    // 🔹 Si NO hay usuario logueado
    if (!user) {
        menu.innerHTML = `
            <div>
                <button data-action="registro">Registrarse</button>
                <button data-action="login">Iniciar sesión</button>
            </div>
        `;
    } else {
        // 🔹 CAMBIA ESTE CORREO POR EL TUYO PARA SER ADMIN
        const esAdmin = user.email === 'cristian.rueg@uniagustiniana.edu.co';
        
        menu.innerHTML = `
            <div>
                <button data-action="actividades">Actividades</button>
                <button data-action="usuarios">Usuarios</button>
                ${esAdmin ? '<button data-action="admin">Panel Admin</button>' : ''}
                <button data-action="logout">Cerrar sesión</button>
            </div>
        `;
    }

    // 🌟 ASIGNACIÓN DE EVENT LISTENERS
    menu.querySelectorAll('button').forEach(button => {
        const action = button.getAttribute('data-action');
        
        if (action === 'logout') {
            button.addEventListener('click', CerrarSesion);
        } else if (routes[action]) {
            button.addEventListener('click', routes[action]);
        }
    });
}

// 🌀 Llamamos la función apenas cargue la página
document.addEventListener("DOMContentLoaded", cargarMenu);