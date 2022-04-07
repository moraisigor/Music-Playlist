defmodule MusicPlaylistWeb.MusicView do
  use MusicPlaylistWeb, :view
  alias MusicPlaylistWeb.{MusicView, PlanView}

  def render("all.json", %{musics: musics}) do
    render_many(musics, MusicView, "simple.json")
  end

  def render("index.json", %{musics: musics, max_pages: max_pages}) do
    %{data: render_many(musics, MusicView, "music.json"), maxPages: max_pages}
  end

  def render("show.json", %{music: music, plans: plans}) do
    %{data: render_one(music, MusicView, "music.json"), plans: render_many(plans, PlanView, "simple.json")}
  end

  def render("response.json", %{music: music}) do
    render_one(music, MusicView, "simple.json")
  end

  def render("music.json", %{music: music}) do
    %{
      id: music.id,
      name: music.name,
      active: music.active
    }
  end

  def render("simple.json", %{music: music}) do
    %{
      id: music.id,
      name: music.name
    }
  end

  def render("playlist.json", %{flag: flag}) do
    %{
      inserted: flag
    }
  end
end
