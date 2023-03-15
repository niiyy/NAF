import { ExportMethod, ExportService } from '@decorators/Export'
import { Response, ResponseCB } from '@nx/types'
import { uuid } from '@shared/utils/random'
import { LG } from '@utils/logger'

@ExportService('Event')
class _EventsService {
  private events: Map<string, () => void>
  constructor() {
    this.events = new Map()
  }

  @ExportMethod()
  public emitServerEvent(
    eventName: string,
    callback: (...args: unknown[]) => void,
    ...args: unknown[]
  ): void {
    if (!callback || typeof callback !== 'function') {
      return LG.error(
        `can't trigger event: ^2[${eventName}] ^9callback most be provided !`,
      )
    }

    if (!this.events.has(eventName)) {
      this.events.set(eventName, callback)
    }

    const randomID = uuid()

    const respEventName = `${eventName}::NX::${randomID}`

    const handleRespEvent = (...args: unknown[]) => {
      callback(...args)
      removeEventListener(respEventName, handleRespEvent)
    }

    emitNet(eventName, respEventName, ...args)
    onNet(respEventName, handleRespEvent)
  }

  public emitNuiEvent<T = unknown>(
    { app, method, data }: { app: string; method: string; data?: T },
    useCursor = false,
  ): void {
    SetNuiFocus(useCursor, useCursor)
    SendNuiMessage(
      JSON.stringify({
        app,
        method,
        data,
      }),
    )
  }

  public onNuiEvent<T = unknown>(
    eventName: string,
    handler: (data: T, cb?: (res: Response) => void) => void,
  ): void {
    RegisterNuiCallbackType(eventName)
    on(`__cfx_nui:${eventName}`, (data: T, cb?: ResponseCB) => {
      return handler(data, cb)
    })
  }
}

const EventsService = new _EventsService()
export { EventsService }