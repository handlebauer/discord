import { map, pipe, values } from 'remeda'
import { formatList } from '@hbauer/convenience-functions'
import { safeFetch } from './utils/safe-fetch.js'
import { DiscordChannel } from './DiscordChannel.js'
import { EmbedBuilder } from './EmbedBuilder.js'

export class Discord {
  /**
   * @type {{ [name: string]: DiscordChannel<string> }}
   */
  #channels = {}

  static buildEmbed() {
    return EmbedBuilder.start()
  }

  /**
   * @param {string} username
   * @param {string} [avatar]
   */
  constructor(username, avatar) {
    this.username = username || null
    this.avatar = avatar || null
  }

  /**
   * @param {string} channel
   */
  #validateChannel(channel) {
    if (this.#channels[channel] === undefined) {
      const configuredChannels = formatList(
        Object.keys(this.#channels),
        'disjunction'
      )
      throw new Error(
        `Channel \`${channel}\` has not yet been configured. Did you mean one of [${configuredChannels}]?`
      )
    }
  }

  /**
   * @template {string} C
   *
   * @param {C} name
   * @param {string} url
   * @param {{ username?: string, avatar?: string }} [opts]
   * @returns {DiscordChannel<C>}
   */
  addChannel(name, url, { username, avatar } = {}) {
    username = username || this.username
    avatar = avatar || this.avatar

    const channel = new DiscordChannel({ url, username, avatar })
    this.#channels = { ...this.#channels, [name]: channel }
    return channel
  }

  /**
   * @param {string} channel
   * @param {string} content
   * @returns {Promise<boolean>}
   */
  send(channel, content) {
    this.#validateChannel(channel)
    return this.#channels[channel].send(content)
  }

  /**
   * @param {string} content
   */
  sendAll(content) {
    return Promise.all(
      pipe(
        this.#channels,
        values,
        map(channel => channel.send(content))
      )
    )
  }

  /**
   * @param {string} channel
   * @param {EmbedBuilder} embed
   * @returns {Promise<boolean>}
   */
  async sendEmbed(channel, embed) {
    this.#validateChannel(channel)

    const body = {
      username: this.#channels[channel].username,
      avatar_url: this.#channels[channel].avatar,
      content: '',
      embeds: [embed],
    }

    const init = {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'content-type': 'application/json' },
    }

    await safeFetch(this.#channels[channel].url, init)

    return true
  }
}
