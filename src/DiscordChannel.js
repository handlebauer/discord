import { safeFetch } from './utils/safe-fetch.js'
import { EmbedBuilder } from './EmbedBuilder.js'

/**
 * @typedef {import('./types.js').Channel} Channel
 */

/**
 * @template {string} Name
 */
export class DiscordChannel {
  /** @type {string} */
  #SECRET_URL

  /**
   * @param {Channel} channel
   */
  constructor(channel) {
    if (channel.url == null) {
      throw new Error(`A webhook URL must be defined (found: ${channel.url})`)
    }

    this.#SECRET_URL = channel.url

    this.url = channel.url.split('/').at(-1).slice(0, 9) + '...'
    this.username = channel.username || null
    this.avatar = channel.avatar || null
  }

  /**
   * @param {string} content
   */
  async send(content) {
    const body = {
      username: this.username,
      avatar_url: this.avatar,
      content,
    }

    const init = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    }

    await safeFetch(this.#SECRET_URL, init)

    return true
  }

  /**
   * @param {EmbedBuilder} embed
   */
  async sendEmbed(embed) {
    const body = {
      username: this.username,
      avatar_url: this.avatar,
      content: '',
      embeds: [embed],
    }

    const init = {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'content-type': 'application/json' },
    }

    await safeFetch(this.#SECRET_URL, init)

    return true
  }
}
