import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GetUserInfo } from '@/services/users';
import { EvaluateResponse } from '@/utils/requestEvaluator';

export function useProtectRoute(redirectPath: string, allowedRoles?: string[]) {
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = await GetUserInfo(); // Obtener información del usuario
        
        // Verificar si el rol está en la lista de roles permitidos
        if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
          router.push(redirectPath); // Redirigir si el rol no está permitido
        }
      } catch (err: any) {
        const evaluatedResponse = EvaluateResponse(err.response); // Evaluar el error
        if (evaluatedResponse !== "") {
          router.push(evaluatedResponse); // Redirigir si hay un error
        } else {
          router.push(redirectPath); // Redirigir si no está autenticado
        }
      }
    };

    fetchUserData();
  }, [router, allowedRoles, redirectPath]);
}
