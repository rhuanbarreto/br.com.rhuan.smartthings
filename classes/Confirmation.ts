import axios from "axios"

type ConfirmationRequestBody = {
  lifecycle: 'CONFIRMATION',
  executionId: string,
  appId: string,
  locale: string,
  version: string,
  confirmationData: {
    appId: string,
    confirmationUrl: string
  },
  settings: {}
}

export default class Confirmation {
  static async confirm({ body }: { body: ConfirmationRequestBody }) {
    return axios(body.confirmationData.confirmationUrl).then(() => true).catch(() => false)
  }
}