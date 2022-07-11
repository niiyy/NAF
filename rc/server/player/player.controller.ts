import { PlayerEventsE } from '../../types/events'
import DeferralsService from '../services/defferals.service'
import PlayerService from './player.service'
import _PlayerService from './player.service'

onNet(PlayerEventsE.NEW_PLAYER, () => {
  const source = globalThis.source
  _PlayerService.newPlayer(getPlayerIdentifiers(source.toString()), source)
})

on(
  'playerConnecting',
  (playerName: string, reject: Function, deferrals: any): void => {
    const source = globalThis.source
    DeferralsService.validatePlayer(
      source,
      playerName,
      getPlayerIdentifiers(source.toString()),
      deferrals,
      reject
    )
  }
)

on('playerDropped', (reason: string): void => {
  const source = globalThis.source
  _PlayerService.playerDropped(reason, source)
})

onNet(
  PlayerEventsE.UPDATE_COORDS,
  async (coords: number[], heading: number) => {
    const source = globalThis.source
    const naPlayer = await _PlayerService.getPlayer(source)
    if (naPlayer) {
      naPlayer.SetCoords(coords[0], coords[1], coords[2], heading)
    }
  }
)

onNet(
  PlayerEventsE.UPDATE_STATUS,
  async ({ thirst, hunger }: { thirst: number; hunger: number }) => {
    const source = globalThis.source
    const naPlayer = await PlayerService.getPlayer(source)
    if (naPlayer) {
      naPlayer.SetHunger(hunger)
      naPlayer.SetThirst(thirst)
    }
  }
)
