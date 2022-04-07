defmodule MusicPlaylistWeb.ClientView do
  use MusicPlaylistWeb, :view
  alias MusicPlaylistWeb.ClientView

  def render("all.json", %{clients: clients}) do
    render_many(clients, ClientView, "client.json")
  end

  def render("index.json", %{clients: clients, max_pages: max_pages}) do
    %{data: render_many(clients, ClientView, "client.json"), maxPages: max_pages}
  end

  def render("show.json", %{client: client}) do
    %{data: render_one(client, ClientView, "simple.json")}
  end

  def render("client.json", %{client: client}) do
    %{
      id: client.id,
      email: client.email,
      plan: client.plan
    }
  end

  def render("simple.json", %{client: client}) do
    %{
      id: client.id,
      email: client.email
    }
  end

  def render("auth.json", %{token: token, claims: claims}) do
    %{
      token: token,
      claims: claims
    }
  end
end
