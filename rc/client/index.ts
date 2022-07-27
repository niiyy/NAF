import {
  Events,
  Input,
  Misc,
  Object,
  Vehicle,
  Player,
  Discord,
} from './services'
import './controllers'

class Client {
  Vehicles: typeof Vehicle
  Objects: typeof Object
  Misc: typeof Misc
  EventsService: typeof Events
  Player: typeof Player
  Input: typeof Input
  Discord: typeof Discord
  constructor() {
    this.EventsService = Events
    this.Objects = Object
    this.Vehicles = Vehicle
    this.Misc = Misc
    this.Player = Player
    this.Input = Input
    this.Discord = Discord
  }
}

const client = new Client()

globalThis.exports('useClient', () => {
  return {
    Player: {
      HasLoaded: client.Player.hasLoaded.bind(client.Player),
      GetData: client.Player.getPlayerData.bind(client.Player),
      SetData: client.Player.setPlayerData.bind(client.Player),
    },
    Vehicles: {
      Create: client.Vehicles.create.bind(client.Vehicles),
      Random: client.Vehicles.random.bind(client.Vehicles),
      Repair: client.Vehicles.repair.bind(client.Vehicles),
      Delete: client.Vehicles.delete.bind(client.Vehicles),
    },
    Objects: {
      Create: client.Objects.create.bind(client.Objects),
      Delete: client.Objects.delete.bind(client.Objects),
    },
    Input: {
      Create: client.Input.create.bind(client.Input),
      IsActive: client.Input.isActive.bind(client.Input),
      Destroy: client.Input.destroy.bind(client.Input),
    },
    Misc: {
      DrawText3D: client.Misc.drawText3D.bind(client.Misc),
      RequestAnim: client.Misc.requestAnim.bind(client.Misc),
      CreatePed: client.Misc.createPed.bind(client.Misc),
      EmitServerEvent: client.EventsService.emitServerEvent.bind(
        client.EventsService
      ),
    },
  }
})
