import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let checkInService: CheckInService
let gymsRepository: InMemoryGymsRepository

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    checkInService = new CheckInService(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: -16.7059303,
      longitude: -49.2724823,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check-in', async () => {
    const { checkIn } = await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.7059303,
      userLongitude: -49.2724823248,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.7059303,
      userLongitude: -49.2724823248,
    })

    await expect(() =>
      checkInService.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -16.7059303,
        userLongitude: -49.2724823248,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check-in twice on separate days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.7059303,
      userLongitude: -49.2724823248,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.7059303,
      userLongitude: -49.2724823248,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-16.7059303),
      longitude: new Decimal(-49.2724823),
    })

    await expect(() =>
      checkInService.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -16.7038327,
        userLongitude: -48.2749333,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
