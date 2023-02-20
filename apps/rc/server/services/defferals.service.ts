import { CodeColors } from '@nx/types'
import { PlayerService } from '@player/player.service'
import { PlayerUtils } from '@player/player.utils'
import { Utils } from '@shared/utils/misc'
import { LG } from '@utils/logger'
import { BansService } from '../bans/bans.service'

class _DeferralsService {
  private readonly utils: typeof Utils
  private readonly playerUtils: typeof PlayerUtils
  private readonly bansService: typeof BansService
  constructor() {
    this.utils = Utils
    this.playerUtils = PlayerUtils
    this.bansService = BansService
  }

  public async validatePlayer({
    source,
    playerName,
    identifiers,
    deferrals,
  }: {
    source: number
    playerName: string
    identifiers: string[]
    deferrals: any
  }) {
    deferrals.defer()
    deferrals.update(`${playerName} wait while checking your license`)

    const license = await this.playerUtils.getPlayerIdentifier(
      identifiers,
      'license'
    )

    if (!license) return deferrals.done('Not valid license')

    const isBanned = await this.bansService.isBanned(license)

    if (isBanned) {
      const unban = await this.bansService.checkUnban(license)

      if (!unban) {
        deferrals.done(
          `you are banned from this server.\nReason: ${
            isBanned.reason
          }.\nBan Date: ${this.utils.parseDate(
            isBanned.date
          )}.\nExpiration: ${this.utils.parseDate(isBanned.expire)}`
        )
        return
      }
    }

    try {
      await PlayerService.doesPlayerExist(license)

      deferrals.done()
      LG.info(`connecting player with license ${CodeColors.ORANGE}[${license}]`)
    } catch ({ name }) {
      deferrals.done(
        `Player already connected with the same license [${license}]`
      )
      LG.warn(
        `Player: [${playerName}] tried to connect with the same license as: ${CodeColors.ORANGE}[${name}] | license: ${CodeColors.ORANGE}${license}`
      )
    }
  }
}

const DeferralsService = new _DeferralsService()
export { DeferralsService }