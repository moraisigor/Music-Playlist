defmodule MusicPlaylistWeb.PlanControllerTest do
  use MusicPlaylistWeb.ConnCase

  import MusicPlaylist.PlansFixtures

  alias MusicPlaylist.Plans.Plan

  @create_attrs %{
    active: true,
    image_url: "some image_url",
    music_limit: 42,
    name: "some name"
  }
  @update_attrs %{
    active: false,
    image_url: "some updated image_url",
    music_limit: 43,
    name: "some updated name"
  }
  @invalid_attrs %{active: nil, image_url: nil, music_limit: nil, name: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all plans", %{conn: conn} do
      conn = get(conn, Routes.plan_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create plan" do
    test "renders plan when data is valid", %{conn: conn} do
      conn = post(conn, Routes.plan_path(conn, :create), plan: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.plan_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "active" => true,
               "image_url" => "some image_url",
               "music_limit" => 42,
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.plan_path(conn, :create), plan: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update plan" do
    setup [:create_plan]

    test "renders plan when data is valid", %{conn: conn, plan: %Plan{id: id} = plan} do
      conn = put(conn, Routes.plan_path(conn, :update, plan), plan: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.plan_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "active" => false,
               "image_url" => "some updated image_url",
               "music_limit" => 43,
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, plan: plan} do
      conn = put(conn, Routes.plan_path(conn, :update, plan), plan: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete plan" do
    setup [:create_plan]

    test "deletes chosen plan", %{conn: conn, plan: plan} do
      conn = delete(conn, Routes.plan_path(conn, :delete, plan))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.plan_path(conn, :show, plan))
      end
    end
  end

  defp create_plan(_) do
    plan = plan_fixture()
    %{plan: plan}
  end
end
