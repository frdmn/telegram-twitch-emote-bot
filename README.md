# telegram-twitch-emote-bot

| ![](https://up.frd.mn/0w813SXftYH.gif) | ![](https://up.frd.mn/6Il3a7QD0Hv.gif) |
|-----|-----|
| FFZ ([`@TwitchFFZBot`](http://t.me/TwitchFFZBot)) | BTTV ([`@TwitchBTTVBot`](http://t.me/TwitchBTTVBot)) |

Simple Telegram bot to access Twitch emotes (provided by BetterTwitchTV & FrankerFaceZ) that supports inline queries, e.g. `@TwitchBTTVBot dinkdonk` or `@TwitchFFZBot peepo`.

No need to invite the bot into groups/channels!

## Installation

1. Make sure you've installed all requirements
2. Clone this repository:

    ```shell
    git clone https://github.com/frdmn/telegram-twitch-emote-bot
    ```


3. Copy and adjust sample `.env` file, make sure you've added your Telegram bot tokens:

    ```shell
    cp .env.sample .env
    vi .env
    ```

4. Build Docker images and startup containers:

    ```shell
    docker-compose up -d
    ```

## Usage

Here's a short explanation how to use `telegram-twitch-emote-bot`:

* Use it
* Profit

## Contributing

1. Fork it
2. Create your feature branch:

    ```shell
    git checkout -b feature/my-new-feature
    ```

3. Commit your changes:

    ```shell
    git commit -am 'Add some feature'
    ```

4. Push to the branch:

    ```shell
    git push origin feature/my-new-feature
    ```

5. Submit a pull request

## Requirements / Dependencies

* Docker

## Version

1.0.0

## License

[MIT](LICENSE)
