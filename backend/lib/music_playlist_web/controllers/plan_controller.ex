defmodule MusicPlaylistWeb.PlanController do
  use MusicPlaylistWeb, :controller
  import Plug.Conn

  alias MusicPlaylist.Musics.MusicPlan
  alias MusicPlaylist.Plans.{Plan, PlanHierarchy}
  alias MusicPlaylist.Plans.Plan.Repository

  action_fallback MusicPlaylistWeb.FallbackController

  @plans_per_age 10

  def index(%{assigns: %{role: :admin}} = conn, %{"page" => page}) do
    plans = page
      |> Integer.parse()
      |> elem(0)
      |> Repository.list_plans(@plans_per_age)
      |> Enum.map(
        fn plan ->
          hierarchy = PlanHierarchy.Repository.get_plan_hierarchy_by_child!(plan.id)
          %{music_limit: plan.music_limit, name: plan.name, parent_id: hierarchy.parent_id, id: plan.id, active: plan.active}
        end
      )

    maxPages = (Repository.count_plans() / @plans_per_age)
      |> Float.ceil()
      |> trunc()

    render(conn, "index.json", %{plans: plans, max_pages: maxPages})
  end

  def index(conn, %{"music" => music_id}) do
    plans = music_id
      |> MusicPlan.Repository.list_music_plans_by_music()
      |> Enum.map(fn %{plan_id: plan_id} -> Plan.Repository.get_plan!(plan_id) end)

    render(conn, "all.json", %{plans: plans})
  end

  def index(%{assigns: %{role: :admin}} = conn, _params) do
    plans = Repository.list_all_plans()
    render(conn, "all.json", %{plans: plans})
  end

  def index(conn, _params) do
    conn
    |> resp(401, "")
    |> send_resp()
    |> halt()
  end

  def create(%{assigns: %{role: :admin}} = conn, %{"plan" => %{"parent_id" => ""} = plan_params}) do
    with {:ok, %Plan{} = plan} <- Repository.create_plan(plan_params) do
      PlanHierarchy.Repository.create_plan_hierarchy(%{child_id: plan.id})
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.plan_path(conn, :show, plan))
      |> render("response.json", plan: plan)
    end
  end

  def create(%{assigns: %{role: :admin}} = conn, %{"plan" => %{"parent_id" => parent_id} = plan_params}) do
    with {:ok, %Plan{} = plan} <- Repository.create_plan(plan_params) do
      PlanHierarchy.Repository.create_plan_hierarchy(%{child_id: plan.id, parent_id: parent_id})
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.plan_path(conn, :show, plan))
      |> render("response.json", plan: plan)
    end
  end

  def create(conn, _params) do
    conn
    |> resp(401, "")
    |> send_resp()
    |> halt()
  end

  def show(conn, %{"id" => id}) do
    plan = Repository.get_plan!(id)
    render(conn, "show.json", plan: plan)
  end

  def update(%{assigns: %{role: :admin}} = conn, %{"id" => id, "plan" => plan_params, "parent" => ""}) do
    plan = Repository.get_plan!(id)

    with {:ok, %Plan{} = plan} <- Repository.update_plan(plan, plan_params) do
      PlanHierarchy.Repository.get_plan_hierarchy_by_child!(id)
        |> PlanHierarchy.Repository.update_plan_hierarchy(%{parent_id: nil})
      render(conn, "response.json", plan: plan)
    end
  end

  def update(%{assigns: %{role: :admin}} = conn, %{"id" => id, "plan" => plan_params, "parent" => parent_id}) do
    IO.inspect("PARENT")
    plan = Repository.get_plan!(id)

    with {:ok, %Plan{} = plan} <- Repository.update_plan(plan, plan_params) do
      PlanHierarchy.Repository.get_plan_hierarchy_by_child!(id)
        |> PlanHierarchy.Repository.update_plan_hierarchy(%{parent_id: parent_id})

      render(conn, "response.json", plan: plan)
    end
  end

  def update(conn, _params) do
    conn
    |> resp(401, "")
    |> send_resp()
    |> halt()
  end

  def delete(%{assigns: %{role: :admin}} = conn, %{"id" => id}) do
    plan = Repository.get_plan!(id)

    with {:ok, %Plan{}} <- Repository.update_plan(plan, %{active: false}) do
      send_resp(conn, :no_content, "")
    end
  end

  def delete(conn, _params) do
    conn
    |> resp(401, "")
    |> send_resp()
    |> halt()
  end
end
