import { useCallback } from 'react'
import logout from '@/utility/logout'

interface LogoutHook {
  handleLogout: () => void
}

const useLogout = (): LogoutHook => {
  const handleLogout = useCallback(() => {
    logout()
      .then(response => {
        if (response === 204) {
          window.localStorage.removeItem('user')
          window.location.reload()
        }
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return { handleLogout }
}

export default useLogout
