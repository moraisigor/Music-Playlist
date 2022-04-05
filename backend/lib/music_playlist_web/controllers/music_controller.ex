defmodule MusicPlaylistWeb.MusicController do
  use MusicPlaylistWeb, :controller

  alias MusicPlaylist.Plans.{Plan, PlanHierarchy}
  alias MusicPlaylist.Musics.{Music, MusicPlan}
  alias MusicPlaylist.Musics.Music.Repository

  action_fallback MusicPlaylistWeb.FallbackController

  @musics_per_age 10

  def index(conn, %{"page" => page}) do
    musics = page
      |> Integer.parse()
      |> elem(0)
      |> Repository.list_musics(@musics_per_age)

    maxPages = (Repository.count_musics() / @musics_per_age)
      |> Float.ceil()
      |> trunc()

    render(conn, "index.json", %{musics: musics, max_pages: maxPages})
  end


  def index(conn, _params) do
    musics = Repository.list_all_musics()
    render(conn, "all.json", musics: musics)
  end

  defp include_plan(music_id, plan_id) do
    MusicPlan.Repository.create_music_plan(%{music_id: music_id, plan_id: plan_id})
    hierarchy = PlanHierarchy.Repository.get_plan_hierarchy_by_child!(plan_id)

    case hierarchy.parent_id do
      nil ->
        {:ok}
      parent_id ->
        include_plan(music_id, parent_id)
    end
  end

  def create(conn, %{"music" => %{"plan" => plan_id} = music_params}) do
    with {:ok, %Music{} = music} <- Repository.create_music(music_params) do
      include_plan(music.id, plan_id)

      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.music_path(conn, :show, music))
      |> render("response.json", music: music)
    end
  end

  def show(conn, %{"id" => id}) do
    music = Repository.get_music!(id)
    plans = music.id
      |> MusicPlan.Repository.list_music_plans_by_music()
      |> Enum.map(fn %{plan_id: plan_id} -> Plan.Repository.get_plan!(plan_id) end)

    render(conn, "show.json", %{music: music, plans: plans})
  end

  def update(conn, %{"id" => id, "music" => music_params, "plan" => ""}) do
    music = Repository.get_music!(id)

    with {:ok, %Music{} = music} <- Repository.update_music(music, music_params) do
      render(conn, "response.json", music: music)
    end
  end

  def update(conn, %{"id" => id, "music" => music_params, "plan" => plan_id}) do
    music = Repository.get_music!(id)

    with {:ok, %Music{} = music} <- Repository.update_music(music, music_params) do
      MusicPlan.Repository.delete_music_plan_by(id)
      include_plan(id, plan_id)
      render(conn, "response.json", music: music)
    end
  end

  def delete(conn, %{"id" => id}) do
    music = Repository.get_music!(id)

    with {:ok, %Music{}} <- Repository.update_music(music, %{active: false}) do
      send_resp(conn, :no_content, "")
    end
  end
end
