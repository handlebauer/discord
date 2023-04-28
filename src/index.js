import { safeFetch } from './utils/safe-fetch.js'
import { DiscordChannel } from './DiscordChannel.js'
import { EmbedBuilder } from './EmbedBuilder.js'

export class Discord {
  /** @type {{ [name: string]: Webhook }} */
  #webhooks = {}

  static buildEmbed() {
    return new EmbedBuilder()
  }

  /**
   * @param {string} channel
   */
  #validateChannel(channel) {
    if (this.#webhooks[channel] === undefined) {
      const configuredChannels = Object.keys(this.#webhooks).join(', ')
      throw new Error(
        `Channel \`${channel}\` has not yet been configured. Did you mean one of [${configuredChannels}]?`
      )
    }
  }

  /**
   * @param {string} channel
   * @param {string} url
   * @param {{ username?: string, avatar?: string }} [opts]
   */
  addWebhook(channel, url, { username, avatar } = {}) {
    this.#webhooks = { ...this.#webhooks, [channel]: { url, username, avatar } }
  }

  /**
   * @param {string} channel
   */
  channel(channel) {
    this.#validateChannel(channel)
    return new DiscordChannel(this.#webhooks[channel])
  }

  /**
   * @param {string} channel
   * @param {string} content
   */
  async send(channel, content) {
    this.#validateChannel(channel)

    const body = {
      username: this.#webhooks[channel]?.username,
      avatar_url: this.#webhooks[channel]?.avatar,
      content,
    }

    const init = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    }

    await safeFetch(this.#webhooks[channel].url, init)

    return true
  }

  /**
   * @param {string} channel
   * @param {EmbedBuilder} embed
   */
  async sendEmbed(channel, embed) {
    this.#validateChannel(channel)

    const body = {
      username: this.#webhooks[channel].username,
      avatar_url: this.#webhooks[channel].avatar,
      content: '',
      embeds: [embed],
    }

    const init = {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'content-type': 'application/json' },
    }

    console.log(init)

    await safeFetch(this.#webhooks[channel].url, init)

    return true
  }
}
