import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsService } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let getUserMetricsService: GetUserMetricsService

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    getUserMetricsService = new GetUserMetricsService(checkInsRepository)
  })

  it('should be able fetch check ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: `gym-01`,
      user_id: 'user-01',
    })

    const { checkInsCount } = await getUserMetricsService.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(1)
  })
})
