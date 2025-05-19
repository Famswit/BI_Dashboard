"use client"

import { createContext, useContext, useState } from "react"


interface AuthContextType {
  isLoggedIn: boolean
  keepLoggedIn: boolean
  login: (keepLoggedIn: boolean) => void
  logout: () => void
}


const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  keepLoggedIn: false,
  login: () => {},
  logout: () => {},
})
 const isClient = typeof window != "undefined"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(isClient ? localStorage?.getItem?.("isLoggedIn") === "true" : false) 
  const [keepLoggedIn, setKeepLoggedIn] = useState(isClient ? localStorage?.getItem?.("keepLoggedIn") === "true" : false) 

  // localStorage save
  const login = (keepLoggedIn: boolean) => {
    setIsLoggedIn(true)
    setKeepLoggedIn(keepLoggedIn)
  if(keepLoggedIn){
    localStorage.setItem("keepLoggedIn", "true")
  }
      localStorage.setItem("isLoggedIn", "true")
  }

  // Clean up
  const logout = () => {
    setIsLoggedIn(false)
    setKeepLoggedIn(false)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("keepLoggedIn")
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, keepLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context as AuthContextType
}