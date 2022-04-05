defmodule MusicPlaylistWeb.MusicControllerTest do
  use MusicPlaylistWeb.ConnCase

  import MusicPlaylist.MusicsFixtures

  alias MusicPlaylist.Musics.Music

  @create_attrs %{
    active: true,
    image_url: "some image_url",
    name: "some name"
  }
  @update_attrs %{
    active: false,
    image_url: "some updated image_url",
    name: "some updated name"
  }
  @invalid_attrs %{active: nil, image_url: nil, name: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all musics", %{conn: conn} do
      conn = get(conn, Routes.music_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create music" do
    test "renders music when data is valid", %{conn: conn} do
      conn = post(conn, Routes.music_path(conn, :create), music: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.music_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "active" => true,
               "image_url" => "some image_url",
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.music_path(conn, :create), music: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update music" do
    setup [:create_music]

    test "renders music when data is valid", %{conn: conn, music: %Music{id: id} = music} do
      conn = put(conn, Routes.music_path(conn, :update, music), music: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.music_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "active" => false,
               "image_url" => "some updated image_url",
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, music: music} do
      conn = put(conn, Routes.music_path(conn, :update, music), music: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete music" do
    setup [:create_music]

    test "deletes chosen music", %{conn: conn, music: music} do
      conn = delete(conn, Routes.music_path(conn, :delete, music))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.music_path(conn, :show, music))
      end
    end
  end

  defp create_music(_) do
    music = music_fixture()
    %{music: music}
  end
end
