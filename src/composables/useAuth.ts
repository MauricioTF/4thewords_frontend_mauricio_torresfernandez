import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { login as authServiceLogin, type LoginPayload } from '@/services/auth';

// Composable para manejar la autenticación de usuarios
// Este composable proporciona funcionalidades para iniciar sesión, cerrar sesión y verificar el estado de autenticación
const isLoggedIn = ref(false);

// Función para verificar el estado de inicio de sesión
// Comprueba si hay un token en el localStorage y actualiza el estado reactivo
const checkLoginStatus = () => {
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token;
};

// Exporta el estado reactivo y las funciones para que puedan ser utilizadas en otros componentes
export function useAuth() {
  const router = useRouter();

// Función para iniciar sesión
// Toma un payload de tipo LoginPayload, llama al servicio de autenticación y guarda el token en el localStorage
// Actualiza el estado reactivo isLoggedIn a true si la autenticación es exitosa// Devuelve el token obtenido del backend
  const login = async (payload: LoginPayload): Promise<string> => {
    try {
      // Llama a la función del servicio para hacer la petición HTTP al backend
      const token = await authServiceLogin(payload);

      localStorage.setItem('token', token);
      isLoggedIn.value = true;

      return token;
    } catch (error) {
      throw error;
    }
  };

  // Función para cerrar sesión
  // Elimina el token del localStorage, actualiza el estado reactivo isLoggedIn
  // y redirige al usuario a la página de inicio de sesión
  const logout = () => {
    localStorage.removeItem('token');
    isLoggedIn.value = false;
    router.push('/login');
  };

  // Verifica el estado de inicio de sesión al montar el componente
  // y añade un listener para cambios en el localStorage
  // para actualizar el estado reactivo si el token cambia
  onMounted(() => {
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
  });

  // Limpia el listener al desmontar el componente
  // para evitar fugas de memoria y comportamientos inesperados
  onUnmounted(() => {
    window.removeEventListener('storage', checkLoginStatus);
  });

  return {
    isLoggedIn,
    login,
    logout,
    checkLoginStatus
  };
}
