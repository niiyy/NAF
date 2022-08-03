export enum InputMethods {
  CREATE_INPUT = 'NX::createInput',
  SUBMIT_DATA = 'NX::inputSubmitData',
  DESTROY_INPUT = 'NX::destroyInput',
}

export interface InputRowT {
  label: string
  id: string
  type: 'text' | 'password'
  required?: boolean
  options?: Record<string, string | number | boolean>
}

export interface InputsDataT {
  title: string
  rows: InputRowT[]
}

export interface InputSliceState {
  inputData: InputsDataT | null
  invalidInputs: string[]
}
