export class EmbedBuilder {
  /** @type {string} */
  #_title
  /** @type {string} */
  #_description
  /** @type {string} */
  #_url
  /** @type {number} */
  #_color
  /** @type {{ name: string, url: string, icon_url: string }} */
  #_author
  /** @type {{ text: string, icon_url: string }} */
  #_footer
  /** @type {string} */
  #_timestamp
  /** @type {{ url: string }} */
  #_image
  /** @type {{ url: string }} */
  #_thumbnail
  /** @type {{ name: string, value: string, inline?: boolean }[]} */
  #_fields = []

  constructor() {}

  /**
   * @param {string} title
   */
  title(title) {
    this.#_title = title
    return this
  }

  /**
   * @param {string} description
   */
  description(description) {
    this.#_description = description
    return this
  }

  /**
   * @param {string} url
   */
  url(url) {
    this.#_url = url
    return this
  }

  /**
   * @param {number} color
   */
  color(color) {
    this.#_color = color
    return this
  }

  /**
   * @param {{ name?: string, url?: string, icon_url?: string }} author
   */
  author({ name, url, icon_url } = {}) {
    this.#_author = { name, url, icon_url }
    return this
  }

  /**
   * @param {{ text?: string, icon_url?: string }} footer
   */
  footer({ text, icon_url } = {}) {
    this.#_footer = { text, icon_url }
    return this
  }

  /**
   * @param {string} timestamp
   */
  timestamp(timestamp) {
    this.#_timestamp = timestamp
    return this
  }

  /**
   * @param {{ url?: string }} iamge
   */
  image({ url } = {}) {
    this.#_image = { url }
    return this
  }

  /**
   * @param {{ url?: string }} thumbnail
   */
  thumbnail({ url } = {}) {
    this.#_thumbnail = { url }
    return this
  }

  /**
   * @param {{ name: string, value: string, inline?: boolean }} field
   */
  field({ name, value, inline }) {
    this.#_fields = [...this.#_fields, { name, value, inline }]
    return this
  }

  toJSON() {
    return {
      title: this.#_title,
      description: this.#_description,
      url: this.#_url,
      color: this.#_color,
      author: this.#_author,
      footer: this.#_footer,
      timestamp: this.#_timestamp,
      image: this.#_image,
      thumbnail: this.#_thumbnail,
      fields: this.#_fields,
    }
  }
}
