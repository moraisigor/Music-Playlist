defmodule MusicPlaylistWeb.ClientController do
  use MusicPlaylistWeb, :controller

  alias MusicPlaylist.Accounts.Clients.Client
  alias MusicPlaylist.Accounts.Clients.Client.Repository
  alias MusicPlaylist.Plans.Plan

  action_fallback MusicPlaylistWeb.FallbackController

  @clients_per_age 10

  def index(conn, %{"page" => page}) do
    clients = page
      |> Integer.parse()
      |> elem(0)
      |> Repository.list_clients(@clients_per_age)
      |> Enum.map(
        fn client ->
          plan = Plan.Repository.get_plan!(client.plan_id)
          %{id: client.id, email: client.email, plan: plan.name}
        end
      )

    maxPages = (Repository.count_clients() / @clients_per_age)
      |> Float.ceil()
      |> trunc()

    render(conn, "index.json", %{clients: clients, max_pages: maxPages})
  end

  def index(conn, _params) do
    clients = Repository.list_all_clients()
    render(conn, "index.json", clients: clients)
  end

  def create(conn, %{"client" => client_params}) do
    with {:ok, %Client{} = client} <- Repository.create_client(client_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.client_path(conn, :show, client))
      |> render("show.json", client: client)
    end
  end

  def show(conn, %{"id" => id}) do
    client = Repository.get_client!(id)
    render(conn, "show.json", client: client)
  end

  def update(conn, %{"id" => id, "client" => client_params}) do
    client = Repository.get_client!(id)

    with {:ok, %Client{} = client} <- Repository.update_client(client, client_params) do
      render(conn, "show.json", client: client)
    end
  end

  def delete(conn, %{"id" => id}) do
    client = Repository.get_client!(id)

    with {:ok, %Client{}} <- Repository.delete_client(client) do
      send_resp(conn, :no_content, "")
    end
  end

  def login(conn, %{"email" => email, "password" => password}) do
    client = Repository.get_client_by_email!(email)

    case Argon2.verify_pass(password, client.password_hash) do
      true ->
        case MusicPlaylist.Accounts.Clients.Guardian.encode_and_sign(client) do
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
