import { describe, expect, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerService = new RegisterService({
      async findByEmail() {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordHashedCorrectly = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordHashedCorrectly).toBe(true)
  })
})
