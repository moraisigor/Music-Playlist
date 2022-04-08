defmodule MusicPlaylistWeb.Router do
  use MusicPlaylistWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug MusicPlaylistWeb.Plugs.AuthenticationClient
    plug MusicPlaylistWeb.Plugs.AuthenticationAdmin
  end

  scope "/api", MusicPlaylistWeb do
    pipe_through [:api, :authenticate_client, :authenticate_admin]

    resources "/admins", AdminController, except: [:new, :edit]
    resources "/plans", PlanController, except: [:new, :edit]
    resources "/musics", MusicController, except: [:new, :edit]
    resources "/clients", ClientController, except: [:new, :edit]

    get "/playlist", MusicController, :list_playlist
    post "/playlist", MusicController, :insert_music
  end

  scope "/auth", MusicPlaylistWeb do
    pipe_through :api

    post "/client", ClientController, :login
    post "/admin", AdminController, :login
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: MusicPlaylistWeb.Telemetry
    end
  end
end
