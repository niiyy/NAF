class _PlayerUtils {
  private readonly bloodTypes: Record<string, string>
  constructor() {
    this.bloodTypes = {
      'A+': '0-38',
      'A-': '39-73',
      'B+': '74-80',
      'B-': '81-86',
      'AB+': '87-92',
      'AB-': '93-96',
      'O+': '97-99',
      'O-': '100',
    }
  }

  public async getPlayerIdentifier(
    identifiers: string[],
    identifierToFind: string
  ): Promise<string | false> {
    identifiers.forEach((identifier) => {
      let [identifierKey, identifierValue] = identifier.split(':')
      if (identifierKey === identifierToFind) {
        return identifierValue
      }
    })

    return false
  }

  public generateBloodType(): string {
    const randomNumber = Math.trunc(Math.random() * 100)
    for (const blood in this.bloodTypes) {
      const [bloodMin, bloodMax] = this.bloodTypes[blood].split('-')

      if (randomNumber >= ~~bloodMin && randomNumber <= ~~bloodMax) {
        return blood
      }
    }

    return 'A+'
  }

  public loadPlayerSkin(playerSkin: any, sex: string) {
    let skin = null
    if (playerSkin) return (skin = JSON.parse(playerSkin))

    if (sex === 'female') return (skin = { sex: 1 })

    return (skin = { sex: 0 })
  }
}

const PlayerUtils = new _PlayerUtils()
export { PlayerUtils }