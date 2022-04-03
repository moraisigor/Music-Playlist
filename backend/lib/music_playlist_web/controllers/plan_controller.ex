defmodule MusicPlaylistWeb.PlanController do
  use MusicPlaylistWeb, :controller

  alias MusicPlaylist.Plans.Plan
  alias MusicPlaylist.Plans.Plan.Repository

  action_fallback MusicPlaylistWeb.FallbackController

  @plans_per_age 10

  def index(conn, %{"page" => page}) do
    plans = page
      |> Integer.parse()
      |> elem(0)
      |> Repository.list_plans(@plans_per_age)

    maxPages = (Repository.count_plans() / @plans_per_age)
      |> Float.ceil()
      |> trunc()

    render(conn, "index.json", %{plans: plans, max_pages: maxPages})
  end

  def create(conn, %{"plan" => plan_params}) do
    with {:ok, %Plan{} = plan} <- Repository.create_plan(plan_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.plan_path(conn, :show, plan))
      |> render("show.json", plan: plan)
    end
  end

  def show(conn, %{"id" => id}) do
    plan = Repository.get_plan!(id)
    render(conn, "show.json", plan: plan)
  end

  def update(conn, %{"id" => id, "plan" => plan_params}) do
    plan = Repository.get_plan!(id)

    with {:ok, %Plan{} = plan} <- Repository.update_plan(plan, plan_params) do
      render(conn, "show.json", plan: plan)
    end
  end

  def delete(conn, %{"id" => id}) do
    plan = Repository.get_plan!(id)

    with {:ok, %Plan{}} <- Repository.update_plan(plan, %{active: false}) do
      send_resp(conn, :no_content, "")
    end
  end
end
