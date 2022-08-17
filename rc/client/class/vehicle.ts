import { RespCB, RespT } from '../../../types/main'

class _Vehicle {
  private readonly MAXIMUM_COLORS_VEHICLE: number
  private readonly VEHICLES_ARRAY: ReadonlyArray<string>
  constructor() {
    this.MAXIMUM_COLORS_VEHICLE = 150
    this.VEHICLES_ARRAY = [
      'asbo',
      'blista',
      'panto',
      'sentinel',
      'jackal',
      'akuma',
      'bf400',
      'dominator',
      'imperator',
      'balle',
      'mesa',
    ]
  }

  public create(model: string | number, cb: RespCB): number | void {
    if (!model || !IsModelAVehicle(model)) {
      cb?.({
        status: 'error',
        message: 'not valid params to create vehicle.',
      })
      return
    }

    RequestModel(model)
    const i = setInterval(() => {
      if (HasModelLoaded(model)) {
        const playerPed = PlayerPedId()
        const pos = GetEntityCoords(playerPed, true)
        const vehicle = CreateVehicle(
          model,
          pos[0],
          pos[1],
          pos[2],
          GetEntityHeading(playerPed),
          true,
          false
        )
        SetPedIntoVehicle(playerPed, vehicle, -1)

        SetEntityAsNoLongerNeeded(vehicle)
        SetModelAsNoLongerNeeded(model)

        clearInterval(i)

        cb?.({
          status: 'succes',
          data: vehicle,
        })
      }
    }, 500)
  }

  public delete(cb?: RespCB): void {
    const playerPed = PlayerPedId()
    if (IsPedInAnyVehicle(playerPed, true)) {
      const vehicle = GetVehiclePedIsIn(playerPed, true)
      SetEntityAsMissionEntity(vehicle, false, true)
      DeleteVehicle(vehicle)

      cb?.({
        status: 'succes',
        message: 'vehicle deleted.',
      })
    }
  }

  public repair(vehicle?: number): void {
    const playerPed = PlayerPedId()
    if (!vehicle || !IsEntityAVehicle(vehicle)) {
      const vehicle: number = GetVehiclePedIsIn(playerPed, true)
      if (vehicle) {
        SetVehicleFixed(vehicle)
        SetVehicleDeformationFixed(vehicle)
        SetVehicleUndriveable(vehicle, false)
        SetVehicleDirtLevel(vehicle, 0.0)
        WashDecalsFromVehicle(vehicle, 1.0)
      }
      return
    }
    SetVehicleFixed(vehicle)
    SetVehicleDeformationFixed(vehicle)
    SetVehicleUndriveable(vehicle, false)
  }

  public random(): void {
    const randomCar =
      this.VEHICLES_ARRAY[
        Math.floor(Math.random() * this.VEHICLES_ARRAY.length)
      ]
    this.create(randomCar, (resp: RespT) => {
      if (resp.status !== 'succes') return
      const randomColor = Math.floor(
        Math.random() * this.MAXIMUM_COLORS_VEHICLE
      )
      const randomColor2 = Math.floor(
        Math.random() * this.MAXIMUM_COLORS_VEHICLE
      )
      SetVehicleColours(resp.data, randomColor, randomColor2)
    })
  }
}

const VehicleManager = new _Vehicle()
export default VehicleManager
