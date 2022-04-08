defmodule MusicPlaylistWeb.AdminController do
  use MusicPlaylistWeb, :controller

  alias MusicPlaylist.Accounts.Admin
  alias MusicPlaylist.Accounts.Admin.Repository

  action_fallback MusicPlaylistWeb.FallbackController

  def index(conn, _params) do
    admins = Repository.list_admins()
    render(conn, "index.json", admins: admins)
  end

  def create(conn, %{"admin" => admin_params}) do
    with {:ok, %Admin{} = admin} <- Repository.create_admin(admin_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.admin_path(conn, :show, admin))
      |> render("show.json", admin: admin)
    end
  end

  def show(conn, %{"id" => id}) do
    admin = Repository.get_admin!(id)
    render(conn, "show.json", admin: admin)
  end

  def update(conn, %{"id" => id, "admin" => admin_params}) do
    admin = Repository.get_admin!(id)

    with {:ok, %Admin{} = admin} <- Repository.update_admin(admin, admin_params) do
      render(conn, "show.json", admin: admin)
    end
  end

  def delete(conn, %{"id" => id}) do
    admin = Repository.get_admin!(id)

    with {:ok, %Admin{}} <- Repository.delete_admin(admin) do
      send_resp(conn, :no_content, "")
    end
  end

  def login(conn, %{"email" => email, "password" => password}) do
    admin = Repository.get_admin_by_email!(email)

    case Argon2.verify_pass(password, admin.password_hash) do
      true ->
        case MusicPlaylist.Accounts.Admin.Guardian.encode_and_sign(admin) do
          {:ok, token, claims} ->
            render(conn, "auth.json", %{token: token, claims: claims})
          _ ->
            render(conn, "auth.json", %{token: "fail", claims: ""})
        end
      false ->
        render(conn, "auth.json", %{token: "", claims: ""})
    end
  end
end
