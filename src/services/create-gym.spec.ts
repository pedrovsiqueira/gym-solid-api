import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymService } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let createGymService: CreateGymService

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    createGymService = new CreateGymService(gymsRepository)
  })

  it('should create a gym successfully', async () => {
    const { gym } = await createGymService.execute({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -16.7059303,
      longitude: -49.2724823,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
