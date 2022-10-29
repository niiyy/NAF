import PlayerService from '@player/player.service'
import { logger } from '@utils/logger'

class _CommandsServices {
  constructor() {}

  public async addCommand(
    name: string,
    cb: (source: number, args: string[]) => void,
    authPermissions: string[] = ['user']
  ) {
    if (!name || !cb) {
      logger.warn(
        "Couldn't register a command name or function was not provided"
      )
      return
    }

    RegisterCommand(
      name,
      async (source: number, args: any[]): Promise<void> => {
        const nxPlayer = await PlayerService.getPlayer(source)

        if (nxPlayer) {
          if (!authPermissions.includes(nxPlayer.GetPermissions())) {
            DropPlayer(
              source as unknown as string,
              "You don't have permissions to execute this command !"
            )
            logger.warn(
              `[${nxPlayer.GetName()}] tried to execute command [${name}] without having permissions.`
            )
            return
          }

          cb(source, args)
        }
      },
      false
    )
  }
}

export default new _CommandsServices()
