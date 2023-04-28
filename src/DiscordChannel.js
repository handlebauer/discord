import { safeFetch } from './utils/safe-fetch.js'

export class DiscordChannel {
  /** @type {Webhook} */
  #webhook

  /**
   * @param {Webhook} webhook
   */
  constructor(webhook) {
    this.#webhook = webhook
  }

  /**
   * @param {string} content
   */
  async send(content) {
    const body = {
      username: this.#webhook.username,
      avatar_url: this.#webhook.avatar,
      content,
    }

    const init = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    }

    await safeFetch(this.#webhook.url, init)

    return true
  }

  /**
   * @param {Partial<EmbedBody>} embed
   */
  async sendEmbed(embed) {
    const body = {
      username: this.#webhook.username,
      avatar_url: this.#webhook.avatar,
      content: '',
      embeds: [embed],
    }

    const init = {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'content-type': 'application/json' },
    }

    console.log(init)
    await safeFetch(this.#webhook.url, init)

    return true
  }
}
