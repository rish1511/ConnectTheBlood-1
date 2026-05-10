import { useState } from 'react'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import FormError from '../../../components/ui/FormError'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }
    setError('')
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
      />
      <FormError message={error} />
      <Button type="submit">Login</Button>
    </form>
  )
}
