const { Telegraf } = require('telegraf')
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN)

const ffzApiUrl = 'https://api.frankerfacez.com/v1/emoticons?sort=count-decs&q=';
const bttvApiUrl = 'https://api.betterttv.net/3/emotes/shared/search?query=';

async function getBTTVemote(emote, index = 0){
    let response = await axios.get(bttvApiUrl + emote);
    let emotes = response.data
    if (emotes && emotes.length > 0){
        let id = emotes[index].id
        let url = `https://cdn.betterttv.net/emote/${id}/3x.gif`
        return url    
    } else {
        return false
    }
}

async function getFFZemote(emote, index = 0){
    let response = await axios.get(ffzApiUrl + emote);
    let emotes = response.data.emoticons
    emotes.sort((a, b) => b.usage_count - a.usage_count)
    if (emotes && emotes.length > 0){
        let url = emotes[index].urls[Object.keys(emotes[index].urls).reverse()[0]]
        return `https:${url}`
    } else {
        return false
    }
}

bot.start((ctx) => ctx.replyWithMarkdown('Hi there! Please use `/help` for usage details'))
bot.help((ctx) => {
    ctx.replyWithMarkdown('`/ffz <emote>` find and display an emote on FFZ')
    ctx.replyWithMarkdown('`/bttv <emote>` find and display an emote on BTTV  ')
})

bot.command('bttv', (ctx) => {
    let emote = ctx.update.message.text
    let checkForIndex = emote.match(/\[[0-9]*\]$/)

    if (checkForIndex){
        index = checkForIndex[0].replace('[', '').replace(']', '')
        emote = emote.replace(checkForIndex[0], '')
    } else {
        index = 0
    }

    emote = emote.replace('/bttv', '').trim()
    
    if (!emote){
        return ctx.replyWithMarkdown('No argument given, use `/bttv peepoRun` for example!')
    }

    getBTTVemote(emote, index).then(url => {
        if(!url){
            return ctx.replyWithMarkdown('No emote found ☹️')
        } else {
            return ctx.replyWithAnimation({
                url: url,
                filename: `${emote}.gif`
            });        
        }
    });
})

bot.command('ffz', (ctx) => {
    let emote = ctx.update.message.text
    let checkForIndex = emote.match(/\[[0-9]*\]$/)

    if (checkForIndex){
        index = checkForIndex[0].replace('[', '').replace(']', '')
        emote = emote.replace(checkForIndex[0], '')
    } else {
        index = 0
    }

    emote = emote.replace('/ffz', '').trim()

    if (!emote){
        return ctx.replyWithMarkdown('No argument given, use `/ffz peepoRun` for example!')
    }

    getFFZemote(emote, index).then(url => {
        if(!url){
            return ctx.replyWithMarkdown('No emote found ☹️')
        } else {
            console.log(url);
            return ctx.replyWithPhoto(url);
        }
    });
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
