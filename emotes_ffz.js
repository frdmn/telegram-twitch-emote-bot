const Telegraf = require('telegraf')
const fetch = require('node-fetch')
const escape = require('markdown-escape')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.replyWithMarkdown('Hi there! Please use `/help` for usage details'))
bot.help((ctx) => {
    ctx.replyWithMarkdown('1. Add me to channel where you want to use FFZ Twitch emotes.\n2. Use `@TwitchFFZBot <searchterm>` to search for emotes')
})

bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
  const apiUrl = `https://api.frankerfacez.com/v1/emoticons?sort=count-decs&q=${inlineQuery.query}`
  const response = await fetch(apiUrl)
  const results  = await response.json()

  if (results.emoticons){
    const emotes = results.emoticons
      .map(({ id, name, urls, owner }) => ({
        type: 'photo',
        id: id,
        title: name,
        caption: name.replace(/\!/g, '\\!') + ' \\(_by ' +  escape(owner.display_name) + '_\\)' ,
        parse_mode: 'MarkdownV2',
        thumb_url: 'https:' + urls[Object.keys(urls).reverse()[0]],
        photo_url: 'https:' + urls[Object.keys(urls).reverse()[0]],
        photo_height: 112,
        photo_width: 112,
      }))

    console.log(emotes);

    return answerInlineQuery(emotes)
  }
})

bot.launch()
