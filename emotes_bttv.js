const Telegraf = require('telegraf')
const fetch = require('node-fetch')
const escape = require('markdown-escape')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.replyWithMarkdown('Hi there! Please use `/help` for usage details'))
bot.help((ctx) => {
    ctx.replyWithMarkdown('1. Add me to channel where you want to use BTTV Twitch emotes.\n2. Use `@TwitchBTTVBot <searchterm>` to search for emotes')
})

bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
  const apiUrl = `https://api.betterttv.net/3/emotes/shared/search?query=${inlineQuery.query}`
  const response = await fetch(apiUrl)
  const results  = await response.json()

  if (!results.message){
    const emotes = results
      .map(function (result) {
        const replyType = (result.imageType === 'gif') ? 'gif' : 'photo'

        return {
          type: replyType,
          id: result.id + result.imageType,
          title: result.code,
          caption: result.code + ' \\(_by ' +  escape(result.user.displayName) + '_\\)' ,
          parse_mode: 'MarkdownV2',
          thumb_url: 'https://cdn.betterttv.net/emote/' + result.id + '/3x.' + result.imageType,
          [replyType + '_url']: 'https://cdn.betterttv.net/emote/' + result.id + '/3x.' + result.imageType,
          [replyType + '_height']: 112, // https://github.com/telegramdesktop/tdesktop/issues/4580#issuecomment-617786659
          [replyType + '_width']: 112, // see above
        }
      })

      // console.log(emotes)

    return answerInlineQuery(emotes)
  }
})

bot.launch()
