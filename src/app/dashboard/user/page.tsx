"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"

type Rol={
   id_role: number
  name: string
}

export default function User() {
 
 const [roles, setRoles] = useState<Rol[]>([])
 const [selectedRole, setSelectedRole] = useState<string>("")
 const [Name, setName]=useState("")
 const [LastName, setLastName]= useState("")
 const [Gmail,setGmail]=useState("")
 const [password, setPassword] = useState("") // contraseña original
const [passwordConfirm, setPasswordConfirm] = useState("") // confirmación

 useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch("/api/roles")
        const data = await res.json()
        setRoles(data)
      } catch (err) {
        toast.error(`Error cargando roles: ${err}`)
      }
    }

    fetchRoles()
  }, [])


   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault()
    if (password !== passwordConfirm) {
  toast.warning("Las contraseñas no coinciden")
  return
}



    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({
        Name,
        LastName,
        Gmail,
        password: passwordConfirm,
        role: selectedRole,
      }),
      })

      const result = await res.json()
      if (res.ok) {
      toast.success("Usuario registrado correctamente")
      
        setName("")
        setLastName("")
        setGmail("")
        setPasswordConfirm("")
        setPassword("")
        setSelectedRole("")
      } else {
       toast.error(result.message || "Error al crear usuario")

      }
    } catch (err) {
      console.error("Error:", err)
      alert("Error al conectar con el servidor")
    }
   }

  return (
    
        
         <div className="flex items-center justify-center min-h-[calc(100vh-var(--header-height))] px-4">
    <Card className="w-full max-w-sm">
      <CardHeader>
          <CardTitle className="text-center w-full">Registro</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" type="text" value={Name} onChange={(e)=>setName(e.target.value)} placeholder="Nombre" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lasname">Apellido</Label>
              <Input id="lasname" type="text" placeholder="Apellido" value={LastName} onChange={(e)=>setLastName(e.target.value)} required />
            </div>

            <div className="grid gap-2 col-span-2">
              <Label htmlFor="username">Gmail</Label>
              <Input id="email" type="email" placeholder="ejemplo@gmail.com" value={Gmail} onChange={(e)=>setGmail(e.target.value)} required />
            </div>

            <div className="grid gap-2 col-span-2">
              <Label htmlFor="role">Rol</Label>
              <select
                id="role"
                name="role"
                 value={selectedRole}
                 onChange={e => setSelectedRole(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
                required
              >
               <option value="">Selecciona un rol</option>
                      {roles.map((rol) => (
                        <option key={rol.id_role} value={rol.id_role}>
                          {rol.name}
                        </option>
                      ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="password1">Contraseña</Label>
              <Input id="password1" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirma tu contraseña</Label>
              <Input id="password" type="password" value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)} required />
            </div>
          </div>
          <Button type="submit" className="w-full">
          Registrar
        </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        
      </CardFooter>
    </Card>
  </div>
             
         
        
    
  )
}
