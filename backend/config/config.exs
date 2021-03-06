# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :music_playlist,
  ecto_repos: [MusicPlaylist.Repo],
  generators: [binary_id: true]

# Configures the endpoint
config :music_playlist, MusicPlaylistWeb.Endpoint,
  url: [host: "localhost"],
  render_errors: [view: MusicPlaylistWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: MusicPlaylist.PubSub,
  live_view: [signing_salt: "rOj/pKJq"]

config :music_playlist, MusicPlaylist.Accounts.Clients.Guardian,
  issuer: "music_playlist",
  secret_key: "pWCTGQdyHH7qqOwDcSLwqq7tz5GrjiyXAmct3QTkmdoH1RsCfAgt02ZH9UuFdBfH"

  config :music_playlist, MusicPlaylist.Accounts.Admin.Guardian,
  issuer: "music_playlist",
  secret_key: "xdIqCrQwWB+XoT1IxEBG2MeJ2KDVSCV6RWDmUUU/h+fZhyG6UaXyT7kRj+QT76w+"

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
