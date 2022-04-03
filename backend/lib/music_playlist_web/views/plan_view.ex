defmodule MusicPlaylistWeb.PlanView do
  use MusicPlaylistWeb, :view
  alias MusicPlaylistWeb.PlanView

  def render("index.json", %{plans: plans, max_pages: max_pages}) do
    %{data: render_many(plans, PlanView, "plan.json"), maxPages: max_pages}
  end

  def render("show.json", %{plan: plan}) do
    render_one(plan, PlanView, "plan.json")
  end

  def render("plan.json", %{plan: plan}) do
    %{
      id: plan.id,
      name: plan.name,
      musicLimit: plan.music_limit,
      active: plan.active
    }
  end

  def render("details.json", %{plan: plan}) do
    %{
      id: plan.id,
      name: plan.name,
      musicLimit: plan.music_limit,
      active: plan.active,
      imageUrl: plan.image_url
    }
  end
end
