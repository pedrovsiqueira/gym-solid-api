import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let checkInService: CheckInService

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    checkInService = new CheckInService(checkInsRepository)
  })

  it('should be able to check-in', async () => {
    const { checkIn } = await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
