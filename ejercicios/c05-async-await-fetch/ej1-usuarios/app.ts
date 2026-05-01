//Estructura del usuario
interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

//Función para obtener lista de usuarios desde API
async function obtenerUsuarios(): Promise<Usuario[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
        throw new Error (`HTTP ${response.status}`);
    }

    const usuarios: Usuario[] = await response.json();
    return usuarios;
    }

    catch (error) {
        console.error('Error al obtener usuarios: ', error);
        return [];
    }
}

//Función para mostrar los nombres y emails de usuarios obtenidos
async function mostrarUsuarios() {
    const listaUsuarios = await obtenerUsuarios();
    listaUsuarios.forEach(usuario => {
        console.log(`Nombre: ${usuario.name}`);
        console.log(`Email: ${usuario.email}`);
        console.log(`------------------------`);
    });
}

//Llamada a la función para mostrar
mostrarUsuarios();