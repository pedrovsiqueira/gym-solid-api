import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let registerService: RegisterService

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerService = new RegisterService(usersRepository)
  })

  it('should create a user successfully', async () => {
    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
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

  it('should not be able to create user with existing email', async () => {
    const email = 'johndoe@example.com'

    await registerService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerService.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
